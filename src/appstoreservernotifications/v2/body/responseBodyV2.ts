/**
 * The response body the App Store sends in a version 2 server notification.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2
 * @version 2.0+
 */
export interface responseBodyV2 {
  /**
   * The payload in JSON Web Signature (JWS) format, signed by the App Store.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2
   * @version 2.0+
   */
  signedPayload: string
}
