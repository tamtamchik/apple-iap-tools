import { verifySignedPayload } from '../../jws'

import {
  jwsRenewalInfoDecodedPayload,
  jwsTransactionDecodedPayload,
  responseBodyV2,
  responseBodyV2Decoded,
  responseBodyV2DecodedPayload,
} from './body'

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
