import { VerifyReceiptRequestBody } from './requestbody'
import { VerifyReceiptErrorStatus, VerifyReceiptResponseBody } from './responsebody'

const PRODUCTION_URL = 'https://buy.itunes.apple.com/verifyReceipt'
const SANDBOX_URL = 'https://sandbox.itunes.apple.com/verifyReceipt'

/**
 * Send a receipt to the App Store for verification.
 *
 * @deprecated The {@link verifyReceipt} endpoint is deprecated.
 */
async function request (url: string, body: VerifyReceiptRequestBody): Promise<VerifyReceiptResponseBody | Response> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new VerifyReceiptFetchError('Fetch error', response)
  }

  return await response.json() as VerifyReceiptResponseBody | Response
}

/**
 * Function to verifyReceipt receipts via Apple servers.
 *
 * @param {VerifyReceiptRequestBody} payload
 * @return {Promise<VerifyReceiptResponseBody>}
 *
 * @throws {VerifyReceiptFetchError}
 *
 * @deprecated The {@link verifyReceipt} endpoint is deprecated.
 */
export async function verifyReceipt (payload: VerifyReceiptRequestBody): Promise<VerifyReceiptResponseBody> {
  let result = await request(PRODUCTION_URL, payload)
  if (result.status === VerifyReceiptErrorStatus.USE_TEST_ENVIRONMENT) {
    result = await request(SANDBOX_URL, payload)
  }
  return result
}

/**
 * Error class for not OK responses.
 *
 * @deprecated The {@link verifyReceipt} endpoint is deprecated.
 */
export class VerifyReceiptFetchError extends Error {
  public originalResponse: Response

  constructor (message: string, response: Response) {
    super(message)

    this.name = 'VerifyReceiptFetchError'
    this.originalResponse = response
  }
}
