import {
  AccountInfo,
  AppAndProductInformation,
  FamilySharing,
  PromotionalOffers,
  PurchaseDates,
  RevocationDateAndReason,
  signedDate,
  StorefrontInfo,
  SubscriptionRenewalAndExpiration,
  TransactionIdentifiers,
  TransactionReason,
} from '../transactions'

import { environment } from './data'

/**
 * A decoded payload containing transaction information.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/jwstransactiondecodedpayload
 * @version 2.0+
 */
export interface jwsTransactionDecodedPayload {

  appAccountToken: AccountInfo.appAccountToken

  bundleId: AppAndProductInformation.bundleId

  environment: environment

  expiresDate: SubscriptionRenewalAndExpiration.expiresDate

  inAppOwnershipType: FamilySharing.inAppOwnershipType

  isUpgraded: SubscriptionRenewalAndExpiration.isUpgraded

  offerIdentifier: PromotionalOffers.offerIdentifier

  offerType: PromotionalOffers.offerType

  originalPurchaseDate: PurchaseDates.originalPurchaseDate

  originalTransactionId: TransactionIdentifiers.originalTransactionId

  productId: AppAndProductInformation.productId

  purchaseDate: PurchaseDates.purchaseDate

  quantity: AppAndProductInformation.quantity

  revocationDate: RevocationDateAndReason.revocationDate

  revocationReason: RevocationDateAndReason.revocationReason

  signedDate: signedDate

  storefront: StorefrontInfo.storefront

  storefrontId: StorefrontInfo.storefrontId

  subscriptionGroupIdentifier: AppAndProductInformation.subscriptionGroupIdentifier

  transactionId: TransactionIdentifiers.transactionId

  transactionReason: TransactionReason.transactionReason

  type: AppAndProductInformation.productType

  webOrderLineItemId: TransactionIdentifiers.webOrderLineItemId
}
