/**
 * A response that contains an array of signed JSON Web Signature (JWS) refunded transactions,
 * and paging information.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/refundhistoryresponse
 * @version 1.6+
 */
export interface RefundHistoryResponse {
  /**
   * A list of up to 20 JWS transactions, or an empty array if the customer hasn't received any refunds
   * in your app. The transactions are sorted in ascending order by modifiedDate.
   */
  signedTransactions: string[]

  /**
   * A Boolean value indicating whether the App Store has more transaction data.
   */
  hasMore: boolean

  /**
   * A token you use in a query to request the next set of transactions for the customer.
   */
  revision: string
}
