import { verifySignedPayload } from '../../jws/verifySignedPayload'

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

const isSummaryNotificationBody = (body: responseBodyV2Decoded): body is responseBodyV2DecodedSummary => !!body.summary

const isExternalPurchaseTokenNotificationBody = (body: responseBodyV2Decoded): body is responseBodyV2DecodedExternalPurchaseToken => !!body.externalPurchaseToken

interface DecodeResultGeneric {
  body: responseBodyV2Decoded
}

interface DecodeResultData extends DecodeResultGeneric {
  body: responseBodyV2DecodedData

  /**
   * The decoded transaction information. Absent for data notifications that
   * carry no signedTransactionInfo, such as TEST.
   */
  transactionPayload: jwsTransactionDecodedPayload | undefined

  pendingRenewalInfoPayload: jwsRenewalInfoDecodedPayload | undefined
  appTransactionPayload?: never
}

interface DecodeResultSummary extends DecodeResultGeneric {
  body: responseBodyV2DecodedSummary
  transactionPayload?: never
  pendingRenewalInfoPayload?: never
  appTransactionPayload?: never
}

interface DecodeResultExternalPurchaseToken extends DecodeResultGeneric {
  body: responseBodyV2DecodedExternalPurchaseToken
  transactionPayload?: never
  pendingRenewalInfoPayload?: never
  appTransactionPayload?: never
}

interface DecodeResultAppData extends DecodeResultGeneric {
  body: responseBodyV2DecodedAppData
  transactionPayload?: never
  pendingRenewalInfoPayload?: never

  /**
   * The decoded app transaction information. Absent when the notification
   * doesn't carry signedAppTransactionInfo.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsapptransaction
   */
  appTransactionPayload?: unknown
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
 * @param encodedBody The notification body containing the signed payload.
 * @param rootCA SHA-256 fingerprint of the expected root CA certificate. Defaults to the Apple Root CA - G3.
 *
 * @throws {CertificateVerificationError} If the signature cannot be verified.
 */
export async function decode (encodedBody: responseBodyV2, rootCA?: string): Promise<DecodeResult> {
  const body = await verifySignedPayload<responseBodyV2Decoded>(encodedBody.signedPayload, rootCA)

  if (isDataNotificationBody(body)) {
    let transactionPayload
    if (body.data.signedTransactionInfo) {
      transactionPayload = await verifySignedPayload<jwsTransactionDecodedPayload>(body.data.signedTransactionInfo, rootCA)
    }

    let pendingRenewalInfoPayload
    if (body.data.signedRenewalInfo) {
      pendingRenewalInfoPayload = await verifySignedPayload<jwsRenewalInfoDecodedPayload>(body.data.signedRenewalInfo, rootCA)
    }

    return { body, transactionPayload, pendingRenewalInfoPayload }
  }

  if (isAppDataNotificationBody(body)) {
    if (body.appData.signedAppTransactionInfo) {
      const appTransactionPayload = await verifySignedPayload<unknown>(body.appData.signedAppTransactionInfo, rootCA)
      return { body, appTransactionPayload }
    }

    return { body }
  }

  if (isSummaryNotificationBody(body)) {
    return { body }
  }

  if (isExternalPurchaseTokenNotificationBody(body)) {
    return { body }
  }

  // Exhaustiveness check: adding a new variant to responseBodyV2Decoded must fail
  // compilation here until decode() handles it. At runtime an unrecognized payload
  // (a variant newer than this library) is still returned for the caller to inspect.
  const unhandled: never = body
  return { body: unhandled }
}
