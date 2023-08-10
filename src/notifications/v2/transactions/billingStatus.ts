/**
 * A Boolean value that indicates whether the App Store is attempting to automatically renew a subscription that
 * expired due to a billing issue.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/isinbillingretryperiod
 * @version 2.0+
 */
export type isInBillingRetryPeriod = boolean

/**
 * The time when the billing grace period for a subscription renewal expires.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/graceperiodexpiresdate
 * @version 2.0+
 */
export type gracePeriodExpiresDate = number
