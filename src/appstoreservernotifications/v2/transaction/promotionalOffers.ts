/**
 * The identifier that contains the offer code or the promotional offer identifier.
 *
 * The offerIdentifier applies to every {@link offerType} except an introductory offer (1).
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
 * All offer types except the introductory offer have an offerIdentifier.
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

  /**
   * A win-back offer.
   */
  WIN_BACK = 4,
}

/**
 * The payment mode you configure for the subscription offer.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/offerdiscounttype
 * @version 2.10+
 */
export enum offerDiscountType {
  /**
   * A payment mode of a product discount that indicates a free trial.
   */
  FREE_TRIAL = 'FREE_TRIAL',

  /**
   * A payment mode of a product discount that customers pay over a single or multiple billing periods.
   */
  PAY_AS_YOU_GO = 'PAY_AS_YOU_GO',

  /**
   * A payment mode of a product discount that customers pay up front.
   */
  PAY_UP_FRONT = 'PAY_UP_FRONT',

  /**
   * A discount for a consumable, non-consumable, or non-renewing subscription (In-App Purchase offer codes).
   */
  ONE_TIME = 'ONE_TIME',
}

/**
 * The duration of the offer, in ISO 8601 duration format (for example, `P1M` for one month).
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/offerperiod
 * @version 2.15+
 */
export type offerPeriod = string

/**
 * An array of win-back offer identifiers that a customer is eligible to redeem.
 * The array sorts the identifiers in order of the best offers first.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/eligiblewinbackofferids
 * @version 2.13+
 */
export type eligibleWinBackOfferIds = string[]
