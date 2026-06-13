import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { afterAll, describe, expect, it, vi } from 'vitest'

import { verifySignedPayload } from '../src/jws/verifySignedPayload'

/**
 * Regression check against genuine Apple-signed payloads, verified through the
 * default Apple Root CA - G3 fingerprint — the production path the synthetic
 * suite cannot exercise.
 *
 * The fixture holds real third-party transaction data, so it is gitignored and
 * never committed. When the file is absent (CI, fresh clone) the suite skips.
 */
const FIXTURE = fileURLToPath(new URL('./fixtures/real-apple-payloads.local.json', import.meta.url))

interface RealPayload { kind: string, jws: string }

const fixtures: RealPayload[] = existsSync(FIXTURE) ? JSON.parse(readFileSync(FIXTURE, 'utf8')) : []

// The fixtures' leaf certificates are valid Sep 2025 – Oct 2027; pin the clock
// inside that window so the test stays deterministic regardless of run date.
const PINNED = new Date('2026-01-01T00:00:00Z')

describe.skipIf(fixtures.length === 0)('real Apple payloads (local fixture)', () => {
  afterAll(() => {
    vi.useRealTimers()
  })

  it.each(fixtures)('verifies a real $kind payload against Apple Root CA - G3', async ({ jws }) => {
    vi.useFakeTimers()
    vi.setSystemTime(PINNED)

    const payload = await verifySignedPayload<{ bundleId: string }>(jws)

    expect(payload.bundleId).toBeTruthy()
  })
})
