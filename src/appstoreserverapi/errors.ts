export class InvalidAuthorizationError extends Error {
  constructor (message?: string) {
    super(message ?? 'Unauthorized, looks like your token is invalid')
  }
}

/**
 * Error codes that App Store Server API responses return.
 *
 * @link https://developer.apple.com/documentation/appstoreserverapi/error_codes
 * @link https://developer.apple.com/documentation/appstoreserverapi/identifying_rate_limits
 */
export interface ServerAPIErrorResponse {
  errorCode: number
  errorMessage: string
}

export class ServerAPIError extends Error {
  static readonly RETRYABLE_CODES = [
    4040002, // AccountNotFoundRetryableError
    4040004, // AppNotFoundRetryableError
    4040006, // OriginalTransactionIdNotFoundRetryableError
    5000001, // GeneralInternalRetryableError
  ]

  errorCode: number
  errorMessage: string

  isRetryable: boolean
  isRateLimitExceeded: boolean

  retryAfter?: number

  constructor (status: number, error: ServerAPIErrorResponse, headers: Headers, message?: string) {
    super(message ?? `App Store Server API error: ${error.errorMessage} (${error.errorCode})`)

    this.errorCode = error.errorCode
    this.errorMessage = error.errorMessage

    // https://developer.apple.com/documentation/appstoreserverapi/error_codes#3886513
    this.isRetryable = ServerAPIError.RETRYABLE_CODES.includes(error.errorCode)
    // https://developer.apple.com/documentation/appstoreserverapi/ratelimitexceedederror
    this.isRateLimitExceeded = status === 429 || error.errorCode === 4290000

    // https://developer.apple.com/documentation/appstoreserverapi/identifying_rate_limits
    if (this.isRateLimitExceeded && headers.has('Retry-After')) {
      this.retryAfter = Number(headers.get('Retry-After'))
    }
  }
}
