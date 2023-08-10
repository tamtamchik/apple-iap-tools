import { BinaryString, BooleanString } from './stringTypes'

/**
 * The in-app purchase receipt fields for all in-app purchase transactions.
 *
 * @link https://developer.apple.com/documentation/appstorereceipts/responsebody/receipt/in_app
 *
 * @deprecated The App Store Server Notifications V1 endpoint and version 1 notifications are deprecated.
 * Implement the App Store Server Notifications V2 endpoint on your server to receive version 2 notifications instead.
 */
export interface InApp {
  /**
   * The time when Apple customer support canceled a transaction, in a date-time format similar to the ISO 8601.
   * This field is only present for refunded transactions.
   *
   * @example 2013-08-01 07:00:00 Etc/GMT
   */
  cancellation_date?: string

  /**
   * The time when Apple customer support canceled a transaction, or the time when the user upgraded an auto-renewable
   * subscription plan, in UNIX epoch time format, in milliseconds.
   * This field is only present for refunded transactions. Use this time format for processing dates.
   *
   * @example 1616411598724
   */
  cancellation_date_ms?: string

  /**
   * The time when Apple customer support canceled a transaction, in the Pacific Time zone.
   * This field is only present for refunded transactions.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  cancellation_date_pst?: string

  /**
   * The reason for a refunded transaction.
   * When a customer cancels a transaction, the App Store gives them a refund and provides a value for this key.
   *
   * 1 - the customer canceled their transaction due to an actual or perceived issue within your app.
   * 0 - the transaction was canceled for another reason; for example, if the customer made the purchase accidentally.
   */
  cancellation_reason?: BinaryString

  /**
   * The time when a subscription expires or when it will renew, in UNIX epoch time format, in milliseconds.
   * Use this time format for processing dates.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  expires_date?: string

  /**
   * The time when a subscription expires or when it will renew, in UNIX epoch time format, in milliseconds.
   * Use this time format for processing dates.
   *
   * @example 1616411598724
   */
  expires_date_ms: string

  /**
   * The time when a subscription expires or when it will renew, in the Pacific Time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  expires_date_pst: string

  /**
   * A value that indicates whether the user is the purchaser of the product, or is a family member with access to the
   * product through Family Sharing.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/in_app_ownership_type
   */
  in_app_ownership_type: 'FAMILY_SHARED' | 'PURCHASED'

  /**
   * An indicator of whether an auto-renewable subscription is in the introductory price period.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/is_in_intro_offer_period
   */
  is_in_intro_offer_period?: BooleanString

  /**
   * An indicator of whether a subscription is in the free trial period.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/is_trial_period
   */
  is_trial_period?: BooleanString

  /**
   * The time of the original app purchase, in a date-time format similar to the ISO 8601 standard.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  original_purchase_date: string

  /**
   * The time of the original app purchase, in UNIX epoch time format, in milliseconds.
   * Use this time format for processing dates. This value indicates the date of the subscription’s initial purchase.
   * The original purchase date applies to all product types and remains the same in all transactions for the same
   * product ID.
   * This value corresponds to the original transaction's transactionDate property in StoreKit.
   *
   * @example 1616411598724
   */
  original_purchase_date_ms: string

  /**
   * The time of the original app purchase, in the Pacific time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  original_purchase_date_pst: string

  /**
   * The transaction identifier of the original purchase.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/original_transaction_id
   */
  original_transaction_id: string

  /**
   * The identifier of the subscription offer redeemed by the user.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/promotional_offer_id
   */
  promotional_offer_id?: string

  /**
   * The unique identifier of the product purchased.
   * You provide this value when creating the product in App Store Connect, and it corresponds to the productIdentifier
   * property of the SKPayment object stored in the transaction’s payment property.
   */
  product_id: string

  /**
   * The time when the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in
   * a date-time format similar to the ISO 8601 standard.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  purchase_date: string

  /**
   * The time when the App Store charged the user’s account for a subscription purchase or renewal after a lapse,
   * in the UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   *
   * @example 1616411598724
   */
  purchase_date_ms: string

  /**
   * The time when the App Store charged the user’s account for a subscription purchase or renewal after a lapse,
   * in the Pacific time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  purchase_date_pst: string

  /**
   * The number of consumable products purchased.
   * This value corresponds to the quantity property of the SKPayment object stored in the transaction's payment
   * property. The value is usually '1' unless modified with a mutable payment. The maximum value is '10'.
   */
  quantity?: string

  /**
   * A unique identifier for a transaction such as a purchase, restore, or renewal.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/transaction_id
   */
  transaction_id: string

  /**
   * A unique identifier for purchase events across devices, including subscription-renewal events.
   * This value is the primary key to identify subscription purchases.
   */
  web_order_line_item_id?: string
}
