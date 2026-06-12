import { describe, expect, it } from 'vitest'

import {
  getLatestReceiptInfo,
  getPendingRenewalInfo,
  isError,
  isSuccess,
} from '../src/deprecated/notifications/v1/helpers'
import { LatestReceiptInfo } from '../src/deprecated/notifications/v1/types/latestReceiptInfo'
import { UnifiedReceipt } from '../src/deprecated/notifications/v1/types/unifiedReceipt'

import { VerifyReceiptResponseBody } from '../src/deprecated/verify/responsebody'

const receipt = (id: string, purchaseDateMs: string): LatestReceiptInfo => ({
  original_transaction_id: id,
  purchase_date_ms: purchaseDateMs,
} as LatestReceiptInfo)

describe('v1 helpers', () => {
  it('isSuccess and isError discriminate by status', () => {
    expect(isSuccess({ status: 0 } as VerifyReceiptResponseBody)).toBe(true)
    expect(isSuccess({ status: 21006 } as VerifyReceiptResponseBody)).toBe(true)
    expect(isSuccess({ status: 21002 } as VerifyReceiptResponseBody)).toBe(false)

    expect(isError({ status: 21002 } as VerifyReceiptResponseBody)).toBe(true)
    expect(isError({ status: 0 } as VerifyReceiptResponseBody)).toBe(false)
  })

  it('getLatestReceiptInfo returns the most recent receipt from an array', () => {
    const result = getLatestReceiptInfo({
      latest_receipt_info: [receipt('a', '100'), receipt('b', '300'), receipt('c', '200')],
    } as UnifiedReceipt)

    expect(result?.original_transaction_id).toBe('b')
  })

  it('getLatestReceiptInfo returns null when there is no receipt info', () => {
    expect(getLatestReceiptInfo({} as UnifiedReceipt)).toBeNull()
  })

  it('getPendingRenewalInfo matches the renewal info of the latest receipt', () => {
    const result = getPendingRenewalInfo({
      latest_receipt_info: [receipt('a', '100'), receipt('b', '300')],
      pending_renewal_info: [
        { original_transaction_id: 'a' },
        { original_transaction_id: 'b' },
      ],
    } as UnifiedReceipt)

    expect(result?.original_transaction_id).toBe('b')
  })

  it('getLatestReceiptInfo returns a single non-array receipt as-is', () => {
    const single = receipt('a', '100')

    expect(getLatestReceiptInfo({ latest_receipt_info: single } as UnifiedReceipt)).toBe(single)
  })

  it('getPendingRenewalInfo returns single non-array renewal info as-is', () => {
    const renewal = { original_transaction_id: 'a' }
    const result = getPendingRenewalInfo({
      latest_receipt_info: [receipt('a', '100')],
      pending_renewal_info: renewal,
    } as UnifiedReceipt)

    expect(result).toBe(renewal)
  })

  it('getPendingRenewalInfo returns null when nothing matches', () => {
    const result = getPendingRenewalInfo({
      latest_receipt_info: [receipt('a', '100')],
      pending_renewal_info: [{ original_transaction_id: 'x' }],
    } as UnifiedReceipt)

    expect(result).toBeNull()
  })
})
