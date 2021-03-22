import { BinaryString } from './StringTypes'
import { LatestReceiptInfo } from './LatestReceiptInfo'
import { PendingRenewalInfo } from './PendingRenewalInfo'
import { Receipt } from './Receipt'

/**
 * The success statuses for the app receipt verification.
 *
 * @link https://developer.apple.com/documentation/appstorereceipts/status
 */
export enum VerifyReceiptSuccessStatus {
  /**
   * The value for status is 0 if the receipt is valid.
   */
  VALID = 0,

  /**
   * This receipt is valid but the subscription has expired.
   * When this status code is returned to your server, the receipt data is also decoded and returned as part of the response.
   * Only returned for iOS 6-style transaction receipts for auto-renewable subscriptions.
   */
  SUBSCRIPTION_EXPIRED = 21006,
}

/**
 * The error statuses for the app receipt verification.
 *
 * @link https://developer.apple.com/documentation/appstorereceipts/status
 */
export enum VerifyReceiptErrorStatus {
  /**
   * The request to the App Store was not made using the HTTP POST request method.
   */
  NOT_POST = 21000,

  /**
   * @deprecated This status code is no longer sent by the App Store.
   */
  SHOULD_NOT_HAPPEN = 21001,

  /**
   * The data in the receipt-data property was malformed or the service experienced a temporary issue. Try again.
   */
  MALFORMED_DATA = 21002,

  /**
   * The receipt could not be authenticated.
   */
  UNAUTHORIZED = 21003,

  /**
   * The shared secret you provided does not match the shared secret on file for your account.
   */
  SHARED_SECRET_INVALID = 21004,

  /**
   * The receipt server was temporarily unable to provide the receipt. Try again.
   */
  SERVER_NOT_AVAILABLE = 21005,

  /**
   * This receipt is from the test environment, but it was sent to the production environment for verification.
   */
  USE_TEST_ENVIRONMENT = 21007,

  /**
   * This receipt is from the production environment, but it was sent to the test environment for verification.
   */
  USE_PRODUCTION_ENVIRONMENT = 21008,

  /**
   * Internal data access error. Try again later.
   */
  INTERNAL_ERROR = 21009,

  /**
   * The user account cannot be found or has been deleted.
   */
  ACCOUNT_NOT_FOUND = 21010,
}

/**
 * The response body of a request that had an error. The receipt was not decoded and returned.
 */
export interface VerifyReceiptResponseError {
  /**
   * An indicator that an error occurred during the request.
   *
   * 1 - a temporary issue; retry validation for this receipt at a later time.
   * 0 - an unresolvable issue; do not retry validation for this receipt.
   *
   * Only applicable to status codes 21100-21199
   */
  'is-retryable'?: BinaryString

  /**
   * An {@link VerifyReceiptErrorStatus} status code if there is an error.
   * The status code reflects the status of the app receipt as a whole.
   */
  status: VerifyReceiptErrorStatus
}

/**
 * The response body of a request that had was successful.
 */
export interface VerifyReceiptResponseSuccess {
  /**
   * The environment for which the receipt was generated.
   */
  environment: 'Sandbox' | 'Production'

  /**
   * The latest Base64 encoded app receipt. Only returned for receipts that contain auto-renewable subscriptions.
   */
  latest_receipt?: string

  /**
   * An array that contains all in-app purchase transactions.
   * This excludes transactions for consumable products that have been marked as finished by your app.
   * Only returned for receipts that contain auto-renewable subscriptions.
   */
  latest_receipt_info?: LatestReceiptInfo[]

  /**
   * In the JSON file, an array where each element contains the pending renewal information for each auto-renewable subscription identified by the product_id.
   * Only returned for app receipts that contain auto-renewable subscriptions.
   */
  pending_renewal_info?: PendingRenewalInfo[]

  /**
   * A JSON representation of the receipt that was sent for verification.
   */
  receipt: Receipt

  /**
   * Either 0 if the receipt is valid, or a status code if there is an error.
   * The status code reflects the status of the app receipt as a whole.
   */
  status: VerifyReceiptSuccessStatus
}

export type VerifyReceiptResponseBody =
  | VerifyReceiptResponseError
  | VerifyReceiptResponseSuccess
