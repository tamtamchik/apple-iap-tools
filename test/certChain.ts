import 'reflect-metadata'

import { X509Certificate } from 'node:crypto'
import { webcrypto } from 'node:crypto'

import * as x509 from '@peculiar/x509'
import * as jose from 'jose'

x509.cryptoProvider.set(webcrypto as Crypto)

const ALG = { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' }

// Apple marker extensions verifySignedPayload requires on the chain.
const APPLE_LEAF_OID = '1.2.840.113635.100.6.11.1'
const APPLE_INTERMEDIATE_OID = '1.2.840.113635.100.6.2.1'
const DER_NULL = new Uint8Array([0x05, 0x00])

export interface TestCertChainOptions {
  expired?: boolean
  /** Omit the App Store signing marker extension from the leaf certificate. */
  withoutLeafMarker?: boolean
  /** Omit the Apple CA marker extension from the intermediate certificate. */
  withoutIntermediateMarker?: boolean
  /** Issue the intermediate without the CA basic constraint. */
  intermediateNotCa?: boolean
}

export interface TestCertChain {
  /**
   * SHA-256 fingerprint of the root certificate, in the format verifySignedPayload expects.
   */
  rootFingerprint: string

  /**
   * The [leaf, intermediate, root] certificates as base64 DER, as carried in the JWS x5c header.
   */
  x5c: string[]

  /**
   * The private key of the leaf certificate.
   */
  leafKey: CryptoKey

  /**
   * Signs a payload as a compact JWS with an x5c header of [leaf, intermediate, root].
   */
  sign (payload: object): Promise<string>
}

export async function createTestCertChain (options: TestCertChainOptions = {}): Promise<TestCertChain> {
  const dayMs = 24 * 60 * 60 * 1000
  const notBefore = new Date(Date.now() - (options.expired ? 2 * dayMs : dayMs))
  const notAfter = new Date(Date.now() + (options.expired ? -dayMs : dayMs))

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

  const intermediateKeys = await webcrypto.subtle.generateKey(ALG, true, ['sign', 'verify'])
  const intermediateExtensions = [
    ...(options.intermediateNotCa ? [] : [new x509.BasicConstraintsExtension(true, undefined, true)]),
    ...(options.withoutIntermediateMarker ? [] : [new x509.Extension(APPLE_INTERMEDIATE_OID, false, DER_NULL)]),
  ]
  const intermediateCert = await x509.X509CertificateGenerator.create({
    serialNumber: '02',
    subject: 'CN=Test Intermediate CA',
    issuer: rootCert.subject,
    notBefore,
    notAfter,
    signingAlgorithm: ALG,
    publicKey: intermediateKeys.publicKey,
    signingKey: rootKeys.privateKey,
    extensions: intermediateExtensions,
  })

  const leafKeys = await webcrypto.subtle.generateKey(ALG, true, ['sign', 'verify'])
  const leafCert = await x509.X509CertificateGenerator.create({
    serialNumber: '03',
    subject: 'CN=Test Leaf',
    issuer: intermediateCert.subject,
    notBefore,
    notAfter,
    signingAlgorithm: ALG,
    publicKey: leafKeys.publicKey,
    signingKey: intermediateKeys.privateKey,
    extensions: options.withoutLeafMarker ? [] : [new x509.Extension(APPLE_LEAF_OID, false, DER_NULL)],
  })

  const rootFingerprint = new X509Certificate(rootCert.toString('pem')).fingerprint256
  const x5c = [
    Buffer.from(leafCert.rawData).toString('base64'),
    Buffer.from(intermediateCert.rawData).toString('base64'),
    Buffer.from(rootCert.rawData).toString('base64'),
  ]

  return {
    rootFingerprint,
    x5c,
    leafKey: leafKeys.privateKey,
    sign: (payload: object) => signWithChain(payload, x5c, leafKeys.privateKey),
  }
}

/**
 * Signs a payload with an arbitrary x5c header, allowing mismatched chains.
 */
export async function signWithChain (payload: object, x5c: string[], key: CryptoKey): Promise<string> {
  return new jose.CompactSign(new TextEncoder().encode(JSON.stringify(payload)))
    .setProtectedHeader({ alg: 'ES256', x5c })
    .sign(key)
}
