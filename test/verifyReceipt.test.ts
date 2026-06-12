import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { VerifyReceiptRequestBody } from '../src/deprecated/verify/requestbody'
import { verifyReceipt, VerifyReceiptFetchError } from '../src/deprecated/verify/verifyReceipt'

const payload: VerifyReceiptRequestBody = { 'receipt-data': 'receipt', password: 'secret' }

function jsonResponse (body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status })
}

describe('verifyReceipt', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    fetchMock.mockReset()
  })

  it('verifies against the production endpoint', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ status: 0 }))

    const result = await verifyReceipt(payload)

    expect(result.status).toBe(0)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://buy.itunes.apple.com/verifyReceipt')
    expect(init.method).toBe('POST')
    expect(JSON.parse(init.body)).toEqual(payload)
  })

  it('retries against the sandbox endpoint on status 21007', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ status: 21007 }))
      .mockResolvedValueOnce(jsonResponse({ status: 0 }))

    const result = await verifyReceipt(payload)

    expect(result.status).toBe(0)
    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock.mock.calls[1][0]).toBe('https://sandbox.itunes.apple.com/verifyReceipt')
  })

  it('throws VerifyReceiptFetchError with the original response on a non-OK response', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503 }))

    const error = await verifyReceipt(payload).catch((e: unknown) => e)

    expect(error).toBeInstanceOf(VerifyReceiptFetchError)
    expect((error as VerifyReceiptFetchError).originalResponse.status).toBe(503)
  })
})
