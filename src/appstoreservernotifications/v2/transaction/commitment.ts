import { price, renewalPrice } from './priceAndCurrency'
import { autoRenewProductId, autoRenewStatus } from './subscriptionRenewalAndExpiration'

/**
 * The billing plan type for a subscription with a commitment, such as a monthly
 * subscription with a 12-month commitment.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/billingplantype
 * @version 2.21+
 */
export enum billingPlanType {
  /**
   * The customer pays for the full commitment up front.
   */
  BILLED_UPFRONT = 'BILLED_UPFRONT',

  /**
   * The customer pays for the commitment in monthly billing periods.
   */
  MONTHLY = 'MONTHLY',
}

/**
 * Commitment information for a transaction of a subscription with a commitment.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/transactioncommitmentinfo
 * @version 2.21+
 */
export interface transactionCommitmentInfo {
  /**
   * The number of the current billing period within the commitment, from 1 to {@link totalBillingPeriods}.
   */
  billingPeriodNumber?: number

  /**
   * The UNIX time, in milliseconds, when the commitment expires.
   */
  commitmentExpiresDate?: number

  /**
   * The price, in milliunits, of the commitment.
   */
  commitmentPrice?: price

  /**
   * The total number of billing periods in the commitment.
   */
  totalBillingPeriods?: number
}

/**
 * Commitment information for the renewal of a subscription with a commitment.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/renewalcommitmentinfo
 * @version 2.21+
 */
export interface renewalCommitmentInfo {
  /**
   * The product identifier of the subscription that renews with a commitment at the next billing period.
   */
  commitmentAutoRenewProductId?: autoRenewProductId

  /**
   * The renewal status of the commitment: 0 is off, 1 is on.
   */
  commitmentAutoRenewStatus?: autoRenewStatus

  /**
   * The billing plan type of the commitment renewal.
   */
  commitmentRenewalBillingPlanType?: billingPlanType

  /**
   * The UNIX time, in milliseconds, when the commitment renews.
   */
  commitmentRenewalDate?: number

  /**
   * The renewal price, in milliunits, of the commitment.
   */
  commitmentRenewalPrice?: renewalPrice
}
