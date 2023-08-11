import { environment } from '../appstoreservernotifications/v2/body/data'
import {
  autoRenewStatus,
  expirationIntent,
  gracePeriodExpiresDate,
  isInBillingRetryPeriod,
  offerIdentifier,
  offerType,
  originalTransactionId,
  priceIncreaseStatus,
  productId,
  recentSubscriptionStartDate,
  renewalDate,
  signedDate,
} from '../appstoreservernotifications/v2/transaction'

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

  autoRenewStatus: autoRenewStatus

  environment: environment

  expirationIntent: expirationIntent

  gracePeriodExpiresDate: gracePeriodExpiresDate

  isInBillingRetryPeriod: isInBillingRetryPeriod

  offerIdentifier: offerIdentifier

  offerType: offerType

  originalTransactionId: originalTransactionId

  priceIncreaseStatus: priceIncreaseStatus

  productId: productId

  recentSubscriptionStartDate: recentSubscriptionStartDate

  renewalDate: renewalDate

  signedDate: signedDate
}
