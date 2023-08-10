/**
 * The identifier that contains the offer code or the promotional offer identifier.
 *
 * The offerIdentifier applies only when the {@link offerType} has a value of 2 or 3.
 *
 * The offerIdentifier provides details about the subscription offer in effect for the transaction.
 * Its value is either the offer code or the promotional offer.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/offeridentifier
 * @version 2.0+
 */
export type offerIdentifier = string

/**
 * The type of subscription offer.
 *
 * The offer types 2 and 3 have an offerIdentifier.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/offertype
 * @version 2.0+
 */
export enum offerType {
  /**
   * An introductory offer.
   */
  INTRODUCTORY = 1,

  /**
   * A promotional offer.
   */
  PROMOTIONAL = 2,

  /**
   * An offer with a subscription offer code.
   */
  SUBSCRIPTION_OFFER_CODE = 3,
}
