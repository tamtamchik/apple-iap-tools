/**
 * The type that describes the in-app purchase event for which the App Store sends the version 2 notification.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/notificationtype
 * @version 2.0+
 */
export enum notificationType {

  /**
   * A notification type that indicates that the customer initiated a refund request for a consumable in-app purchase,
   * and the App Store is requesting that you provide consumption data.
   */
  CONSUMPTION_REQUEST = 'CONSUMPTION_REQUEST',

  /**
   * A notification type that, along with its {@link subtype}, indicates that the user made a change to their
   * subscription plan.
   *
   * If the subtype is {@link subtype.UPGRADE}, the user upgraded their subscription, or
   * cross-graded to a subscription with the same duration. The upgrade goes into effect immediately, starting
   * a new billing period, and the user receives a prorated refund for the unused portion of the previous period.
   *
   * If the subtype is {@link subtype.DOWNGRADE}, the user downgraded their subscription or cross-graded to
   * a subscription with a different duration. Downgrades take effect at the next renewal date and don’t affect
   * the currently active plan.
   *
   * If the subtype is empty, the user changed their renewal preference back to the current subscription,
   * effectively canceling a downgrade.
   */
  DID_CHANGE_RENEWAL_PREF = 'DID_CHANGE_RENEWAL_PREF',

  /**
   * A notification type that, along with its subtype, indicates that the user made a change to the subscription renewal status.
   *
   * If the subtype is {@link subtype.AUTO_RENEW_ENABLED}, the user reenabled subscription auto-renewal.
   *
   * If the subtype is {@link subtype.AUTO_RENEW_DISABLED}, the user disabled subscription auto-renewal,
   * or the App Store disabled subscription auto-renewal after the user requested a refund.
   */
  DID_CHANGE_RENEWAL_STATUS = 'DID_CHANGE_RENEWAL_STATUS',

  /**
   * A notification type that, along with its subtype, indicates that the subscription failed to renew
   * due to a billing issue. The subscription enters the billing retry period.
   *
   * If the subtype is {@link subtype.GRACE_PERIOD}, continue to provide service through the grace period.
   *
   * If the subtype is empty, the subscription isn’t in a grace period and you can stop providing
   * the subscription service. Inform the user that there may be an issue with their billing information.
   *
   * The App Store continues to retry billing for 60 days, or until the user resolves their billing issue or
   * cancels their subscription, whichever comes first.
   */
  DID_FAIL_TO_RENEW = 'DID_FAIL_TO_RENEW',

  /**
   * A notification type that, along with its subtype, indicates that the subscription successfully renewed.
   *
   * If the subtype is {@link subtype.BILLING_RECOVERY}, the expired subscription that previously failed to renew
   * has successfully renewed.
   *
   * If the substate is empty, the active subscription has successfully auto-renewed for a new transaction period.
   * Provide the customer with access to the subscription’s content or service.
   */
  DID_RENEW = 'DID_RENEW',

  /**
   * A notification type that, along with its subtype, indicates that a subscription expired.
   *
   * If the subtype is {@link subtype.VOLUNTARY}, the subscription expired after the user disabled subscription renewal.
   *
   * If the subtype is {@link subtype.BILLING_RETRY}, the subscription expired because the billing retry period ended
   * without a successful billing transaction.
   *
   * If the subtype is {@link subtype.PRICE_INCREASE}, the subscription expired because the user didn't consent
   * to a price increase that requires user consent.
   *
   * If the subtype is {@link subtype.PRODUCT_NOT_FOR_SALE}, the subscription expired because the product wasn't
   * available for purchase at the time the subscription attempted to renew.
   *
   * A notification without a subtype indicates that the subscription expired for some other reason.
   */
  EXPIRED = 'EXPIRED',

  /**
   * A notification type that indicates that the billing grace period has ended without renewing the subscription,
   * so you can turn off access to the service or content. Inform the user that there may be an issue with their
   * billing information.
   *
   * The App Store continues to retry billing for 60 days, or until the user resolves their billing issue or cancels
   * their subscription, whichever comes first.
   */
  GRACE_PERIOD_EXPIRED = 'GRACE_PERIOD_EXPIRED',

