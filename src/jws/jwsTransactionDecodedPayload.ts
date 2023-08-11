import { environment } from '../appstoreservernotifications/v2/body'
import {
  appAccountToken,
  bundleId,
  expiresDate,
  inAppOwnershipType,
  isUpgraded,
  offerIdentifier,
  offerType,
  originalPurchaseDate,
  originalTransactionId,
  productId,
  productType,
  purchaseDate,
  quantity,
  revocationDate,
  revocationReason,
  signedDate,
  storefront,
  storefrontId,
  subscriptionGroupIdentifier,
  transactionId,
  transactionReason,
  webOrderLineItemId,
} from '../appstoreservernotifications/v2/transaction'

/**
 * A decoded payload containing transaction information.
 *
 * @link https://developer.apple.com/documentation/appstoreservernotifications/jwstransactiondecodedpayload
 * @version 2.0+
 */
export interface jwsTransactionDecodedPayload {

  appAccountToken: appAccountToken

  bundleId: bundleId

  environment: environment

  expiresDate: expiresDate

  inAppOwnershipType: inAppOwnershipType

  isUpgraded: isUpgraded

  offerIdentifier: offerIdentifier

  offerType: offerType

  originalPurchaseDate: originalPurchaseDate

  originalTransactionId: originalTransactionId

  productId: productId

  purchaseDate: purchaseDate

  quantity: quantity

  revocationDate: revocationDate

  revocationReason: revocationReason

  signedDate: signedDate

  storefront: storefront

  storefrontId: storefrontId

  subscriptionGroupIdentifier: subscriptionGroupIdentifier

  transactionId: transactionId

  transactionReason: transactionReason

  type: productType

  webOrderLineItemId: webOrderLineItemId
}
