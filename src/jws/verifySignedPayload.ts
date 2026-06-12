import 'reflect-metadata'

import { X509Certificate } from 'node:crypto'

import { X509Certificate as ParsedCertificate } from '@peculiar/x509'
import * as jose from 'jose'

import { APPLE_ROOT_CA } from './applerootca'
import { CertificateVerificationError } from './errors'

// Object identifiers Apple places on its App Store signing certificates.
// https://www.apple.com/certificateauthority/pdf/Apple_WWDR_CPS_v1.30.pdf
const APPLE_LEAF_OID = '1.2.840.113635.100.6.11.1'
const APPLE_INTERMEDIATE_OID = '1.2.840.113635.100.6.2.1'

function hasExtension (pem: string, oid: string): boolean {
  return new ParsedCertificate(pem).getExtension(oid) !== null
}

/**
 * Confirms the authenticity of a certificate chain found in the x5c field of a JWS decoded header.
 *
 * Mirrors the checks Apple's own server library performs: the chain must be exactly
 * [leaf, intermediate, root], the leaf must carry the App Store marker extension, the
 * intermediate must be a CA carrying the Apple CA marker extension, every certificate
 * must be within its validity window and signed by the next one, and the root must
 * match the pinned fingerprint.
 */
function verifyCertificates (certs: string[], rootCA: string) {
  if (certs.length === 0) {
    throw new CertificateVerificationError(certs, 'No certificates provided')
  }

  if (certs.length !== 3) {
    throw new CertificateVerificationError(certs, 'Expected a certificate chain of exactly three certificates')
  }

  const now = new Date()
  const x509certs = certs.map(c => new X509Certificate(c))
  // validFromDate/validToDate come from the binary certificate fields; RFC 5280 validity bounds are inclusive.
  if (!x509certs.every(cert => cert.validFromDate <= now && now <= cert.validToDate)) {
    throw new CertificateVerificationError(certs, 'Certificate dates are invalid')
  }

  if (!hasExtension(certs[0], APPLE_LEAF_OID)) {
    throw new CertificateVerificationError(certs, 'Leaf certificate is missing the App Store signing marker extension')
  }

  if (!hasExtension(certs[1], APPLE_INTERMEDIATE_OID)) {
    throw new CertificateVerificationError(certs, 'Intermediate certificate is missing the Apple CA marker extension')
  }

  if (!x509certs[1].ca) {
    throw new CertificateVerificationError(certs, 'Intermediate certificate is not a certificate authority')
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
