import { verifySignedPayload } from '../../jws'

import {
  jwsRenewalInfoDecodedPayload,
  jwsTransactionDecodedPayload,
  responseBodyV2,
  responseBodyV2Decoded,
} from './body'
import { responseBodyV2DecodedData, responseBodyV2DecodedSummary } from './body/responseBodyV2Decoded'

const isDataNotificationBody = (body: responseBodyV2Decoded): body is responseBodyV2DecodedData => !!body.data

interface DecodeResultGeneric {
  body: responseBodyV2Decoded
}

interface DecodeResultData extends DecodeResultGeneric {
  body: responseBodyV2DecodedData
  transactionPayload: jwsTransactionDecodedPayload
  pendingRenewalInfoPayload: jwsRenewalInfoDecodedPayload | undefined
}

interface DecodeResultSummary extends DecodeResultGeneric {
  body: responseBodyV2DecodedSummary
  transactionPayload: never
  pendingRenewalInfoPayload: never
}

export type DecodeResult = DecodeResultData | DecodeResultSummary

export const isDataNotification = (result: DecodeResult): result is DecodeResultData => !!result.body.data

export const isSummaryNotification = (result: DecodeResult): result is DecodeResultSummary => !!result.body.summary


/**
 * Decodes a version 2 response body.
 *
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function decode (encodedBody: responseBodyV2): Promise<DecodeResult> {
  const body = await verifySignedPayload<responseBodyV2Decoded>(encodedBody.signedPayload)
  let transactionPayload
  let pendingRenewalInfoPayload

  if (isDataNotificationBody(body)) {
    transactionPayload = await verifySignedPayload<jwsTransactionDecodedPayload>(body.data.signedTransactionInfo)

    if (body.data.signedRenewalInfo) {
      pendingRenewalInfoPayload = await verifySignedPayload<jwsRenewalInfoDecodedPayload>(body.data.signedRenewalInfo)
    }
  }

  return { body, transactionPayload, pendingRenewalInfoPayload } as DecodeResult
}
