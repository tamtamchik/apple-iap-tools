import { LatestReceiptInfo } from './latestReceiptInfo'
import { PendingRenewalInfo } from './pendingRenewalInfo'

/**
 * An object that contains information about the most-recent, in-app purchase transactions for the app.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/unified_receipt
 *
 * @deprecated The App Store Server Notifications V1 endpoint and version 1 notifications are deprecated.
 * Implement the App Store Server Notifications V2 endpoint on your server to receive version 2 notifications instead.
 */
export interface UnifiedReceipt {
  /**
   * The environment for which App Store generated the receipt.
   */
  environment: 'Sandbox' | 'Production'

  /**
   * The latest Base64-encoded app receipt.
   */
  latest_receipt: string

  /**
   * An array that contains the latest 100 in-app purchase transactions of the decoded value in latest_receipt.
   * This array excludes transactions for consumable products your app has marked as finished.
   * The contents of this array are identical to those in {@link VerifyReceiptResponseSuccess.latest_receipt_info} in
   * the verifyReceipt endpoint response for receipt validation.
   */
  latest_receipt_info: LatestReceiptInfo[]

  /**
   * An array where each element contains the pending renewal information for each auto-renewable subscription
   * identified in product_id.
   * The contents of this array are identical to those in {@link VerifyReceiptResponseSuccess.latest_receipt_info} in
   * the verifyReceipt endpoint response for receipt validation.
   */
  pending_renewal_info: PendingRenewalInfo[]

  /**
   * The status code, where 0 indicates that the notification is valid.
   */
  status: number
}
