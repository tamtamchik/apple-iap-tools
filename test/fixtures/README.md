# Local real-payload fixtures

`realPayloads.test.ts` verifies genuine Apple-signed payloads against the default
`Apple Root CA - G3` fingerprint — the production path the synthetic certificate
suite cannot exercise. The fixture holds real third-party transaction data, so it
is **gitignored and never committed**. When the file is absent (CI, fresh clone)
the suite skips itself.

## File

`test/fixtures/real-apple-payloads.local.json`

```json
[
  { "kind": "transaction", "jws": "eyJhbGciOiJFUzI1Ni…<full JWS>" },
  { "kind": "receipt",     "jws": "eyJhbGciOiJFUzI1Ni…<full JWS>" }
]
```

- `jws` — a complete compact JWS (`header.payload.signature`) whose `x5c` chain
  terminates at Apple Root CA - G3.
- `kind` — free-form label, used only in the test name.

## How to (re)create it

Any genuine Apple-signed JWS works. Easiest source you own:

1. App Store Connect → your app → App Information → set the Sandbox server
   notification URL, or use **Request a Test Notification** via the App Store
   Server API. Capture the `signedPayload` your endpoint receives.
2. Alternatively, capture a `signedTransactionInfo` / `signedRenewalInfo` from a
   real or sandbox transaction.
3. Drop the full JWS string(s) into the JSON file above.

## Clock pinning

The test pins the system clock (`vi.setSystemTime`) to **2026-01-01** so it stays
deterministic regardless of run date. Apple leaf certificates are time-bounded; if
your payload's leaf is valid outside that instant, adjust `PINNED` in
`realPayloads.test.ts` to a date inside the leaf's `notBefore … notAfter` window
(inspect with `openssl x509` on the first `x5c` entry).
