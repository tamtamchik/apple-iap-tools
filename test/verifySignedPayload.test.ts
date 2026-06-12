import * as jose from 'jose'
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'

import { CertificateVerificationError } from '../src/jws/errors'
import { verifySignedPayload } from '../src/jws/verifySignedPayload'

import { createTestCertChain, signWithChain, TestCertChain } from './certChain'

describe('verifySignedPayload', () => {
  let chain: TestCertChain

  beforeAll(async () => {
    chain = await createTestCertChain()
  })

  it('verifies a payload signed by a certificate chain ending in the expected root', async () => {
    const jws = await chain.sign({ hello: 'world' })

    const payload = await verifySignedPayload<{ hello: string }>(jws, chain.rootFingerprint)

    expect(payload).toEqual({ hello: 'world' })
  })

  it('accepts a root fingerprint in lowercase without colon separators', async () => {
    const jws = await chain.sign({ hello: 'world' })
    const lowercase = chain.rootFingerprint.replaceAll(':', '').toLowerCase()

    const payload = await verifySignedPayload<{ hello: string }>(jws, lowercase)

    expect(payload).toEqual({ hello: 'world' })
  })

  it('accepts a root fingerprint with an OpenSSL-style label prefix', async () => {
    const jws = await chain.sign({ hello: 'world' })
    const labeled = `SHA256 Fingerprint=${chain.rootFingerprint.toLowerCase()}`

    const payload = await verifySignedPayload<{ hello: string }>(jws, labeled)

    expect(payload).toEqual({ hello: 'world' })
  })

  it('rejects a payload when the root fingerprint does not match', async () => {
    const jws = await chain.sign({ hello: 'world' })
    const wrongRoot = 'AA:'.repeat(31) + 'AA'

    await expect(verifySignedPayload(jws, wrongRoot)).rejects.toThrow(CertificateVerificationError)
  })

  it('rejects a payload without an x5c certificate chain', async () => {
    const key = await jose.generateKeyPair('ES256')
    const jws = await new jose.CompactSign(new TextEncoder().encode('{}'))
      .setProtectedHeader({ alg: 'ES256' })
      .sign(key.privateKey)

    await expect(verifySignedPayload(jws, chain.rootFingerprint)).rejects.toThrow('No certificates provided')
  })

  it('rejects a tampered payload', async () => {
    const jws = await chain.sign({ amount: 1 })

    const [header, , signature] = jws.split('.')
    const forged = Buffer.from(JSON.stringify({ amount: 1000000 })).toString('base64url')

    await expect(verifySignedPayload(`${header}.${forged}.${signature}`, chain.rootFingerprint)).rejects.toThrow(CertificateVerificationError)
  })

  it('rejects a payload signed by a key outside the certificate chain', async () => {
    const otherChain = await createTestCertChain()
    const jws = await otherChain.sign({ hello: 'world' })

    await expect(verifySignedPayload(jws, chain.rootFingerprint)).rejects.toThrow(CertificateVerificationError)
  })

  it('rejects a payload with an expired certificate chain', async () => {
    const expiredChain = await createTestCertChain({ expired: true })
    const jws = await expiredChain.sign({ hello: 'world' })

    await expect(verifySignedPayload(jws, expiredChain.rootFingerprint)).rejects.toThrow('Certificate dates are invalid')
  })

  describe('validity window boundaries (RFC 5280: inclusive)', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('accepts a certificate at the exact notAfter instant and rejects one second later', async () => {
      const jws = await chain.sign({ hello: 'world' })
      const { validToDate } = new (await import('node:crypto')).X509Certificate(Buffer.from(chain.x5c[0], 'base64'))

      vi.useFakeTimers()

      vi.setSystemTime(validToDate)
      await expect(verifySignedPayload(jws, chain.rootFingerprint)).resolves.toEqual({ hello: 'world' })

      vi.setSystemTime(new Date(validToDate.getTime() + 1000))
      await expect(verifySignedPayload(jws, chain.rootFingerprint)).rejects.toThrow('Certificate dates are invalid')
    })
  })

  it('rejects a payload whose chain does not lead to the presented root', async () => {
    const otherChain = await createTestCertChain()
    const jws = await signWithChain({ hello: 'world' }, [chain.x5c[0], chain.x5c[1], otherChain.x5c[2]], chain.leafKey)

    await expect(verifySignedPayload(jws, otherChain.rootFingerprint)).rejects.toThrow(CertificateVerificationError)
  })

  it('rejects a chain that is not exactly three certificates long', async () => {
    const jws = await signWithChain({ hello: 'world' }, [chain.x5c[0], chain.x5c[2]], chain.leafKey)

    await expect(verifySignedPayload(jws, chain.rootFingerprint)).rejects.toThrow('exactly three certificates')
  })

  it('rejects a leaf certificate without the App Store signing marker extension', async () => {
    const noMarker = await createTestCertChain({ withoutLeafMarker: true })
    const jws = await noMarker.sign({ hello: 'world' })

    await expect(verifySignedPayload(jws, noMarker.rootFingerprint)).rejects.toThrow('App Store signing marker')
  })

  it('rejects an intermediate certificate without the Apple CA marker extension', async () => {
    const noMarker = await createTestCertChain({ withoutIntermediateMarker: true })
    const jws = await noMarker.sign({ hello: 'world' })

    await expect(verifySignedPayload(jws, noMarker.rootFingerprint)).rejects.toThrow('Apple CA marker')
  })

  it('rejects an intermediate certificate that is not a certificate authority', async () => {
    const notCa = await createTestCertChain({ intermediateNotCa: true })
    const jws = await notCa.sign({ hello: 'world' })

    await expect(verifySignedPayload(jws, notCa.rootFingerprint)).rejects.toThrow(CertificateVerificationError)
  })
})
