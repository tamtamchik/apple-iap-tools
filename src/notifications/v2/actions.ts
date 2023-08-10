import { X509Certificate } from 'node:crypto'

import * as jose from 'jose'

import { APPLE_ROOT_CA } from '../../constants'

import {
  jwsRenewalInfoDecodedPayload,
  jwsTransactionDecodedPayload,
  responseBodyV2,
  responseBodyV2Decoded,
  responseBodyV2DecodedPayload,
} from './body'
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

  // Ensure that each certificate in the chain is issued by the next certificate in the chain.
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
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function verifySignedPayload<T> (signedPayload: string): Promise<T> {
  const { payload } = await jose.compactVerify(signedPayload, (protectedHeader) => {
    const certs = protectedHeader.x5c?.map(c => `-----BEGIN CERTIFICATE-----\n${c}\n-----END CERTIFICATE-----`) ?? []

    verifyCertificates(certs, APPLE_ROOT_CA)

    return jose.importX509(certs[0], protectedHeader.alg)
  })

  const decodedPayload = new TextDecoder().decode(payload)

  return JSON.parse(decodedPayload) as T
}

/**
 * Decodes a version 2 response body.
 *
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function decode (body: responseBodyV2): Promise<responseBodyV2Decoded> {
  const decodedPayload = await verifySignedPayload<responseBodyV2DecodedPayload>(body.signedPayload)
  const result = { ...decodedPayload } as responseBodyV2Decoded

  if (decodedPayload.data?.signedTransactionInfo) {
    result.data.transactionPayload = await verifySignedPayload<jwsTransactionDecodedPayload>(decodedPayload.data.signedTransactionInfo)
  }

  if (decodedPayload.data?.signedRenewalInfo) {
    result.data.pendingRenewalInfoPayload = await verifySignedPayload<jwsRenewalInfoDecodedPayload>(decodedPayload.data.signedRenewalInfo)
  }

  return result
}
