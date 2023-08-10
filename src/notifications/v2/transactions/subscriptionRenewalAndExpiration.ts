/**
 * The renewal status for an auto-renewable subscription.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/autorenewstatus
 * @version 2.0+
 */
export enum autoRenewStatus {
  /**
   * Automatic renewal is off. The customer has turned off automatic renewal for the subscription, and it won't
   * renew at the end of the current subscription period.
   */
  OFF = 0,

  /**
   * Automatic renewal is on. The subscription renews at the end of the current subscription period.
   */
  ON = 1,
}

/**
 * The product identifier of the product that will renew at the next billing period.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/autorenewproductid
 * @version 2.0+
 */
export type autoRenewProductId = string

/**
 * The reason a subscription expired.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/expirationintent
 * @version 2.0+
 */
export enum expirationIntent {
  /**
   * The customer canceled their subscription.
   */
  CUSTOMER_CANCELED = 1,

  /**
   * Billing error; for example, the customer’s payment information is no longer valid.
   */
  BILLING_ERROR = 2,

  /**
   * The customer didn't consent to an auto-renewable subscription price increase that requires customer consent,
   * allowing the subscription to expire.
   */
  CUSTOMER_DENIED_PRICE_INCREASE = 3,

  /**
   * The product wasn't available for purchase at the time of renewal.
   */
  PRODUCT_NOT_AVAILABLE = 4,

  /**
   * The subscription expired for some other reason.
   */
  UNKNOWN = 5,
}

/**
 * The UNIX time, in milliseconds, an auto-renewable subscription purchase expires or renews.
 *
 * The expiresDate is a static value that applies for each transaction.
 * When the auto-renewable subscription renews, the App Store creates a new transaction with a new expiresDate.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/expiresdate
 * @version 2.0+
 */
export type expiresDate = number

/**
 * A Boolean value that indicates whether the user upgraded to another subscription.
 *
 * If isUpgraded is true, the user has upgraded the subscription represented by this transaction to another subscription.
 * This value appears in the transaction only when the value is true.
 *
 * To determine the service that the customer is entitled to, look for another transaction that has a subscription
 * with a higher level of service.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/isupgraded
 * @version 2.0+
 */
export type isUpgraded = boolean

/**
 * The UNIX time, in milliseconds, when the most recent auto-renewable subscription purchase expires.
 *
 * The renewalDate is a value that's always present in the payload for auto-renewable subscriptions,
 * even for expired subscriptions. This date indicates the expiration date of the most recent auto-renewable
 * subscription purchase, including renewals, and may be in the past. For subscriptions that renew successfully,
 * the renewalDate is the date when the subscription renews.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/renewaldate
 * @version 2.0+
 */
export type renewalDate = number
