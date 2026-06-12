/**
 * The type of an external purchase custom link token.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/tokentype
 * @version 2.18+
 */
export enum tokenType {
  /**
   * A token Apple created for a services purchase.
   */
  SERVICES = 'SERVICES',

  /**
   * A token Apple created for an acquisition.
   */
  ACQUISITION = 'ACQUISITION',
}

/**
 * The payload data that contains an external purchase token.
 *
 * Appears in the payload when the {@link notificationType} is
 * {@link notificationType.EXTERNAL_PURCHASE_TOKEN}.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/externalpurchasetoken
 * @version 2.11+
 */
export interface externalPurchaseToken {
  /**
   * The unique identifier of the token. Use this value to report tokens and their associated transactions
   * using the Send External Purchase Report endpoint.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/externalpurchaseid
   * @version 2.11+
   */
  externalPurchaseId: string

  /**
   * The UNIX time, in milliseconds, when the system created the token.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/tokencreationdate
   * @version 2.11+
   */
  tokenCreationDate: number

  /**
   * The unique identifier of the app that the notification applies to.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/appappleid
   * @version 2.11+
   */
  appAppleId: number

  /**
   * The bundle identifier of the app.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/bundleid
   * @version 2.11+
   */
  bundleId: string

  /**
   * The UNIX time, in milliseconds, when the token expires. Appears only for custom link tokens.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/tokenexpirationdate
   * @version 2.18+
   */
  tokenExpirationDate?: number

  /**
   * The type of the custom link token. Appears only for custom link tokens.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/tokentype
   * @version 2.18+
   */
  tokenType?: tokenType
}
