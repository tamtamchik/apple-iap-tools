import fetch, { Response } from 'node-fetch'

import { VerifyReceiptRequestBody } from './VerifyReceiptRequestBody.js'
import { VerifyReceiptErrorStatus, VerifyReceiptResponseBody } from './VerifyReceiptResponseBody.js'

const PRODUCTION_URL = 'https://buy.itunes.apple.com/verifyReceipt'
const SANDBOX_URL = 'https://sandbox.itunes.apple.com/verifyReceipt'

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
 */
export class VerifyReceiptFetchError extends Error {
  public originalResponse: Response

  constructor (message: string, response: Response) {
    super(message)

    this.name = 'VerifyReceiptFetchError'
    this.originalResponse = response
  }
}
