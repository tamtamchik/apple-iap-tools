import { X509Certificate } from 'node:crypto'

import * as jose from 'jose'

import { APPLE_ROOT_CA } from './applerootca'
import { CertificateVerificationError } from './errors'

/**
 * Confirms the authenticity of a certificate chain found in the x5c field of a JWS decoded header.
 * Each certificate should be valid and endorsed by the specified root CA.
 */
function verifyCertificates (certs: string[], rootCA: string) {
  if (certs.length === 0) {
    throw new CertificateVerificationError(certs, 'No certificates provided')
  }

  const now = new Date()
  const x509certs = certs.map(c => new X509Certificate(c))
  if (!x509certs.every(cert => new Date(cert.validFrom) < now && now < new Date(cert.validTo))) {
    throw new CertificateVerificationError(certs, 'Certificate dates are invalid')
  }

  for (let i = 0; i < x509certs.length - 1; i++) {
    const current = x509certs[i]
    const next = x509certs[i + 1]

    const isIssuedCorrectly = current.checkIssued(next)
    const isVerified = current.verify(next.publicKey)

    if (!isIssuedCorrectly || !isVerified) {
      throw new CertificateVerificationError(certs)
    }
  }

  // Ensure that the last certificate in the chain is the expected root CA.
  const lastCert = x509certs[x509certs.length - 1]
  if (lastCert.fingerprint256 !== rootCA) {
    throw new CertificateVerificationError(certs)
  }
}

/**
 * Verifies the signature of a signed payload and returns the decoded payload.
 *
 * @param signedPayload The JWS string to verify.
 * @param rootCA SHA-256 fingerprint of the expected root CA certificate. Defaults to the Apple Root CA - G3.
 *
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function verifySignedPayload<T> (signedPayload: string, rootCA: string = APPLE_ROOT_CA): Promise<T> {
  const { payload } = await jose.compactVerify(signedPayload, (protectedHeader) => {
    const certs = protectedHeader.x5c?.map(c => `-----BEGIN CERTIFICATE-----\n${c}\n-----END CERTIFICATE-----`) ?? []

    verifyCertificates(certs, rootCA)

    return jose.importX509(certs[0], protectedHeader.alg)
  })

  const decodedPayload = new TextDecoder().decode(payload)

  return JSON.parse(decodedPayload) as T
}
