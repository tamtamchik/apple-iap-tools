import * as jose from 'jose'

import { status } from '../appstoreservernotifications/v2/body'

import { InvalidAuthorizationError, ServerAPIError, ServerAPIErrorResponse } from './errors'
import {
  CheckTestNotificationResponse,
  HistoryQuery,
  HistoryResponse,
  OrderLookupResponse,
  RefundHistoryResponse,
  SendTestNotificationResponse,
  StatusResponse,
  TransactionInfoResponse,
} from './requests'

/**
 * Serializes query parameters. Arrays become repeated keys
 * (e.g. `productId=a&productId=b`), as the App Store Server API expects.
 */
function buildQuery (params: object): string {
  const query = new URLSearchParams()

  for (const [name, value] of Object.entries(params) as [string, string | number | boolean | string[] | undefined][]) {
    if (value === undefined) continue

    const values = Array.isArray(value) ? value : [value]
    for (const v of values) {
      query.append(name, String(v))
    }
  }

  const result = query.toString()
  return result ? `?${result}` : ''
}

export enum ServiceEnvironment {
  Sandbox = 'Sandbox',
  Production = 'Production',
}

export class Service {
  private readonly alg = 'ES256'
  private readonly typ = 'JWT'
  private readonly aud = 'appstoreconnect-v1'
  // https://developer.apple.com/documentation/appstoreserverapi/generating-json-web-tokens-for-api-requests
  private readonly exp = '1h'

  private readonly key: Promise<jose.CryptoKey>
  private readonly endpoint: string

  private cachedToken?: string
  private cachedTokenExpire: Date = new Date(0)

  constructor (
    key: string,
    private readonly kid: string,
    private readonly iss: string,
    private readonly bid: string,
    private readonly environment: ServiceEnvironment = ServiceEnvironment.Sandbox,
  ) {
    this.key = jose.importPKCS8(key, this.alg)

    // https://developer.apple.com/documentation/appstoreserverapi
    this.endpoint = 'https://api.storekit.apple.com/'
    if (environment === ServiceEnvironment.Sandbox) {
      this.endpoint = 'https://api.storekit-sandbox.apple.com/'
    }
  }

  /**
   * Get a customer’s in-app purchase transaction history for your app.
   *
   * The transactionId may be an originalTransactionId, a transactionId, or an appTransactionId.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get-transaction-history
   * @version 1.12+
   */
  async getTransactionHistory (transactionId: string, params: HistoryQuery = {}): Promise<HistoryResponse> {
    return this.get<HistoryResponse>(`inApps/v2/history/${transactionId}${buildQuery(params)}`)
  }

  /**
   * Get information about a single transaction for your app.
   *
   * The transactionId may be a transactionId or an originalTransactionId
   * (but not an appTransactionId).
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get-transaction-info
   * @version 1.8+
   */
  async getTransactionInfo (transactionId: string): Promise<TransactionInfoResponse> {
    return this.get<TransactionInfoResponse>(`inApps/v1/transactions/${transactionId}`)
  }

  /**
   * Get the statuses for all of a customer’s auto-renewable subscriptions in your app.
   *
   * The transactionId may be an originalTransactionId, a transactionId, or an appTransactionId.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get-all-subscription-statuses
   * @version 1.0+
   */
  async getAllSubscriptionStatuses (transactionId: string, statuses?: status[]): Promise<StatusResponse> {
    return this.get<StatusResponse>(`inApps/v1/subscriptions/${transactionId}${buildQuery({ status: statuses?.map(String) })}`)
  }

  /**
   * Get a customer’s in-app purchases from a receipt using the order ID.
   *
   * Available only in the production environment.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/look-up-order-id
   * @version 1.0+
   */
  async lookUpOrderId (orderId: string): Promise<OrderLookupResponse> {
    return this.get<OrderLookupResponse>(`inApps/v1/lookup/${orderId}`)
  }

  /**
   * Get a paginated list of all of a customer’s refunded in-app purchases for your app.
   *
   * The transactionId may be an originalTransactionId, a transactionId, or an appTransactionId.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get-refund-history
   * @version 1.6+
   */
  async getRefundHistory (transactionId: string, revision?: string): Promise<RefundHistoryResponse> {
    return this.get<RefundHistoryResponse>(`inApps/v2/refund/lookup/${transactionId}${buildQuery({ revision })}`)
  }

  /**
   * Ask App Store Server Notifications to send a test notification to your server.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/request-a-test-notification
   * @version 1.4+
   */
  async requestTestNotification (): Promise<SendTestNotificationResponse> {
    return this.post<SendTestNotificationResponse>('inApps/v1/notifications/test')
  }

  /**
   * Check the status of the test App Store server notification sent to your server.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get-test-notification-status
   * @version 1.4+
   */
  async getTestNotificationStatus (testNotificationToken: string): Promise<CheckTestNotificationResponse> {
    return this.get<CheckTestNotificationResponse>(`inApps/v1/notifications/test/${testNotificationToken}`)
  }

  private async generateToken (): Promise<string> {
    const key = await this.key
    return new jose.SignJWT({ bid: this.bid })
      .setProtectedHeader({ alg: this.alg, typ: this.typ, kid: this.kid })
      .setIssuer(this.iss)
      .setAudience(this.aud)
      .setIssuedAt()
      .setExpirationTime(this.exp)
      .sign(key)
  }

  private async getHeaders (): Promise<HeadersInit> {
    if (Date.now() > this.cachedTokenExpire.getTime() || !this.cachedToken) {
      this.cachedToken = await this.generateToken()
      this.cachedTokenExpire = new Date(Date.now() + 1000 * 60 * 55) // 5 minutes gap to be sure
    }

    return {
      'Authorization': `Bearer ${this.cachedToken}`,
      'Content-Type': 'application/json',
    }
  }

  private async get<T> (path: string): Promise<T> {
    return this.call<T>('GET', path)
  }

  private async post<T> (path: string, data?: unknown): Promise<T> {
    return this.call<T>('POST', path, data)
  }

  private async call<T> (method: 'GET' | 'POST', path: string, data?: unknown): Promise<T> {
    const headers = await this.getHeaders()
    const url = `${this.endpoint}${path}`
    const body = data ? JSON.stringify(data) : undefined

    const result = await fetch(url, { method, body, headers })
    if (result.ok) {
      return await result.json() as T
    }

    // https://developer.apple.com/documentation/appstoreserverapi/error-codes
    if (result.status === 401) {
      this.cachedToken = undefined
      throw new InvalidAuthorizationError()
    }

    // https://developer.apple.com/documentation/appstoreserverapi/error-codes
    if ([400, 404, 429, 500].includes(result.status)) {
      const error = await result.json() as ServerAPIErrorResponse
      throw new ServerAPIError(result.status, error, result.headers)
    }

    throw new Error(`Unexpected response from App Store: ${result.statusText} (${result.status})`)
  }
}
