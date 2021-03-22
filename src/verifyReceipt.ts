import fetch from 'node-fetch'

import { VerifyReceiptRequestBody } from './VerifyReceiptRequestBody'
import { VerifyReceiptErrorStatus, VerifyReceiptResponseBody } from './VerifyReceiptResponseBody'

const PRODUCTION_URL = 'https://buy.itunes.apple.com/verifyReceipt'
const SANDBOX_URL = 'https://sandbox.itunes.apple.com/verifyReceipt'

async function request (url: string, body: VerifyReceiptRequestBody): Promise<VerifyReceiptResponseBody> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

/**
 * Function to verifyReceipt receipts via Apple servers.
 *
 * @param {VerifyReceiptRequestBody} payload
 * @return {VerifyReceiptResponseBody}
 */
export async function verifyReceipt (payload: VerifyReceiptRequestBody): Promise<VerifyReceiptResponseBody> {
  let result = await request(PRODUCTION_URL, payload)
  if (result.status === VerifyReceiptErrorStatus.USE_TEST_ENVIRONMENT) {
    result = await request(SANDBOX_URL, payload)
  }
  return result
}
