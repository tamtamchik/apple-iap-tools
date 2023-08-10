import { data } from './data'
import { notificationType } from './notificationType'
import { subtype } from './subtype'
import { summary } from './summary'

/**
 * A decoded payload containing the version 2 notification data.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/responsebodyv2decodedpayload
 * @version 2.0+
 */
export interface responseBodyV2DecodedPayload {

  notificationType: notificationType

  subtype?: subtype

  data?: data

  summary?: summary

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
