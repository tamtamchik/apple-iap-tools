import {
  VerifyReceiptResponseBody,
  VerifyReceiptResponseError,
  VerifyReceiptResponseSuccess,
  VerifyReceiptSuccessStatus
} from './VerifyReceiptResponseBody.js'

import { LatestReceiptInfo } from './LatestReceiptInfo.js'
import { UnifiedReceipt } from './UnifiedReceipt.js'
import { PendingRenewalInfo } from './PendingRenewalInfo.js'

/**
 * Guard for verifyReceipt success results.
 */
export function isSuccess (result: VerifyReceiptResponseBody): result is VerifyReceiptResponseSuccess {
  return result.status === VerifyReceiptSuccessStatus.VALID || result.status === VerifyReceiptSuccessStatus.SUBSCRIPTION_EXPIRED
}

/**
 * Guard for verifyReceipt error results.
 */
export function isError (result: VerifyReceiptResponseBody): result is VerifyReceiptResponseError {
  return result.status !== VerifyReceiptSuccessStatus.VALID && result.status !== VerifyReceiptSuccessStatus.SUBSCRIPTION_EXPIRED
}

/**
 * Returns latest_receipt_info from {@link UnifiedReceipt} or {@link VerifyReceiptResponseSuccess} objects.
 */
export function getLatestReceiptInfo (result: UnifiedReceipt | VerifyReceiptResponseSuccess): LatestReceiptInfo | null {
  if (!result.latest_receipt_info) return null

  if (Array.isArray(result.latest_receipt_info)) {
    const receipts = result.latest_receipt_info.sort((a, b) => +b.purchase_date_ms - +a.purchase_date_ms)
    return receipts[0]
  }

  return result.latest_receipt_info
}

/**
 * Returns latest_receipt_info from {@link UnifiedReceipt} or {@link VerifyReceiptResponseSuccess} objects.
 */
export function getPendingRenewalInfo (result: UnifiedReceipt | VerifyReceiptResponseSuccess): PendingRenewalInfo | null {
  if (!result.pending_renewal_info) return null

  const latestReceipt = getLatestReceiptInfo(result)
  if (!latestReceipt) return null

  if (Array.isArray(result.pending_renewal_info)) {
    const pendingRenewals = result.pending_renewal_info
      .filter(pr => pr.original_transaction_id === latestReceipt.original_transaction_id)

    return pendingRenewals.length ? pendingRenewals[0] : null
  }

  return result.pending_renewal_info
}
