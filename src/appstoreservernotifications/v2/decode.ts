import { verifySignedPayload } from '../../jws'

import {
  jwsRenewalInfoDecodedPayload,
  jwsTransactionDecodedPayload,
  responseBodyV2,
  responseBodyV2Decoded,
  responseBodyV2DecodedAppData,
  responseBodyV2DecodedData,
  responseBodyV2DecodedExternalPurchaseToken,
  responseBodyV2DecodedSummary,
} from './body'

const isDataNotificationBody = (body: responseBodyV2Decoded): body is responseBodyV2DecodedData => !!body.data

const isAppDataNotificationBody = (body: responseBodyV2Decoded): body is responseBodyV2DecodedAppData => !!body.appData

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

interface DecodeResultExternalPurchaseToken extends DecodeResultGeneric {
  body: responseBodyV2DecodedExternalPurchaseToken
  transactionPayload: never
  pendingRenewalInfoPayload: never
}

interface DecodeResultAppData extends DecodeResultGeneric {
  body: responseBodyV2DecodedAppData
  transactionPayload: never
  pendingRenewalInfoPayload: never

  /**
   * The decoded app transaction information, when the notification carries signedAppTransactionInfo.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsapptransaction
   */
  appTransactionPayload: unknown
}

export type DecodeResult =
  | DecodeResultData
  | DecodeResultSummary
  | DecodeResultExternalPurchaseToken
  | DecodeResultAppData

export const isDataNotification = (result: DecodeResult): result is DecodeResultData => !!result.body.data

export const isSummaryNotification = (result: DecodeResult): result is DecodeResultSummary => !!result.body.summary

export const isExternalPurchaseTokenNotification = (result: DecodeResult): result is DecodeResultExternalPurchaseToken => !!result.body.externalPurchaseToken

export const isAppDataNotification = (result: DecodeResult): result is DecodeResultAppData => !!result.body.appData

/**
 * Decodes a version 2 response body.
 *
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function decode (encodedBody: responseBodyV2): Promise<DecodeResult> {
  const body = await verifySignedPayload<responseBodyV2Decoded>(encodedBody.signedPayload)
  let transactionPayload
  let pendingRenewalInfoPayload
  let appTransactionPayload

  if (isDataNotificationBody(body)) {
    transactionPayload = await verifySignedPayload<jwsTransactionDecodedPayload>(body.data.signedTransactionInfo)

    if (body.data.signedRenewalInfo) {
      pendingRenewalInfoPayload = await verifySignedPayload<jwsRenewalInfoDecodedPayload>(body.data.signedRenewalInfo)
    }
  }

  if (isAppDataNotificationBody(body) && body.appData.signedAppTransactionInfo) {
    appTransactionPayload = await verifySignedPayload<unknown>(body.appData.signedAppTransactionInfo)
  }

  return { body, transactionPayload, pendingRenewalInfoPayload, appTransactionPayload } as DecodeResult
}
