/**
 * The UNIX time, in milliseconds, that the App Store refunded the transaction or revoked it from Family Sharing.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/revocationdate
 * @version 2.0+
 */
export type revocationDate = number

export enum revocationReason {
  /**
   * The App Store refunded the transaction on behalf of the customer for other reasons, for example,
   * an accidental purchase.
   */
  CUSTOMER_CANCELLED = 0,

  /**
   * The App Store refunded the transaction on behalf of the customer due to an actual or perceived issue
   * within your app.
   */
  APP_ISSUE = 1,
}

/**
 * The type of refund or revocation.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/revocationtype
 * @version 2.19+
 */
export enum revocationType {
  /**
   * The App Store refunded the full amount of the transaction.
   */
  REFUND_FULL = 'REFUND_FULL',

  /**
   * The App Store refunded a prorated amount of the transaction.
   */
  REFUND_PRORATED = 'REFUND_PRORATED',

  /**
   * The transaction was revoked from Family Sharing.
   */
  FAMILY_REVOKE = 'FAMILY_REVOKE',
}

/**
 * The percentage, in milliunits, of the transaction that the App Store refunded or revoked.
 * The value ranges from 0 to 100000 (100000 means 100%).
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/revocationpercentage
 * @version 2.19+
 */
export type revocationPercentage = number
