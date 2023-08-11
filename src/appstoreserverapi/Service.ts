import * as jose from 'jose'

import { InvalidAuthorizationError, ServerAPIError, ServerAPIErrorResponse } from './errors'
import { HistoryQuery, HistoryResponse } from './requests'

export enum ServiceEnvironment {
  Sandbox = 'Sandbox',
  Production = 'Production',
}

export class Service {
  private readonly alg = 'ES256'
  private readonly typ = 'JWT'
  private readonly aud = 'appstoreconnect-v1'
  // https://developer.apple.com/documentation/appstoreserverapi/generating_tokens_for_api_requests#3809215
  private readonly exp = '1h'

  private readonly key: Promise<jose.KeyLike>
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

    // https://developer.apple.com/documentation/appstoreserverapi#3820693
    this.endpoint = 'https://api.storekit.itunes.apple.com'
    if (environment === ServiceEnvironment.Sandbox) {
      this.endpoint = 'https://api.storekit-sandbox.itunes.apple.com/'
    }
  }

  /**
   * Get a customer’s in-app purchase transaction history for your app.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_history
   * @version 1.0+
   */
  async getTransactionHistory (transactionId: number, params: HistoryQuery): Promise<HistoryResponse> {
    const query = new URLSearchParams(params as Record<string, string>)
    return this.get<HistoryResponse>(`inApps/v1/history/${transactionId}?${query}`)
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

  private async post<T> (path: string, data: unknown): Promise<T> {
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

    // https://developer.apple.com/documentation/appstoreserverapi/response_status_codes
    if (result.status === 401) {
      this.cachedToken = undefined
      throw new InvalidAuthorizationError()
    }

    // https://developer.apple.com/documentation/appstoreserverapi/response_status_codes
    if ([400, 404, 429, 500].includes(result.status)) {
      const error = await result.json() as ServerAPIErrorResponse
      throw new ServerAPIError(result.status, error, result.headers)
    }

    throw new Error(`Unexpected response from App Store: ${result.statusText} (${result.status})`)
  }
}
