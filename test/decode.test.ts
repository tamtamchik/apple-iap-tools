import { beforeAll, describe, expect, it } from 'vitest'

import {
  decode,
  isAppDataNotification,
  isDataNotification,
  isExternalPurchaseTokenNotification,
  isSummaryNotification,
} from '../src/appstoreservernotifications/v2/decode'

import { createTestCertChain, TestCertChain } from './certChain'

const base = {
  version: '2.0',
  signedDate: 1700000000000,
  notificationUUID: '00000000-0000-0000-0000-000000000000',
}

describe('decode', () => {
  let chain: TestCertChain

  beforeAll(async () => {
    chain = await createTestCertChain()
  })

  it('decodes a data notification with transaction and renewal info', async () => {
    const signedTransactionInfo = await chain.sign({ transactionId: 't-1', productId: 'p-1' })
    const signedRenewalInfo = await chain.sign({ autoRenewStatus: 1 })
    const signedPayload = await chain.sign({
      ...base,
      notificationType: 'DID_RENEW',
      data: {
        bundleId: 'com.example.app',
        bundleVersion: '1',
        environment: 'Sandbox',
        signedTransactionInfo,
        signedRenewalInfo,
      },
    })

    const result = await decode({ signedPayload }, chain.rootFingerprint)

    expect(isDataNotification(result)).toBe(true)
    expect(isSummaryNotification(result)).toBe(false)
    if (isDataNotification(result)) {
      expect(result.body.notificationType).toBe('DID_RENEW')
      expect(result.transactionPayload.transactionId).toBe('t-1')
      expect(result.pendingRenewalInfoPayload?.autoRenewStatus).toBe(1)
    }
  })

  it('decodes a summary notification', async () => {
    const signedPayload = await chain.sign({
      ...base,
      notificationType: 'RENEWAL_EXTENSION',
      subtype: 'SUMMARY',
      summary: {
        requestIdentifier: 'req-1',
        environment: 'Sandbox',
        bundleId: 'com.example.app',
        productId: 'p-1',
        failedCount: 0,
        succeededCount: 10,
      },
    })

    const result = await decode({ signedPayload }, chain.rootFingerprint)

    expect(isSummaryNotification(result)).toBe(true)
    expect(isDataNotification(result)).toBe(false)
    if (isSummaryNotification(result)) {
      expect(result.body.summary.succeededCount).toBe(10)
    }
  })

  it('decodes an external purchase token notification', async () => {
    const signedPayload = await chain.sign({
      ...base,
      notificationType: 'EXTERNAL_PURCHASE_TOKEN',
      subtype: 'UNREPORTED',
      externalPurchaseToken: {
        externalPurchaseId: 'ext-1',
        tokenCreationDate: 1700000000000,
        appAppleId: 1,
        bundleId: 'com.example.app',
      },
    })

    const result = await decode({ signedPayload }, chain.rootFingerprint)

    expect(isExternalPurchaseTokenNotification(result)).toBe(true)
    if (isExternalPurchaseTokenNotification(result)) {
      expect(result.body.externalPurchaseToken.externalPurchaseId).toBe('ext-1')
    }
  })

  it('decodes an appData notification and verifies the signed app transaction', async () => {
    const signedAppTransactionInfo = await chain.sign({ appTransactionId: 'app-t-1' })
    const signedPayload = await chain.sign({
      ...base,
      notificationType: 'RESCIND_CONSENT',
      appData: {
        bundleId: 'com.example.app',
        environment: 'Sandbox',
        signedAppTransactionInfo,
      },
    })

    const result = await decode({ signedPayload }, chain.rootFingerprint)

    expect(isAppDataNotification(result)).toBe(true)
    if (isAppDataNotification(result)) {
      expect(result.appTransactionPayload).toEqual({ appTransactionId: 'app-t-1' })
    }
  })

  it('rejects a notification signed by an untrusted chain', async () => {
    const otherChain = await createTestCertChain()
    const signedPayload = await otherChain.sign({ ...base, notificationType: 'TEST' })

    await expect(decode({ signedPayload }, chain.rootFingerprint)).rejects.toThrow()
  })
})
