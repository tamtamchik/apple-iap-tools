import { AppleApiHeadersOptions } from './interfaces'
import { generateJwtToken } from './jwt'

/**
 * Generate headers for Apple API.
 */
export function generateAppleApiHeaders (options: AppleApiHeadersOptions): { Authorization: string } {
  return { Authorization: `Bearer ${generateJwtToken(options)}` }
}
