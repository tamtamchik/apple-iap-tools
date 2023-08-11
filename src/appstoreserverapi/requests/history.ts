/**
 * A token you use in a query to request the next set of transactions for the customer.
 *
 * The App Store server returns a revision value in each response to certain endpoints, such as
 * Get Transaction History and Get Refund History. Use the revision value to get a set of paginated transactions.
 *
 * The first time you call an endpoint, you don't include a revision query parameter, and the API returns the
 * customer's first set of up to 20 transactions. If there are more transactions, the hasMore value in the response
 * is true. To get the next set of transactions, use the revision value from the response in your subsequent call
 * to the endpoint.
 *
 * Consider storing the revision value from the last page of transactions, when the hasMore value is false, with
 * other customer account information. Use it the next time you call the endpoint for the same customer, to avoid
 * fetching transactions you've already received. For the Get Transaction History endpoint, store the revision
 * value only if you request the transaction history in ASCENDING sort order.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/revision
 * @version 1.0+
 */
type revision = string

/**
 * Get a customer’s in-app purchase transaction history for your app.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/get_transaction_history
 * @version 1.0+
 */
export interface HistoryQuery {
  revision?: revision

  /**
   * The start date of a timespan, expressed in UNIX time, in milliseconds.
   * The start date must be earlier than the {@link endDate}.
   * @link https://developer.apple.com/documentation/appstoreserverapi/startdate
   * @version 1.5+
   */
  startDate?: number

  /**
   * The start date of a timespan, expressed in UNIX time, in milliseconds.
   * The end date must be later than the {@link startDate}.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/enddate
   * @version 1.5+
   */
  endDate?: number

  /**
   * The unique identifier for the product, that you create in App Store Connect.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/productid
   * @version 1.0+
   */
  productId?: string

  /**
   * An optional filter that indicates the product type to include in the transaction history.
   * Your query may specify more than one productType.
   */
  productType?: 'AUTO_RENEWABLE' | 'NON_RENEWABLE' | 'CONSUMABLE' | 'NON_CONSUMABLE'

  /**
   * An optional sort order for the transaction history records.
   * The response sorts the transaction records by their recently modified date.
   * The default value is ASCENDING, so you receive the oldest records first.
   */
  sort?: 'ASCENDING' | 'DESCENDING'

  /**
   * The identifier of the subscription group that the subscription belongs to.
   *
   * Auto-renewable subscriptions always belong to a subscription group. You create the subscription group identifiers
   * in App Store Connect before you create and add an auto-renewable subscription.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/subscriptiongroupidentifier
   * @version 1.0+
   */
  subscriptionGroupIdentifier?: string[]

  inAppOwnershipType?: 'FAMILY_SHARED' | 'PURCHASED'

  /**
   * An optional Boolean value that indicates whether the response includes only revoked transactions when the
   * value is true, or contains only nonrevoked transactions when the value is false.
   * By default, the request doesn't include this parameter.
   */
  revoked?: boolean

  /**
   * Set revoked to false to exclude revoked transactions instead.
   *
   * @deprecated
   */
  excludeRevoked?: boolean
}

/**
 * A response that contains the customer’s transaction history for an app.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/historyresponse
 * @version 1.0+
 */
export interface HistoryResponse {
  /**
   * The unique identifier of an app in the App Store.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/appappleid
   * @version 1.0+
   */
  appAppleId: number

  /**
   * The bundle identifier of an app.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/bundleid
   * @version 1.0+
   */
  bundleId: string

  /**
   * The server environment, either sandbox or production.
   *
   * You receive data from the App Store Server API for the sandbox environment when you send test requests to
   * the endpoints using the sandbox base URL: https://api.storekit-sandbox.itunes.apple.com
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/environment
   * @version 1.0+
   */
  environment: 'Sandbox' | 'Production'

  /**
   * A Boolean value indicating whether the App Store has more transaction data.
   *
   * This value is true if the App Store has more transactions for the customer. Call the endpoint again,
   * including the revision or paginationToken query parameter, to get the next set of transactions.
   * If this value is false, there aren’t any additional transactions.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/hasmore
   * @version 1.0+
   */
  hasMore: boolean

  revision: revision

  /**
   * Transaction information signed by the App Store, in JSON Web Signature (JWS) format.
   *
   * The JWSTransaction type is a string of three Base64 URL-encoded components, separated by a period.
   * The string contains transaction information signed by the App Store according to the JSON Web Signature (JWS)
   * IETF RFC 7515 specification.
   *
   * The three components of the string are a header, a payload, and a signature.
   *
   * To read the transaction information, decode the payload. Use a JWSTransactionDecodedPayload object to read the
   * payload information.
   *
   * To read the header, decode it and use a JWSDecodedHeader object to access the information.
   * Use the information in the header to verify the signature.
   *
   * @link https://developer.apple.com/documentation/appstoreserverapi/jwstransaction
   * @version 1.0+
   */
  signedTransactions: string[]
}
