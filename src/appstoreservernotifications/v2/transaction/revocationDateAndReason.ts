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
