# Apple IAP Tools

[![Buy Me A Coffee][ico-coffee]][link-coffee]
[![Latest Version on NPM][ico-version]][link-npm]
[![TypeScrypt][ico-types]][link-types]
[![Software License][ico-license]](LICENSE)
[![Total Downloads][ico-downloads]][link-downloads]

Apple in-app purchase tools for Node.js:

* **App Store Server Notifications V2** — typings and a `decode()` function that verifies the JWS signature and certificate chain against the Apple Root CA.
* **App Store Server API** — a typed client with JWT (ES256) authorization.
* **Deprecated V1 / verifyReceipt** — typings and helpers for the legacy APIs are still exported for backward compatibility.

Full [`Typedoc`](https://typedoc.org) documentation is available at https://tamtamchika.net/apple-iap-tools

## Installation

```sh
npm install @tamtamchik/apple-iap-tools
```

Requires Node.js 18 or later.

## App Store Server Notifications V2

Decode and verify a [V2 notification](https://developer.apple.com/documentation/appstoreservernotifications) payload.
`decode()` verifies the signature and the certificate chain of every embedded JWS before returning the data.

```ts
import { ServerNotificationsV2 } from '@tamtamchik/apple-iap-tools'

// `body` is the JSON the App Store posts to your endpoint: { signedPayload: string }
const result = await ServerNotificationsV2.decode(body)

if (ServerNotificationsV2.isDataNotification(result)) {
  console.log(result.body.notificationType, result.body.subtype)
  console.log(result.transactionPayload.transactionId)
  console.log(result.pendingRenewalInfoPayload?.autoRenewStatus)
}

if (ServerNotificationsV2.isSummaryNotification(result)) {
  console.log(result.body.summary.succeededCount)
}

if (ServerNotificationsV2.isExternalPurchaseTokenNotification(result)) {
  console.log(result.body.externalPurchaseToken.externalPurchaseId)
}

if (ServerNotificationsV2.isAppDataNotification(result)) {
  console.log(result.appTransactionPayload)
}
```

## App Store Server API

A typed client for the [App Store Server API](https://developer.apple.com/documentation/appstoreserverapi).
Generate an In-App Purchase key in App Store Connect (Users and Access → Integrations → In-App Purchase) and pass the `.p8` contents to the service.

```ts
import { ServerAPI } from '@tamtamchik/apple-iap-tools'

const service = new ServerAPI.Service(
  privateKey, // contents of the .p8 file
  keyId,      // key ID from App Store Connect
  issuerId,   // issuer ID from App Store Connect
  bundleId,   // your app's bundle ID
  ServerAPI.ServiceEnvironment.Production, // defaults to Sandbox
)

const history = await service.getTransactionHistory(transactionId, { sort: 'DESCENDING' })
const info = await service.getTransactionInfo(transactionId)
const statuses = await service.getAllSubscriptionStatuses(transactionId)
const order = await service.lookUpOrderId(orderId) // production only
const refunds = await service.getRefundHistory(transactionId)

// Test your notification endpoint:
const { testNotificationToken } = await service.requestTestNotification()
const status = await service.getTestNotificationStatus(testNotificationToken)
```

Errors are typed: `401` throws `InvalidAuthorizationError`; other Apple error responses throw `ServerAPIError` with `errorCode`, `errorMessage`, `isRetryable`, `isRateLimitExceeded`, and `retryAfter`.

## Deprecated: verifyReceipt and Server Notifications V1

Apple deprecated the [verifyReceipt](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt) endpoint and V1 notifications in June 2023.
The typings and helpers remain exported from the package root for existing integrations:

```ts
import { verifyReceipt, isSuccess, ServerNotificationResponseBody } from '@tamtamchik/apple-iap-tools'

const result = await verifyReceipt({ 'receipt-data': receipt, password: secret })
if (isSuccess(result)) {
  // ...
}
```

[ico-coffee]: https://img.shields.io/badge/Buy%20Me%20A-Coffee-%236F4E37.svg?style=flat-square
[ico-version]: https://img.shields.io/npm/v/@tamtamchik/apple-iap-tools.svg?style=flat-square
[ico-license]: https://img.shields.io/npm/l/@tamtamchik/apple-iap-tools.svg?style=flat-square
[ico-downloads]: https://img.shields.io/npm/dt/@tamtamchik/apple-iap-tools.svg?style=flat-square
[ico-types]: https://img.shields.io/npm/types/@tamtamchik/apple-iap-tools.svg?style=flat-square

[link-coffee]: https://www.buymeacoffee.com/tamtamchik
[link-npm]: https://www.npmjs.com/package/@tamtamchik/apple-iap-tools
[link-downloads]: https://www.npmjs.com/package/@tamtamchik/apple-iap-tools
[link-types]: https://tamtamchika.net/apple-iap-tools
