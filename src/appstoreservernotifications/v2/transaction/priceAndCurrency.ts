/**
 * The price, in milliunits, of the in-app purchase or subscription offer that you configured in App Store Connect.
 *
 * The price is an integer; for example, 6990 means $6.99 when the {@link currency} is USD.
 * Apple advises against using this value for revenue reconciliation.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/price
 * @version 2.10+
 */
export type price = number

/**
 * The three-letter ISO 4217 currency code for the price of the product.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/currency
 * @version 2.10+
 */
export type currency = string

/**
 * The renewal price, in milliunits, of the auto-renewable subscription that renews at the next billing period.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/renewalprice
 * @version 2.12+
 */
export type renewalPrice = number
