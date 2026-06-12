import { environment } from '../appstoreservernotifications/v2/body/data'
import {
  appAccountToken,
  appTransactionId,
  autoRenewProductId,
  autoRenewStatus,
  billingPlanType,
  currency,
  eligibleWinBackOfferIds,
  expirationIntent,
  gracePeriodExpiresDate,
  isInBillingRetryPeriod,
  offerDiscountType,
  offerIdentifier,
  offerPeriod,
  offerType,
  originalTransactionId,
  priceIncreaseStatus,
  productId,
  recentSubscriptionStartDate,
  renewalCommitmentInfo,
  renewalDate,
  renewalPrice,
  signedDate,
} from '../appstoreservernotifications/v2/transaction'

/**
 * A decoded payload containing subscription renewal information for an auto-renewable subscription.
 *
 * Apple marks every field as optional; which fields are present depends on the
 * state of the subscription.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/jwsrenewalinfodecodedpayload
 * @version 2.0+
 */
export interface jwsRenewalInfoDecodedPayload {

  appAccountToken?: appAccountToken

  appTransactionId?: appTransactionId

  /**
   * Present only for Advanced Commerce API transactions.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/advancedcommercerenewalinfo
   * @version 2.14+
   */
  advancedCommerceInfo?: unknown

  autoRenewProductId?: autoRenewProductId

  autoRenewStatus?: autoRenewStatus

  commitmentInfo?: renewalCommitmentInfo

  currency?: currency

  eligibleWinBackOfferIds?: eligibleWinBackOfferIds

  environment?: environment

  expirationIntent?: expirationIntent

  gracePeriodExpiresDate?: gracePeriodExpiresDate

  isInBillingRetryPeriod?: isInBillingRetryPeriod

  offerDiscountType?: offerDiscountType

  offerIdentifier?: offerIdentifier

  offerPeriod?: offerPeriod

  offerType?: offerType

  originalTransactionId?: originalTransactionId

  priceIncreaseStatus?: priceIncreaseStatus

  productId?: productId

  recentSubscriptionStartDate?: recentSubscriptionStartDate

  renewalBillingPlanType?: billingPlanType

  renewalDate?: renewalDate

  renewalPrice?: renewalPrice

  signedDate?: signedDate
}
