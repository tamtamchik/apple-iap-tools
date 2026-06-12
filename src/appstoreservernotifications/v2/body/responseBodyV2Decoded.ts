import { appData } from './appData'
import { data } from './data'
import { externalPurchaseToken } from './externalPurchaseToken'
import { notificationType } from './notificationType'
import { subtype } from './subtype'
import { summary } from './summary'

/**
 * A decoded payload containing the version 2 notification data.
 *
 * Exactly one of {@link data}, {@link summary}, {@link externalPurchaseToken},
 * or {@link appData} is present in a notification.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2decodedpayload
 * @version 2.0+
 */
interface responseBodyV2DecodedGeneric {

  notificationType: notificationType

  subtype?: subtype

  /**
   * A string that indicates the notification’s App Store Server Notifications version number.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/version
   * @version 2.5+
   */
  version: string

  /**
   * The UNIX time, in milliseconds, that the App Store signed the JSON Web Signature data.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/signeddate
   * @version 2.0+
   */
  signedDate: number

  /**
   * A unique identifier for the notification.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/notificationuuid
   * @version 2.0+
   */
  notificationUUID: string
}

export interface responseBodyV2DecodedData extends responseBodyV2DecodedGeneric {
  summary?: never
  externalPurchaseToken?: never
  appData?: never
  data: data
}

export interface responseBodyV2DecodedSummary extends responseBodyV2DecodedGeneric {
  data?: never
  externalPurchaseToken?: never
  appData?: never
  summary: summary
}

export interface responseBodyV2DecodedExternalPurchaseToken extends responseBodyV2DecodedGeneric {
  data?: never
  summary?: never
  appData?: never
  externalPurchaseToken: externalPurchaseToken
}

export interface responseBodyV2DecodedAppData extends responseBodyV2DecodedGeneric {
  data?: never
  summary?: never
  externalPurchaseToken?: never
  appData: appData
}

export type responseBodyV2Decoded =
  | responseBodyV2DecodedSummary
  | responseBodyV2DecodedData
  | responseBodyV2DecodedExternalPurchaseToken
  | responseBodyV2DecodedAppData
