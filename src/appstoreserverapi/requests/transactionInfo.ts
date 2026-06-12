/**
 * A response that contains signed transaction information for a single transaction.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/transactioninforesponse
 * @version 1.8+
 */
export interface TransactionInfoResponse {
  /**
   * Transaction information signed by the App Store, in JSON Web Signature (JWS) format.
   * Decode it with a {@link jwsTransactionDecodedPayload} object.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/jwstransaction
   */
  signedTransactionInfo: string
}
