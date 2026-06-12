import * as jose from 'jose'
import { beforeAll, describe, expect, it } from 'vitest'

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

    await expect(verifySignedPayload(`${header}.${forged}.${signature}`, chain.rootFingerprint)).rejects.toThrow()
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

  it('rejects a payload whose leaf certificate is not issued by the presented root', async () => {
    const otherChain = await createTestCertChain()
    const jws = await signWithChain({ hello: 'world' }, [chain.x5c[0], otherChain.x5c[1]], chain.leafKey)

    await expect(verifySignedPayload(jws, otherChain.rootFingerprint)).rejects.toThrow(CertificateVerificationError)
  })
})
