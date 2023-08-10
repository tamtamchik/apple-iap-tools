/**
 * A string that provides details about select notification types in version 2.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/subtype
 * @version 2.0+
 */
export enum subtype {
  /**
   * Applies to the {@link notificationType.PRICE_INCREASE} notificationType.
   * A notification with this subtype indicates that the user accepted the subscription price increase.
   */
  ACCEPTED = 'ACCEPTED',

  /**
   * Applies to the {@link notificationType.DID_CHANGE_RENEWAL_STATUS} notificationType.
   * A notification with this subtype indicates that the user disabled subscription auto-renewal, or
   * the App Store disabled subscription auto-renewal after the user requested a refund.
   */
  AUTO_RENEW_DISABLED = 'AUTO_RENEW_DISABLED',

  /**
   * Applies to the {@link notificationType.DID_CHANGE_RENEWAL_STATUS} notificationType.
   * A notification with this subtype indicates that the user enabled subscription auto-renewal.
   */
  AUTO_RENEW_ENABLED = 'AUTO_RENEW_ENABLED',

  /**
   * Applies to the {@link notificationType.DID_RENEW} notificationType.
   * A notification with this subtype indicates that the expired subscription that previously failed to renew
   * has successfully renewed.
   */
  BILLING_RECOVERY = 'BILLING_RECOVERY',

  /**
   * Applies to the {@link notificationType.EXPIRED} notificationType.
   * A notification with this subtype indicates that the subscription expired because the subscription failed to renew
   * before the billing retry period ended.
   */
  BILLING_RETRY = 'BILLING_RETRY',

  /**
   * Applies to the {@link notificationType.DID_CHANGE_RENEWAL_PREF} notificationType.
   * A notification with this subtype indicates that the user downgraded their subscription or cross-graded to
   * a subscription with a different duration. Downgrades take effect at the next renewal date.
   */
  DOWNGRADE = 'DOWNGRADE',

  /**
   * Applies to the {@link notificationType.RENEWAL_EXTENSION} notificationType.
   * A notification with this subtype indicates that the subscription-renewal-date extension failed for
   * an individual subscription.
   *
   * For details, see the {@link data} object in the {@link responseBodyV2DecodedPayload}.
   */
  FAILURE = 'FAILURE',

  /**
   * Applies to the {@link notificationType.DID_FAIL_TO_RENEW} notificationType.
   * A notification with this subtype indicates that the subscription failed to renew due to a billing issue.
   * Continue to provide access to the subscription during the grace period.
   */
  GRACE_PERIOD = 'GRACE_PERIOD',

  /**
   * Applies to the {@link notificationType.SUBSCRIBED} notificationType.
   * A notification with this subtype indicates that the user purchased the subscription for the first time or
   * that the user received access to the subscription through Family Sharing for the first time.
   */
  INITIAL_BUY = 'INITIAL_BUY',

  /**
   * Applies to the {@link notificationType.PRICE_INCREASE} notificationType.
   * A notification with this subtype indicates that the system informed the user of the subscription price increase,
   * but the user hasn't accepted it.
   */
  PENDING = 'PENDING',

  /**
   * Applies to the {@link notificationType.EXPIRED} notificationType.
   * A notification with this subtype indicates that the subscription expired because the user didn't consent to
   * a price increase.
   */
  PRICE_INCREASE = 'PRICE_INCREASE',

  /**
   * Applies to the {@link notificationType.EXPIRED} notificationType.
   * A notification with this subtype indicates that the subscription expired because the product wasn't available for
   * purchase at the time the subscription attempted to renew.
   */
  PRODUCT_NOT_FOR_SALE = 'PRODUCT_NOT_FOR_SALE',

  /**
   * Applies to the {@link notificationType.SUBSCRIBED} notificationType.
   * A notification with this subtype indicates that the user resubscribed or received access through Family Sharing
   * to the same subscription or to another subscription within the same subscription group.
   */
  RESUBSCRIBE = 'RESUBSCRIBE',

  /**
   * Applies to the {@link notificationType.RENEWAL_EXTENSION} notificationType.
   * A notification with this subtype indicates that the App Store server completed your request to extend the
   * subscription renewal date for all eligible subscribers.
   *
   * For the summary details, see the {@link summary} object in the {@link responseBodyV2DecodedPayload}.
   */
  SUMMARY = 'SUMMARY',

  /**
   * Applies to the {@link notificationType.DID_CHANGE_RENEWAL_PREF} notificationType.
   * A notification with this subtype indicates that the user upgraded their subscription or cross-graded to
   * a subscription with the same duration. Upgrades take effect immediately.
   */
  UPGRADE = 'UPGRADE',

  /**
   * Applies to the {@link notificationType.EXPIRED} notificationType.
   * A notification with this subtype indicates that the subscription expired after the user disabled subscription
   * auto-renewal.
   */
  VOLUNTARY = 'VOLUNTARY',
}
