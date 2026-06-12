import { generateKeyPairSync } from 'node:crypto'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InvalidAuthorizationError, ServerAPIError } from '../src/appstoreserverapi/errors'
import { Service, ServiceEnvironment } from '../src/appstoreserverapi/Service'

const { privateKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
const privateKeyPem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString()

function makeService (environment?: ServiceEnvironment): Service {
  return new Service(privateKeyPem, 'key-id', 'issuer-id', 'com.example.app', environment)
}

function jsonResponse (body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), { status, headers })
}

describe('Service', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    fetchMock.mockReset()
  })

  it('requests the sandbox host by default and sends a bearer token', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ hasMore: false }))

    await makeService().getTransactionHistory('123')

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.storekit-sandbox.apple.com/inApps/v2/history/123')
    expect(init.method).toBe('GET')
    expect(init.headers.Authorization).toMatch(/^Bearer .+\..+\..+$/)
  })

  it('builds a valid production URL', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ hasMore: false }))

    await makeService(ServiceEnvironment.Production).getTransactionHistory('123')

    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.storekit.apple.com/inApps/v2/history/123')
  })

  it('serializes repeatable query parameters as repeated keys', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ hasMore: false }))

    await makeService().getTransactionHistory('123', {
      productId: ['p-1', 'p-2'],
      sort: 'DESCENDING',
      revoked: false,
    })

    const [url] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.storekit-sandbox.apple.com/inApps/v2/history/123?productId=p-1&productId=p-2&sort=DESCENDING&revoked=false')
  })

  it('calls the expected endpoint paths', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse({})))
    const service = makeService()

    await service.getTransactionInfo('t-1')
    await service.getAllSubscriptionStatuses('t-1', [1, 4])
    await service.lookUpOrderId('MT12345')
    await service.getRefundHistory('t-1', 'rev-1')
    await service.requestTestNotification()
    await service.getTestNotificationStatus('token-1')

    const urls = fetchMock.mock.calls.map(([url]) => (url as string).replace('https://api.storekit-sandbox.apple.com/', ''))
    expect(urls).toEqual([
      'inApps/v1/transactions/t-1',
      'inApps/v1/subscriptions/t-1?status=1&status=4',
      'inApps/v1/lookup/MT12345',
      'inApps/v2/refund/lookup/t-1?revision=rev-1',
      'inApps/v1/notifications/test',
      'inApps/v1/notifications/test/token-1',
    ])
    expect(fetchMock.mock.calls[4][1].method).toBe('POST')
  })

  it('reuses the cached token across requests', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse({})))
    const service = makeService()

    await service.getTransactionInfo('t-1')
    await service.getTransactionInfo('t-2')

    const tokens = fetchMock.mock.calls.map(([, init]) => init.headers.Authorization)
    expect(tokens[0]).toBe(tokens[1])
  })

  it('throws a generic error on an unexpected response status', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 503, statusText: 'Service Unavailable' }))

    await expect(makeService().getTransactionInfo('t-1')).rejects.toThrow('Unexpected response from App Store: Service Unavailable (503)')
  })

  it('surfaces a malformed private key at call time instead of an unhandled rejection', async () => {
    const service = new Service('not a pkcs8 key', 'key-id', 'issuer-id', 'com.example.app')

    // Give the rejected import promise a macrotask to trigger a potential unhandled rejection.
    await new Promise(resolve => setTimeout(resolve, 0))

    await expect(service.getTransactionInfo('t-1')).rejects.toThrow()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('throws InvalidAuthorizationError on 401', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 401 }))

    await expect(makeService().getTransactionInfo('t-1')).rejects.toThrow(InvalidAuthorizationError)
  })

  it('throws ServerAPIError with the Apple error code on 404', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ errorCode: 4040010, errorMessage: 'Transaction id not found.' }, 404))

    const error = await makeService().getTransactionInfo('t-1').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ServerAPIError)
    expect((error as ServerAPIError).errorCode).toBe(4040010)
  })

  it('throws a generic error instead of a parse failure when the error body is not JSON', async () => {
    fetchMock.mockResolvedValue(new Response('<html>Service Unavailable</html>', { status: 500, statusText: 'Internal Server Error' }))

    await expect(makeService().getTransactionInfo('t-1')).rejects.toThrow('Unexpected response from App Store: Internal Server Error (500)')
  })

  it('maps Apple error bodies on unlisted statuses to ServerAPIError', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ errorCode: 4030000, errorMessage: 'Forbidden.' }, 403))

    const error = await makeService().getTransactionInfo('t-1').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ServerAPIError)
    expect((error as ServerAPIError).errorCode).toBe(4030000)
  })

  it('exposes rate limit information on 429', async () => {
    fetchMock.mockResolvedValue(jsonResponse(
      { errorCode: 4290000, errorMessage: 'Rate limit exceeded.' },
      429,
      { 'Retry-After': '60' },
    ))

    const error = await makeService().getTransactionInfo('t-1').catch((e: unknown) => e)

    expect(error).toBeInstanceOf(ServerAPIError)
    expect((error as ServerAPIError).isRateLimitExceeded).toBe(true)
    expect((error as ServerAPIError).retryAfter).toBe(60)
  })
})