  /**
   * A notification type that, along with its subtype, indicates that the user redeemed a promotional offer or offer code.
   *
   * If the subtype is {@link subtype.INITIAL_BUY}, the user redeemed the offer for a first-time purchase.
   *
   * If the subtype is {@link subtype.RESUBSCRIBE}, the user redeemed an offer to resubscribe to an inactive subscription.
   *
   * If the subtype is {@link subtype.UPGRADE}, the user redeemed an offer to upgrade their active subscription,
   * which goes into effect immediately.
   *
   * If the subtype is {@link subtype.DOWNGRADE}, the user redeemed an offer to downgrade their active subscription,
   * which goes into effect at the next renewal date.
   *
   * If the user redeemed an offer for their active subscription, you receive an {@link OFFER_REDEEMED} notification type without a subtype.
   */
  OFFER_REDEEMED = 'OFFER_REDEEMED',

  /**
   * A notification type that, along with its subtype, indicates that the system has informed the user of
   * an auto-renewable subscription price increase.
   *
   * If the price increase requires user consent, the subtype is {@link subtype.PENDING} if the user hasn't responded
   * to the price increase, or {@link subtype.ACCEPTED} if the user has consented to the price increase.
   *
   * If the price increase doesn't require user consent, the subtype is {@link subtype.ACCEPTED}.
   */
  PRICE_INCREASE = 'PRICE_INCREASE',

  /**
   * A notification type that indicates that the App Store successfully refunded a transaction for a consumable
   * in-app purchase, a non-consumable in-app purchase, an auto-renewable subscription, or a non-renewing subscription.
   *
   * The {@link revocationDate} contains the timestamp of the refunded transaction. The {@link originalTransactionId} and
   * {@link productId} identify the original transaction and product. The {@link revocationReason} contains the reason.
   */
  REFUND = 'REFUND',

  /**
   * A notification type that indicates the App Store declined a refund request initiated by the app developer using
   * any of the following methods: beginRefundRequest(for:in:), beginRefundRequest(in:), beginRefundRequest(for:in:),
   * beginRefundRequest(in:), and refundRequestSheet(for:isPresented:onDismiss:).
   */
  REFUND_DECLINED = 'REFUND_DECLINED',

  /**
   * A notification type that indicates the App Store reversed a previously granted refund due to a dispute
   * that the customer raised. If your app revoked content or services as a result of the related refund,
   * it needs to reinstate them.
   *
   * This notification type can apply to any in-app purchase type: consumable, non-consumable, non-renewing subscription,
   * and auto-renewable subscription.
   */
  REFUND_REVERSED = 'REFUND_REVERSED',

  /**
   * A notification type that indicates the App Store extended the subscription renewal date for a specific subscription.
   *
   * You request subscription-renewal-date extensions by calling Extend a Subscription Renewal Date
   * or Extend Subscription Renewal Dates for All Active Subscribers in the App Store Server API.
   */
  RENEWAL_EXTENDED = 'RENEWAL_EXTENDED',

  /**
   * A notification type that, along with its subtype, indicates that the App Store is attempting to extend the
   * subscription renewal date that you request by calling Extend Subscription Renewal Dates for All Active Subscribers.
   *
   * If the subtype is {@link subtype.SUMMARY}, the App Store completed extending the renewal date for all eligible
   * subscribers. See the {@link summary} in the {@link responseBodyV2DecodedPayload} for details.
   *
   * If the subtype is {@link subtype.FAILURE}, the renewal date extension didn't succeed for a specific subscription.
   *
   * See the {@link data} in the {@link responseBodyV2DecodedPayload} for details.
   */
  RENEWAL_EXTENSION = 'RENEWAL_EXTENSION',

  /**
   * A notification type that indicates that an in-app purchase the user was entitled to through Family Sharing is
   * no longer available through sharing. The App Store sends this notification when a purchaser disabled Family Sharing
   * for a product, the purchaser (or family member) left the family group, or the purchaser asked for and received
   * a refund.
   *
   * Family Sharing applies to non-consumable in-app purchases and auto-renewable subscriptions.
   */
  REVOKE = 'REVOKE',

  /**
   * A notification type that, along with its subtype, indicates that the user subscribed to a product.
   *
   * If the subtype is {@link subtype.INITIAL_BUY}, the user either purchased or received access through Family Sharing
   * to the subscription for the first time.
   *
   * If the subtype is {@link subtype.RESUBSCRIBE}, the user resubscribed or received access through Family Sharing
   * to the same subscription or to another subscription within the same subscription group.
   */
  SUBSCRIBED = 'SUBSCRIBED',

  /**
   * A notification type that the App Store server sends when you request it by calling the
   * Request a Test Notification endpoint.
   *
   * Call that endpoint to test whether your server is receiving notifications.
   * You receive this notification only at your request.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/request_a_test_notification
   */
  TEST = 'TEST',
}
