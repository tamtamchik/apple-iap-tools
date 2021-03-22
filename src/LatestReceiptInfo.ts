import { InAppPurchaseTransaction } from './InAppPurchaseTransaction'

/**
 * An object that contains information about the latest in-app subscription transaction.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/unified_receipt/latest_receipt_info
 */
export interface LatestReceiptInfo extends InAppPurchaseTransaction {
  /**
   * An indicator that the system canceled a subscription because the user upgraded.
   * This field is only present for upgrade transactions.
   */
  is_upgraded?: true

  /**
   * The reference name of a subscription offer you configured in App Store Connect.
   * This field is present when a customer redeemed a subscription offer code.
   *
   * @link https://developer.apple.com/documentation/appstorereceipts/offer_code_ref_name
   */
  offer_code_ref_name?: string

  /**
   * The identifier of the subscription group to which the subscription belongs.
   * The value for this field is identical to the subscriptionGroupIdentifier property in SKProduct.
   */
  subscription_group_identifier?: string
}
