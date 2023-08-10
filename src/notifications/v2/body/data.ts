/**
 * The server environment, either sandbox or production.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/environment
 * @version 2.0+
 */
export type environment = 'Sandbox' | 'Production'

/**
 * The app metadata and the signed renewal and transaction information.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/data
 * @version 2.0+
 */
export interface data {
  /**
   * The unique identifier of the app that the notification applies to.
   * This property is available for apps that users download from the App Store.
   * It isn't present in the sandbox environment.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/appappleid
   * @version 2.0+
   */
  appAppleId?: string

  /**
   * The bundle identifier of the app.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/bundleid
   * @version 2.0+
   */
  bundleId: string

  /**
   * The version of the build that identifies an iteration of the bundle.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/bundleversion
   * @version 2.0+
   */
  bundleVersion: string

  environment: environment

  /**
   * Subscription renewal information signed by the App Store, in JSON Web Signature (JWS) format.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsrenewalinfo
   * @version 2.0+
   */
  signedRenewalInfo?: string

  /**
   * Transaction information signed by the App Store, in JSON Web Signature (JWS) format.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/jwstransaction
   * @version 2.0+
   */
  signedTransactionInfo: string

  /**
   * The status of an auto-renewable subscription as of the signedDate in the responseBodyV2DecodedPayload.
   * This field appears only for notifications sent for auto-renewable subscriptions.
   *
   * The value for this field is one of the following:
   * - 1: The auto-renewable subscription is active.
   * - 2: The auto-renewable subscription is expired.
   * - 3: This subscription has expired.
   * - 4: The auto-renewable subscription is in a Billing Grace Period.
   * - 5: The auto-renewable subscription is revoked.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/status
   * @version 2.8+
   *
   * TODO: enum?
   */
  status?: 1 | 2 | 3 | 4 | 5
}
