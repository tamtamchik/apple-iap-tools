/**
 * The type that describes the in-app purchase event for which the App Store sent the notification.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/notification_type
 */
export enum ServerNotificationType {
  /**
   * Indicates that either Apple customer support canceled the auto-renewable subscription or the user upgraded their
   * auto-renewable subscription. The {@link InAppPurchaseTransaction.cancellation_date} key contains the date and time of the change.
   */
  CANCEL = 'CANCEL',

  /**
   * Indicates that the customer made a change in their subscription plan that takes effect at the next renewal.
   * The currently active plan isn’t affected.
   */
  DID_CHANGE_RENEWAL_PREF = 'DID_CHANGE_RENEWAL_PREF',

  /**
   * Indicates a change in the subscription renewal status.
   * In the JSON response, check {@link ServerNotificationResponseBody.auto_renew_status_change_date_ms} to know the date and time of the last status
   * update. Check {@link PendingRenewalInfo.auto_renew_status} to know the current renewal status.
   */
  DID_CHANGE_RENEWAL_STATUS = 'DID_CHANGE_RENEWAL_STATUS',

  /**
   * Indicates a subscription that failed to renew due to a billing issue.
   * Check {@link PendingRenewalInfo.is_in_billing_retry_period} to know the current retry status of the subscription.
   * Check {@link PendingRenewalInfo.grace_period_expires_date} to know the new service expiration date if the subscription is in a
   * billing grace period.
   */
  DID_FAIL_TO_RENEW = 'DID_FAIL_TO_RENEW',

  /**
   * Indicates a successful automatic renewal of an expired subscription that failed to renew in the past.
   * Check {@link InAppPurchaseTransaction.expires_date} to determine the next renewal date and time.
   */
  DID_RECOVER = 'DID_RECOVER',

  /**
   * Indicates that a customer’s subscription has successfully auto-renewed for a new transaction period.
   */
  DID_RENEW = 'DID_RENEW',

  /**
   * Occurs at the user’s initial purchase of the subscription.
   * Store {@link UnifiedReceipt.latest_receipt} on your server as a token to verifyReceipt the user’s subscription status
   * at any time by validating it with the App Store.
   */
  INITIAL_BUY = 'INITIAL_BUY',

  /**
   * Indicates the customer renewed a subscription interactively, either by using your app’s interface, or on the
   * App Store in the account’s Subscriptions settings. Make service available immediately.
   */
  INTERACTIVE_RENEWAL = 'INTERACTIVE_RENEWAL',

  /**
   * Indicates that App Store has started asking the customer to consent to your app’s subscription price increase.
   * In the {@link UnifiedReceipt.pending_renewal_info} object, the {@link PendingRenewalInfo.price_consent_status} value is 0, indicating
   * that App Store is asking for the customer’s consent, and hasn't received it.
   * The subscription won’t auto-renew unless the user agrees to the new price.
   * When the customer agrees to the price increase, the system sets {@link PendingRenewalInfo.price_consent_status} to 1.
   * Check the receipt using verifyReceipt to view the updated price-consent status.
   */
  PRICE_INCREASE_CONSENT = 'PRICE_INCREASE_CONSENT',

  /**
   * Indicates that App Store successfully refunded a transaction for a consumable or non-consumable in-app purchase.
   * The {@link InAppPurchaseTransaction.cancellation_date_ms} contains the timestamp of the refunded transaction.
   * The {@link InAppPurchaseTransaction.original_transaction_id} and product_id identify the original transaction and
   * product.
   * The {@link InAppPurchaseTransaction.cancellation_reason} contains the reason.
   */
  REFUND = 'REFUND',

  /**
   * Indicates that an in-app purchase the user was entitled to through Family Sharing is no longer available through
   * sharing.
   *
   * @link https://developer.apple.com/documentation/storekit/in-app_purchase/supporting_family_sharing_in_your_app
   */
  REVOKE = 'REVOKE',

  /**
   * Indicates successful automatic renewal of an expired subscription that failed to renew in the past.
   * Check {@link InAppPurchaseTransaction.expires_date} to determine the next renewal date and time.
   *
   * @deprecated Update your existing code to rely on the {@link DID_RECOVER} notification type instead.
   * @deprecated As of March 10, 2021 this notification is no longer sent in production and sandbox environments.
   */
  RENEWAL = 'RENEWAL',
}
