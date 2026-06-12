/**
 * A value that indicates whether the order ID in the request is valid for your app.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/orderlookupstatus
 * @version 1.0+
 */
export enum OrderLookupStatus {
  /**
   * The orderId is valid and contains at least one in-app purchase for your app.
   */
  VALID = 0,

  /**
   * The orderId is invalid, or it doesn't contain in-app purchases for your app.
   */
  INVALID = 1,
}

/**
 * A response that includes the order lookup status and an array of signed transactions
 * for the in-app purchases in the order.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/orderlookupresponse
 * @version 1.0+
 */
export interface OrderLookupResponse {
  /**
   * The status that indicates whether the order ID is valid.
   */
  status: OrderLookupStatus

  /**
   * An array of in-app purchase transactions that are part of the order, signed by the App Store,
   * in JSON Web Signature (JWS) format. Omitted when the status is {@link OrderLookupStatus.INVALID}.
   */
  signedTransactions?: string[]
}
