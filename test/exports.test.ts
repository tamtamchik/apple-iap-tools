import { describe, expect, it } from 'vitest'

import * as pkg from '../src/index'

describe('package exports', () => {
  it('exposes the v2 notifications API', () => {
    expect(pkg.ServerNotificationsV2.decode).toBeTypeOf('function')
    expect(pkg.ServerNotificationsV2.isDataNotification).toBeTypeOf('function')
    expect(pkg.ServerNotificationsV2.isSummaryNotification).toBeTypeOf('function')
    expect(pkg.ServerNotificationsV2.isExternalPurchaseTokenNotification).toBeTypeOf('function')
    expect(pkg.ServerNotificationsV2.isAppDataNotification).toBeTypeOf('function')

    expect(pkg.ServerNotificationsV2.Body.notificationType.ONE_TIME_CHARGE).toBe('ONE_TIME_CHARGE')
    expect(pkg.ServerNotificationsV2.Body.notificationType.RESCIND_CONSENT).toBe('RESCIND_CONSENT')
    expect(pkg.ServerNotificationsV2.Body.subtype.UNREPORTED).toBe('UNREPORTED')
    expect(pkg.ServerNotificationsV2.Body.status.ACTIVE).toBe(1)
    expect(pkg.ServerNotificationsV2.Body.consumptionRequestReason.LEGAL).toBe('LEGAL')
    expect(pkg.ServerNotificationsV2.Body.tokenType.SERVICES).toBe('SERVICES')

    expect(pkg.ServerNotificationsV2.Transaction.offerType.WIN_BACK).toBe(4)
    expect(pkg.ServerNotificationsV2.Transaction.offerDiscountType.ONE_TIME).toBe('ONE_TIME')
    expect(pkg.ServerNotificationsV2.Transaction.revocationType.REFUND_PRORATED).toBe('REFUND_PRORATED')
    expect(pkg.ServerNotificationsV2.Transaction.billingPlanType.MONTHLY).toBe('MONTHLY')
    expect(pkg.ServerNotificationsV2.Transaction.productType.CONSUMABLE).toBe('Consumable')
    expect(pkg.ServerNotificationsV2.Transaction.inAppOwnershipType.PURCHASED).toBe('PURCHASED')
    expect(pkg.ServerNotificationsV2.Transaction.transactionReason.RENEWAL).toBe('RENEWAL')
    expect(pkg.ServerNotificationsV2.Transaction.expirationIntent.BILLING_ERROR).toBe(2)
    expect(pkg.ServerNotificationsV2.Transaction.autoRenewStatus.ON).toBe(1)
    expect(pkg.ServerNotificationsV2.Transaction.priceIncreaseStatus.CUSTOMER_AGREED).toBe(1)
    expect(pkg.ServerNotificationsV2.Transaction.revocationReason.APP_ISSUE).toBe(1)
  })

  it('exposes the Server API client', () => {
    expect(pkg.ServerAPI.Service).toBeTypeOf('function')
    expect(pkg.ServerAPI.ServiceEnvironment.Production).toBe('Production')
    expect(pkg.ServerAPI.Requests.OrderLookupStatus.VALID).toBe(0)
    expect(pkg.ServerAPI.Requests.SendAttemptResult.SUCCESS).toBe('SUCCESS')
  })

  it('exposes the deprecated v1 API', () => {
    expect(pkg.verifyReceipt).toBeTypeOf('function')
    expect(pkg.isSuccess).toBeTypeOf('function')
    expect(pkg.isError).toBeTypeOf('function')
    expect(pkg.getLatestReceiptInfo).toBeTypeOf('function')
    expect(pkg.getPendingRenewalInfo).toBeTypeOf('function')
    expect(pkg.ServerNotificationType.DID_RENEW).toBeDefined()
    expect(pkg.VerifyReceiptSuccessStatus.VALID).toBe(0)
    expect(pkg.ExpirationIntent).toBeDefined()
  })
})
