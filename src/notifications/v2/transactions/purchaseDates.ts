/**
 * The purchase date of the transaction associated with the original transaction identifier.
 *
 * The original purchase date is in UNIX time, in milliseconds.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/originalpurchasedate
 * @version 2.0+
 */
export type originalPurchaseDate = number

/**
 * The time that the App Store charged the user’s account for a purchase, a restored product, a subscription, or
 * a subscription renewal after a lapse.
 *
 * The purchase date is in UNIX time, in milliseconds.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/purchasedate
 * @version 2.0+
 */
export type purchaseDate = number

/**
 * Don't use the `recentSubscriptionStartDate` date to calculate days of paid service.
 *
 * The earliest start date of a subscription in a series of auto-renewable subscription purchases that ignores
 * all lapses of paid service shorter than 60 days.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/recentsubscriptionstartdate
 * @version 2.5+
 */
export type recentSubscriptionStartDate = number
