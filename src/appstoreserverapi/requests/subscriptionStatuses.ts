import { status } from '../../appstoreservernotifications/v2/body'

/**
 * The most recent App Store-signed transaction information and App Store-signed renewal
 * information for an auto-renewable subscription.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/lasttransactionsitem
 * @version 1.0+
 */
export interface LastTransactionsItem {
  /**
   * The original transaction identifier of the auto-renewable subscription.
   */
  originalTransactionId: string

  /**
   * The status of the auto-renewable subscription.
   */
  status: status

  /**
   * Transaction information signed by the App Store, in JSON Web Signature (JWS) format.
   */
  signedTransactionInfo: string

  /**
   * Subscription renewal information signed by the App Store, in JSON Web Signature (JWS) format.
   */
  signedRenewalInfo: string
}

/**
 * Information for auto-renewable subscriptions, including signed transaction information and
 * signed renewal information, for one subscription group.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/subscriptiongroupidentifieritem
 * @version 1.0+
 */
export interface SubscriptionGroupIdentifierItem {
  /**
   * The identifier of the subscription group that the subscription belongs to.
   */
  subscriptionGroupIdentifier: string

  /**
   * An array of the most recent App Store-signed transaction information and App Store-signed
   * renewal information for all auto-renewable subscriptions in the subscription group.
   */
  lastTransactions: LastTransactionsItem[]
}

/**
 * A response that contains status information for all of a customer’s auto-renewable subscriptions
 * in your app.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/statusresponse
 * @version 1.0+
 */
export interface StatusResponse {
  /**
   * An array of information for auto-renewable subscriptions, including App Store-signed transaction
   * information and App Store-signed renewal information.
   */
  data: SubscriptionGroupIdentifierItem[]

  /**
   * The server environment, sandbox or production, in which the App Store generated the response.
   */
  environment: 'Sandbox' | 'Production'

  /**
   * The unique identifier of an app in the App Store.
   */
  appAppleId: number

  /**
   * The bundle identifier of an app.
   */
  bundleId: string
}
