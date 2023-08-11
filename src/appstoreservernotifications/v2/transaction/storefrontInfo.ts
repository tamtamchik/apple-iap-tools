/**
 * The three-letter code that represents the country or region associated with the App Store storefront for the purchase.
 *
 * This property uses the ISO 3166-1 alpha-3 country code representation.
 * This property is the same as the `countryCode` in StoreKit.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/storefront
 * @version 2.8+
 */
export type storefront = string

/**
 * An Apple-defined value that uniquely identifies an App Store storefront.
 *
 * This value is the same as the `id` value in StoreKit.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/storefrontid
 * @version 2.8+
 */
export type storefrontId = string
