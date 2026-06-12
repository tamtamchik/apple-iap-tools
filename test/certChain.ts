import 'reflect-metadata'

import { X509Certificate } from 'node:crypto'
import { webcrypto } from 'node:crypto'

import * as x509 from '@peculiar/x509'
import * as jose from 'jose'

x509.cryptoProvider.set(webcrypto as Crypto)

const ALG = { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' }

export interface TestCertChain {
  /**
   * SHA-256 fingerprint of the root certificate, in the format verifySignedPayload expects.
   */
  rootFingerprint: string

  /**
   * Signs a payload as a compact JWS with an x5c header of [leaf, root].
   */
  sign (payload: object): Promise<string>
}

export async function createTestCertChain (): Promise<TestCertChain> {
  const notBefore = new Date(Date.now() - 24 * 60 * 60 * 1000)
  const notAfter = new Date(Date.now() + 24 * 60 * 60 * 1000)

  const rootKeys = await webcrypto.subtle.generateKey(ALG, true, ['sign', 'verify'])
  const rootCert = await x509.X509CertificateGenerator.createSelfSigned({
    serialNumber: '01',
    name: 'CN=Test Root CA',
    notBefore,
    notAfter,
    signingAlgorithm: ALG,
    keys: rootKeys,
    extensions: [new x509.BasicConstraintsExtension(true, undefined, true)],
  })

  const leafKeys = await webcrypto.subtle.generateKey(ALG, true, ['sign', 'verify'])
  const leafCert = await x509.X509CertificateGenerator.create({
    serialNumber: '02',
    subject: 'CN=Test Leaf',
    issuer: rootCert.subject,
    notBefore,
    notAfter,
    signingAlgorithm: ALG,
    publicKey: leafKeys.publicKey,
    signingKey: rootKeys.privateKey,
  })

  const rootFingerprint = new X509Certificate(rootCert.toString('pem')).fingerprint256
  const x5c = [
    Buffer.from(leafCert.rawData).toString('base64'),
    Buffer.from(rootCert.rawData).toString('base64'),
  ]

  return {
    rootFingerprint,
    async sign (payload: object): Promise<string> {
      return new jose.CompactSign(new TextEncoder().encode(JSON.stringify(payload)))
        .setProtectedHeader({ alg: 'ES256', x5c })
        .sign(leafKeys.privateKey)
    },
  }
}
