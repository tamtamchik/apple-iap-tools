/**
 * The bundle identifier of an app.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/bundleid
 * @version 2.0+
 */
export type bundleId = string

/**
 * The product identifier of the in-app purchase.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/productid
 * @version 2.0+
 */
export type productId = string

/**
 * The identifier of the subscription group that the subscription belongs to.
 *
 * Auto-renewable subscriptions always belong to a subscription group. You create the subscription group identifiers
 * in App Store Connect before you create and add an auto-renewable subscription.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/subscriptiongroupidentifier
 * @version 2.0+
 */
export type subscriptionGroupIdentifier = string

/**
 * The product type of the in-app purchase.
 *
 * @name type - apple docs use 'type' as the name, but that's a reserved word in typescript
 * @link https://developer.apple.com/documentation/appstoreservernotifications/type
 * @version 2.0+
 */
export enum productType {
  /**
   * An auto-renewable subscription.
   */
  AUTO_RENEWABLE_SUBSCRIPTION = 'Auto-Renewable Subscription',

  /**
   * A non-consumable in-app purchase.
   */
  NON_CONSUMABLE = 'Non-Consumable',

  /**
   * A consumable in-app purchase.
   */
  CONSUMABLE = 'Consumable',

  /**
   * A non-renewing subscription.
   */
  NON_RENEWING_SUBSCRIPTION = 'Non-Renewing Subscription',
}

/**
 * The number of consumable products purchased.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/quantity
 * @version 2.0+
 */
export type quantity = number
