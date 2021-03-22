/**
 * The JSON contents you submit with the verifyReceipt request to the App Store.
 *
 * @link https://developer.apple.com/documentation/appstorereceipts/requestbody
 */
export interface VerifyReceiptRequestBody {
  /**
   * The Base64-encoded receipt data.
   */
  'receipt-data': string

  /**
   * Your app’s shared secret, which is a hexadecimal string.
   */
  password: string

  /**
   * Set this value to true for the response to include only the latest renewal transaction for any subscriptions.
   * Use this field only for app receipts that contain auto-renewable subscriptions.
   */
  'exclude-old-transactions'?: boolean
}
