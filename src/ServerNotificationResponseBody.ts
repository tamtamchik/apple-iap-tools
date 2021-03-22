import { BooleanString } from './StringTypes'
import { ExpirationIntent } from './ExpirationIntent'
import { ServerNotificationType } from './ServerNotificationType'
import { UnifiedReceipt } from './UnifiedReceipt'
import { DeprecatedLatestReceiptInfo } from './DeprecatedLatestReceiptInfo'

/**
 * The JSON data sent in the server notification from the App Store.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebody
 */
export interface ServerNotificationResponseBody {
  /**
   * An identifier that App Store Connect generates and the App Store uses to uniquely identify the
   * auto-renewable subscription that the user’s subscription renews. Treat this value as a 64-bit integer.
   */
  auto_renew_adam_id?: string

  /**
   * The product identifier of the auto-renewable subscription that the user’s subscription renews.
   */
  auto_renew_product_id?: string

  /**
   * The current renewal status for an auto-renewable subscription product.
   * Note that these values are different from those of the auto_renew_status in the receipt.
   */
  auto_renew_status?: BooleanString

  /**
   * The time at which the user turned on or off the renewal status for an auto-renewable subscription,
   * in a date-time format similar to the ISO 8601 standard.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  auto_renew_status_change_date: string

  /**
   * The time at which the user turned on or off the renewal status for an auto-renewable subscription,
   * in UNIX epoch time format, in milliseconds. Use this time format to process dates.
   *
   * @example 1616411598724
   */
  auto_renew_status_change_date_ms: string

  /**
   * The time at which the user turned on or off the renewal status for an auto-renewable subscription,
   * in the Pacific time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  auto_renew_status_change_date_pst: string

  /**
   * The environment for which App Store generated the receipt.
   */
  environment: 'Sandbox' | 'PROD'

  /**
   * The reason a subscription expired. This field is only present for an expired auto-renewable subscription.
   */
  expiration_intent?: ExpirationIntent

  /**
   * The subscription event that triggered the notification.
   */
  notification_type: ServerNotificationType

  /**
   * The same value as the shared secret you submit in the password field of the requestBody when validating receipts.
   */
  password: string

  /**
   * An object that contains information about the most-recent, in-app purchase transactions for the app.
   */
  unified_receipt: UnifiedReceipt

  /**
   * A string that contains the app bundle ID.
   */
  bid: string

  /**
   * A string that contains the app bundle version.
   */
  bvrs: string

  /**
   * The latest Base64-encoded app receipt.
   *
   * @deprecated As of March 10, 2021 this object is no longer provided in production and sandbox environments. Use the latest_receipt field found in the unified_receipt object instead.
   */
  latest_receipt?: string

  /**
   * The latest decoded app receipt.
   *
   * @deprecated As of March 10, 2021 this object is no longer provided in production and sandbox environments. Use unified_receipt.Latest_receipt_info in the unified_receipt object instead.
   */
  latest_receipt_info?: DeprecatedLatestReceiptInfo

  /**
   * The latest expired Base64-encoded app receipt.
   *
   * @deprecated As of March 10, 2021 this object is no longer provided in production and sandbox environments. Use latest_receipt in the unified_receipt object instead.
   */
  latest_expired_receipt?: string

  /**
   * The latest decoded app receipts.
   *
   * @deprecated As of March 10, 2021 this object is no longer provided in production and sandbox environments. Use unified_receipt.Latest_receipt_info in the unified_receipt object instead.
   */
  latest_expired_receipt_info?: DeprecatedLatestReceiptInfo[]
}
