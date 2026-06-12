# Apple IAP Tools

[![Buy Me A Coffee][ico-coffee]][link-coffee]
[![Latest Version on NPM][ico-version]][link-npm]
[![TypeScript][ico-types]][link-types]
[![Software License][ico-license]](LICENSE)
[![Total Downloads][ico-downloads]][link-downloads]

Handle Apple in-app purchases on your Node.js server: receive and **cryptographically verify** [App Store Server Notifications V2](https://developer.apple.com/documentation/appstoreservernotifications), and call the [App Store Server API](https://developer.apple.com/documentation/appstoreserverapi) with a fully typed client. No configuration, one dependency ([`jose`](https://github.com/panva/jose)).

Full API reference: https://tamtamchik.github.io/apple-iap-tools

## Installation

```sh
npm install @tamtamchik/apple-iap-tools
```

Requires Node.js 22 or later.

## Quick start: handle a notification webhook

Apple POSTs `{ "signedPayload": "<JWS string>" }` to your server whenever something happens to a purchase — renewal, refund, billing issue, and so on. `decode()` verifies the signature and the certificate chain against the Apple Root CA before giving you the data, so a forged request never gets past this line:

```ts
import { CertificateVerificationError, ServerNotificationsV2 } from '@tamtamchik/apple-iap-tools'

const { decode, isDataNotification, Body } = ServerNotificationsV2

app.post('/apple/notifications', async (req, res) => {
  let result
  try {
    result = await decode(req.body)
  } catch (error) {
    if (error instanceof CertificateVerificationError) {
      return res.sendStatus(401) // certificate chain didn't check out — likely a forged request
    }
    throw error // anything else (bad signature, malformed JSON) — let your error handler respond 5xx, Apple will retry
  }

  if (isDataNotification(result)) {
    const { notificationType, subtype } = result.body
    const transaction = result.transactionPayload

    switch (notificationType) {
      case Body.notificationType.DID_RENEW:
        // extend access for transaction.originalTransactionId
        break
      case Body.notificationType.EXPIRED:
      case Body.notificationType.REFUND:
        // revoke access
        break
    }
  }

  res.sendStatus(200) // anything other than 2xx makes Apple retry the notification
})
```

> **Heads up:** every field of the decoded payloads is optional, exactly as in Apple's schema — which fields are present depends on the purchase type and transaction state. Don't assume `transaction.expiresDate` exists for a consumable.

### Notification payload variants

A notification carries exactly one of four payloads. Type guards narrow both the body and the attached decoded transactions:

| Guard | When | What you get |
|---|---|---|
| `isDataNotification` | most purchase events | `transactionPayload`, `pendingRenewalInfoPayload` |
| `isSummaryNotification` | mass renewal-date extension finished | `body.summary` |
| `isExternalPurchaseTokenNotification` | External Purchase API apps | `body.externalPurchaseToken` |
| `isAppDataNotification` | `RESCIND_CONSENT` | `appTransactionPayload` |

## App Store Server API

Generate an In-App Purchase key in App Store Connect (Users and Access → Integrations → In-App Purchase) and pass the `.p8` contents to the client. Tokens are signed with ES256 and cached for you.

```ts
import { ServerAPI, verifySignedPayload } from '@tamtamchik/apple-iap-tools'
import type { ServerNotificationsV2 } from '@tamtamchik/apple-iap-tools'

const service = new ServerAPI.Service(
  privateKey, // contents of the .p8 file
  keyId,      // key ID from App Store Connect
  issuerId,   // issuer ID from App Store Connect
  bundleId,   // your app's bundle ID
  ServerAPI.ServiceEnvironment.Production, // defaults to Sandbox
)
```

Fetch a customer's full transaction history (responses are paginated by `revision`):

```ts
type Transaction = ServerNotificationsV2.Body.jwsTransactionDecodedPayload

const transactions: Transaction[] = []
let revision: string | undefined

do {
  const page = await service.getTransactionHistory(transactionId, { revision })
  for (const jws of page.signedTransactions) {
    transactions.push(await verifySignedPayload<Transaction>(jws))
  }
  revision = page.hasMore ? page.revision : undefined
} while (revision)
```

Every response that contains transactions returns them as JWS strings — run each through `verifySignedPayload()` to verify and decode, as above.

Other endpoints:

```ts
const info = await service.getTransactionInfo(transactionId)
const statuses = await service.getAllSubscriptionStatuses(transactionId)
const order = await service.lookUpOrderId(orderId) // production only
const refunds = await service.getRefundHistory(transactionId)

// Check that Apple can reach your webhook:
const { testNotificationToken } = await service.requestTestNotification()
const status = await service.getTestNotificationStatus(testNotificationToken)
```

### Error handling

```ts
import { ServerAPI } from '@tamtamchik/apple-iap-tools'

try {
  await service.getTransactionInfo(transactionId)
} catch (error) {
  if (error instanceof ServerAPI.InvalidAuthorizationError) {
    // 401 — check your key, key id, issuer id, and bundle id
  } else if (error instanceof ServerAPI.ServerAPIError) {
    error.errorCode             // Apple's numeric error code
    error.isRateLimitExceeded   // true on 429
    error.retryAfter            // seconds to wait, from the Retry-After header
    error.isRetryable           // Apple marks some errors as safe to retry
  }
}
```

Statuses other than 400/404/429/500 (and 401) throw a plain `Error`.

## Migrating from 1.x

- Node.js **22+** is required (global `fetch`; `node-fetch` was dropped).
- All decoded JWS payload fields are now **optional**, matching Apple's schema — code that assumed `expiresDate`, `offerIdentifier`, etc. always exist needs null checks.
- Everything you imported from the package root in 1.x is still there: `verifyReceipt`, `isSuccess`, V1 notification typings (including `InAppPurchaseTransaction`).

## Deprecated: verifyReceipt and Server Notifications V1

Apple deprecated the [verifyReceipt](https://developer.apple.com/documentation/appstorereceipts/verifyreceipt) endpoint and V1 notifications in June 2023 — use the Server API and V2 notifications above for new code. The legacy typings and helpers remain exported for existing integrations:

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
[link-types]: https://tamtamchik.github.io/apple-iap-tools
