# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[comment]: <> (## [Unreleased])

[comment]: <> (### Added)

[comment]: <> (### Changed)

[comment]: <> (### Deprecated)

[comment]: <> (### Removed)

[comment]: <> (### Fixed)

[comment]: <> (### Security)

## [1.2.1] - 2021-08-04

### Fixed

- `getPendingRenewalInfo` helper now returns only latest transaction pending info. 

## [1.2.0] - 2021-04-20

### Add

- `verifyReceipt` can throw `VerifyReceiptFetchError` now which contains original fetch response in `originalResponse`.


## [1.1.1] - 2021-04-20

### Fixed

- Fails to import in Node ([#1](https://github.com/tamtamchik/apple-iap-tools/issues/1), thx [@vpzomtrrfrt](https://github.com/vpzomtrrfrt))

## [1.1.0] - 2021-03-24

### Added

- Allow one instance of object to `latest_receipt_info` and `pending_renewal_info` props.
- Helper functions for `verifyReceipt` response status validation.
- Helper functions for obtaining data from `verifyReceipt` response.

## [1.0.2] - 2021-03-22

### Removed

- Duplication in typings.

## [1.0.1] - 2021-03-22

### Fixed

- Verification over Sandbox environment.

## [1.0.0] - 2021-03-22

Initial release.

[1.2.0]: https://github.com/tamtamchik/apple-iap-tools/compare/1.1.1...1.2.0
[1.1.1]: https://github.com/tamtamchik/apple-iap-tools/compare/1.1.0...1.1.1
[1.1.0]: https://github.com/tamtamchik/apple-iap-tools/compare/1.0.2...1.1.0
[1.0.2]: https://github.com/tamtamchik/apple-iap-tools/compare/1.0.1...1.0.2
[1.0.1]: https://github.com/tamtamchik/apple-iap-tools/compare/1.0.0...1.0.1
[1.0.0]: https://github.com/tamtamchik/apple-iap-tools/releases/tag/1.0.0


