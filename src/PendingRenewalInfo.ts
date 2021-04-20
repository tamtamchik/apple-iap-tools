import { BinaryString } from './StringTypes.js'
import { ExpirationIntent } from './ExpirationIntent.js'

/**
 * Elements that refers to open auto-renewable subscription renewals or ones that failed in the past.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/unified_receipt/pending_renewal_info
 */
export interface PendingRenewalInfo {
  /**
   * The current renewal preference for the auto-renewable subscription.
   * The value for this key corresponds to the productIdentifier property of the product that the customer's
   * subscription renews. This field is only present if the user downgrades or cross-grades to a subscription of a
   * different duration for the subsequent subscription period.
   */
  auto_renew_product_id?: string

  /**
   * The current renewal status for the auto-renewable subscription.
   *
   * 1 - Subscription will auto-renew
   * 0 - Customer turned off auto-renew
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/auto_renew_status
   */
  auto_renew_status: BinaryString

  /**
   * The reason a subscription expired.
   * This field is only present for a receipt that contains an expired auto-renewable subscription.
   */
  expiration_intent?: ExpirationIntent

  /**
   * The time at which the grace period for subscription renewals expires,
   * in a date-time format similar to the ISO 8601.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  grace_period_expires_date?: string

  /**
   * The time at which the grace period for subscription renewals expires, in UNIX epoch time format, in milliseconds.
   * This key is only present for apps that have Billing Grace Period enabled and when the user experiences a billing
   * error at the time of renewal. Use this time format for processing dates.
   *
   * @example 1616411598724
   */
  grace_period_expires_date_ms?: string

  /**
   * The time at which the grace period for subscription renewals expires, in the Pacific Time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  grace_period_expires_date_pst?: string

  /**
   * A flag that indicates Apple is attempting to renew an expired subscription automatically.
   * This field is only present if an auto-renewable subscription is in the billing retry state.
   *
   * 1 - Apple is trying to renew the subscription. See {@link grace_period_expires_date} to determine when
   * Apple will stop trying.
   * 0 - Apple has stopped attempting to renew.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/is_in_billing_retry_period
   */
  is_in_billing_retry_period?: BinaryString

  /**
   * The reference name of a subscription offer that you configured in App Store Connect.
   * This field is present when a customer redeemed a subscription offer code.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/offer_code_ref_name
   */
  offer_code_ref_name?: string

  /**
   * The transaction identifier of the original purchase.
   */
  original_transaction_id: string

  /**
   * The price consent status for a subscription price increase.
   * This field is only present if the customer was notified of the price increase.
   *
   * 1 - customer accepted the price increase
   * 0 - customer has not yet accepted the price increase
   */
  price_consent_status?: BinaryString

  /**
   * The unique identifier of the product purchased.
   * You provide this value when creating the product in App Store Connect, and it corresponds to the
   * productIdentifier property of the SKPayment object stored in the transaction's payment property.
   */
  product_id: string

  /**
   * The identifier of the promotional offer for an auto-renewable subscription that the user redeemed.
   * You provide this value in the Promotional Offer Identifier field when you create the promotional offer
   * in App Store Connect.
   */
  promotional_offer_id: string
}
