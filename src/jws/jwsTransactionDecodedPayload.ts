import { environment } from '../appstoreservernotifications/v2/body'
import {
  appAccountToken,
  appTransactionId,
  billingPlanType,
  bundleId,
  currency,
  expiresDate,
  inAppOwnershipType,
  isUpgraded,
  offerDiscountType,
  offerIdentifier,
  offerPeriod,
  offerType,
  originalPurchaseDate,
  originalTransactionId,
  price,
  productId,
  productType,
  purchaseDate,
  quantity,
  revocationDate,
  revocationPercentage,
  revocationReason,
  revocationType,
  signedDate,
  storefront,
  storefrontId,
  subscriptionGroupIdentifier,
  transactionCommitmentInfo,
  transactionId,
  transactionReason,
  webOrderLineItemId,
} from '../appstoreservernotifications/v2/transaction'

/**
 * A decoded payload containing transaction information.
 *
 * Apple marks every field as optional; which fields are present depends on the
 * in-app purchase type and the state of the transaction.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/jwstransactiondecodedpayload
 * @version 2.0+
 */
export interface jwsTransactionDecodedPayload {

  appAccountToken?: appAccountToken

  appTransactionId?: appTransactionId

  /**
   * Present only for Advanced Commerce API transactions.
   *
   * @link https://developer.apple.com/documentation/appstoreservernotifications/advancedcommercetransactioninfo
   * @version 2.14+
   */
  advancedCommerceInfo?: unknown

  billingPlanType?: billingPlanType

  bundleId?: bundleId

  commitmentInfo?: transactionCommitmentInfo

  currency?: currency

  environment?: environment

  expiresDate?: expiresDate

  inAppOwnershipType?: inAppOwnershipType

  isUpgraded?: isUpgraded

  offerDiscountType?: offerDiscountType

  offerIdentifier?: offerIdentifier

  offerPeriod?: offerPeriod

  offerType?: offerType

  originalPurchaseDate?: originalPurchaseDate

  originalTransactionId?: originalTransactionId

  price?: price

  productId?: productId

  purchaseDate?: purchaseDate

  quantity?: quantity

  revocationDate?: revocationDate

  revocationPercentage?: revocationPercentage

  revocationReason?: revocationReason

  revocationType?: revocationType

  signedDate?: signedDate

  storefront?: storefront

  storefrontId?: storefrontId

  subscriptionGroupIdentifier?: subscriptionGroupIdentifier

  transactionId?: transactionId

  transactionReason?: transactionReason

  type?: productType

  webOrderLineItemId?: webOrderLineItemId
}
