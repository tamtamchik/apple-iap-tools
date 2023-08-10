import {
  AppAndProductInformation,
  BillingStatus,
  PriceIncreaseStatus,
  PromotionalOffers,
  PurchaseDates,
  signedDate,
  SubscriptionRenewalAndExpiration,
  TransactionIdentifiers,
} from '../transactions'

import { environment } from './data'

/**
 * A decoded payload containing subscription renewal information for an auto-renewable subscription.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsrenewalinfodecodedpayload
 * @version 2.0+
 */
export interface jwsRenewalInfoDecodedPayload {
  /**
   * The product identifier of the product that will renew at the next billing period.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/autorenewproductid
   * @version 2.0+
   */
  autoRenewProductId: string

  autoRenewStatus: SubscriptionRenewalAndExpiration.autoRenewStatus

  environment: environment

  expirationIntent: SubscriptionRenewalAndExpiration.expirationIntent

  gracePeriodExpiresDate: BillingStatus.gracePeriodExpiresDate

  isInBillingRetryPeriod: BillingStatus.isInBillingRetryPeriod

  offerIdentifier: PromotionalOffers.offerIdentifier

  offerType: PromotionalOffers.offerType

  originalTransactionId: TransactionIdentifiers.originalTransactionId

  priceIncreaseStatus: PriceIncreaseStatus.priceIncreaseStatus

  productId: AppAndProductInformation.productId

  recentSubscriptionStartDate: PurchaseDates.recentSubscriptionStartDate

  renewalDate: SubscriptionRenewalAndExpiration.renewalDate

  signedDate: signedDate
}
