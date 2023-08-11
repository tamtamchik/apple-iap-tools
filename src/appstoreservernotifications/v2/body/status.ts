/**
 * The status of an auto-renewable subscription as of the signedDate in the responseBodyV2DecodedPayload.
 * This field appears only for notifications sent for auto-renewable subscriptions.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/status
 * @version 2.8+
 */
export enum status {
  /**
   * The auto-renewable subscription is active.
   *
   * Provide access to the service or content associated with the subscription.
   */
  ACTIVE = 1,

  /**
   * The auto-renewable subscription is expired.
   *
   * Revoke access to the service or content associated with the subscription.
   */
  EXPIRED = 2,

  /**
   * The auto-renewable subscription is in a billing retry period.
   *
   * Provide access to the service or content associated with the subscription.
   */
  BILLING_RETRY_PERIOD = 3,

  /**
   * The auto-renewable subscription is in a Billing Grace Period.
   *
   * Provide access to the service or content associated with the subscription.
   */
  BILLING_GRACE_PERIOD = 4,

  /**
   * The auto-renewable subscription is revoked.
   *
   * Revoke access to the service or content associated with the subscription.
   */
  REVOKED = 5,
}
