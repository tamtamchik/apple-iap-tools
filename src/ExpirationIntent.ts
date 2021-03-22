/**
 * The reason a subscription expired.
 *
 * @link https://developer.apple.com/documentation/appstorereceipts/expiration_intent
 */
export enum ExpirationIntent {
  /**
   * The customer voluntarily canceled their subscription.
   */
  CUSTOMER_CANCELED = '1',

  /**
   * Billing error; for example, the customer's payment information was no longer valid.
   */
  BILLING_ERROR = '2',

  /**
   * The customer did not agree to a recent price increase.
   */
  CUSTOMER_DENIED_PRICE_INCREASE = '3',

  /**
   * The product was not available for purchase at the time of renewal.
   */
  PRODUCT_NOT_AVAILABLE = '4',

  /**
   * Unknown Error.
   */
  UNKNOWN = '5',
}
