export class CertificateVerificationError extends Error {
  certs: string[]

  constructor (certs: string[], message?: string, options?: ErrorOptions) {
    super(message ?? 'Certificate verification failed', options)
    this.certs = certs
  }
}
