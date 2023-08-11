import crypto from 'node:crypto'

import { AppleApiHeadersOptions } from './interfaces'

const DEFAULT_EXPIRATION_TIME = 1200 // 20 minutes

/**
 * Generate JWT token for Apple API authentication.
 */
export function generateJwtToken (options: AppleApiHeadersOptions): string {
  const { privateKey, kid, iss, expOffset = DEFAULT_EXPIRATION_TIME } = options

  const header = {
    alg: 'ES256',
    kid,
    typ: 'JWT',
  }

  const payload = {
    iss,
    exp: Math.floor(Date.now() / 1000) + expOffset,
    aud: 'appstoreconnect-v1',
  }

  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString('base64')

  const encodedHeader = encode(header)
  const encodedPayload = encode(payload)

  const signature = crypto.createSign(header.alg)
    .update(`${encodedHeader}.${encodedPayload}`)
    .sign(privateKey, 'base64')

  return `${encodedHeader}.${encodedPayload}.${signature}`
}
