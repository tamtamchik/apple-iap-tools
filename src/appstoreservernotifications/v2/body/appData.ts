import { environment } from './data'

/**
 * The app metadata and the signed app transaction information.
 *
 * Appears in the payload when the {@link notificationType} is
 * {@link notificationType.RESCIND_CONSENT}.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/appdata
 * @version 2.19+
 */
export interface appData {
  /**
   * The unique identifier of the app that the notification applies to.
   * This property is available for apps that users download from the App Store.
   * It isn't present in the sandbox environment.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/appappleid
   * @version 2.19+
   */
  appAppleId?: number

  /**
   * The bundle identifier of the app.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/bundleid
   * @version 2.19+
   */
  bundleId: string

  environment: environment

  /**
   * App transaction information signed by the App Store, in JSON Web Signature (JWS) format.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsapptransaction
   * @version 2.19+
   */
  signedAppTransactionInfo?: string
}
