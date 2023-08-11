import { AppleApiHeadersOptions } from '../jws/interfaces'
import { generateJwtToken } from '../jws/jwt'

/**
 * Generate headers for Apple API.
 */
export function generateAppleApiHeaders (options: AppleApiHeadersOptions): { Authorization: string } {
  return { Authorization: `Bearer ${generateJwtToken(options)}` }
}
