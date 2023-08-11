/**
 * The cause of a purchase transaction, which indicates whether it's a customer's purchase or a renewal for an
 * auto-renewable subscription that the system initiates.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/transactionreason
 * @version 2.8+
 */
export enum transactionReason {
  /**
   * The customer initiated the purchase, which may be for any in-app purchase type: consumable, non-consumable,
   * non-renewing subscription, or auto-renewable subscription.
   */
  PURCHASE = 'PURCHASE',

  /**
   * The App Store server initiated the purchase transaction to renew an auto-renewable subscription.
   */
  RENEWAL = 'RENEWAL',
}
