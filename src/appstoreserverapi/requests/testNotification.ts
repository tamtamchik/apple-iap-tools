/**
 * A response that contains the test notification token.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/sendtestnotificationresponse
 * @version 1.4+
 */
export interface SendTestNotificationResponse {
  /**
   * The token you use to query the status of the test notification with
   * the Get Test Notification Status endpoint.
   */
  testNotificationToken: string
}

/**
 * The success or error information the App Store server records when it attempts
 * to send an App Store server notification to your server.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/sendattemptresult
 * @version 1.7+
 */
export enum SendAttemptResult {
  SUCCESS = 'SUCCESS',
  TIMED_OUT = 'TIMED_OUT',
  SSL_ISSUE = 'SSL_ISSUE',
  CIRCULAR_REDIRECT = 'CIRCULAR_REDIRECT',
  NO_RESPONSE = 'NO_RESPONSE',
  SOCKET_ISSUE = 'SOCKET_ISSUE',
  UNSUPPORTED_CHARSET = 'UNSUPPORTED_CHARSET',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
  PREMATURE_CLOSE = 'PREMATURE_CLOSE',
  OTHER = 'OTHER',
}

/**
 * The success or error information and the date the App Store server records when it attempts
 * to send a server notification to your server.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/sendattemptitem
 * @version 1.7+
 */
export interface SendAttemptItem {
  /**
   * The UNIX time, in milliseconds, that the App Store server attempted to send the notification.
   */
  attemptDate: number

  /**
   * The success or error information the App Store server recorded for the send attempt.
   */
  sendAttemptResult: SendAttemptResult
}

/**
 * A response that contains the contents of the App Store server's test notification
 * and the result of the send attempts.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/checktestnotificationresponse
 * @version 1.4+
 */
export interface CheckTestNotificationResponse {
  /**
   * An array of information the App Store server records for its attempts to send the TEST
   * notification to your server. The array may contain a maximum of six sendAttemptItems.
   */
  sendAttempts: SendAttemptItem[]

  /**
   * The signed payload of the TEST notification, in JSON Web Signature (JWS) format.
   */
  signedPayload: string
}
