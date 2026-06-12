/**
 * An object that contains information about the latest in-app subscription transaction.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebody/latest_receipt_info
 * @deprecated Use the {@link UnifiedReceipt.latest_receipt_info} object instead.
 * @deprecated This object is deprecated in the sandbox and production environments, and no longer included in the
 * response body as of March 10, 2021.
 */
export interface DeprecatedLatestReceiptInfo {
  /**
   * An identifier that App Store Connect generates and the App Store uses to uniquely identify the app purchased.
   * Treat this value as a 64-bit integer.
   */
  app_item_id: string

  /**
   * The time a subscription expires or when it will renew, in UNIX epoch time format, in milliseconds.
   * Use this time format for processing dates.
   * Note that this field is called {@link InAppPurchaseTransaction.expires_date_ms} in the transaction.
   *
   * @example 1616411598724
   */
  expires_date: string

  /**
   * The time a subscription expires or when it will renew, in the Pacific time zone.
   * Note that this field is called {@link InAppPurchaseTransaction.expires_date_pst} in the transaction.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  expires_date_formatted_pst: string

  /**
   * An indicator of whether an auto-renewable subscription is in the introductory price period.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/is_in_intro_offer_period
   */
  is_in_intro_offer_period: string

  /**
   * An indicator of whether a subscription is in the free trial period.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/is_trial_period
   */
  is_trial_period: string

  /**
   * An identifier that App Store Connect generates and the App Store uses to uniquely identify the in-app product
   * purchased. Treat this value as a 64-bit integer.
   */
  item_id: string

  /**
   * The time of the original app purchase, in a date-time format similar to the ISO 8601 standard.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  original_purchase_date: string

  /**
   * The time of the original app purchase, in UNIX epoch time format, in milliseconds. Use this time format for
   * processing dates. This value indicates the date of the subscription's initial purchase.
   * The original purchase date applies to all product types and remains the same in all transactions for the same
   * product ID. This value corresponds to the original transaction’s transactionDate property in StoreKit.
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
   * The unique identifier of the product purchased.
   * You provide this value when creating the product in App Store Connect, and it corresponds to the productIdentifier
   * property of the SKPayment object stored in the transaction’s payment property.
   */
  product_id: string

  /**
   * The time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in a
   * date-time format similar to the ISO 8601 standard.
   *
   * @example 2021-03-01 07:00:00 Etc/GMT
   */
  purchase_date: string

  /**
   * The time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in the
   * UNIX epoch time format, in milliseconds. Use this time format for processing dates.
   *
   * @example 1616411598724
   */
  purchase_date_ms: string

  /**
   * The time the App Store charged the user’s account for a subscription purchase or renewal after a lapse, in the
   * Pacific time zone.
   *
   * @example 2021-01-01 00:00:00 America/Los_Angeles
   */
  purchase_date_pst: string

  /**
   * The number of consumable products purchased.
   * This value corresponds to the quantity property of the SKPayment object stored in the transaction’s payment
   * property. The value is usually '1' unless modified with a mutable payment. The maximum value is '10'.
   */
  quantity: string

  /**
   * A unique identifier for a transaction such as a purchase, restore, or renewal.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/transaction_id
   */
  transaction_id: string

  /**
   * A unique identifier for purchase events across devices, including subscription-renewal events.
   * This value is the primary key for identifying subscription purchases.
   */
  web_order_line_item_id: string
}
