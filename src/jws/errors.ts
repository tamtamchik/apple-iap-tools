export class CertificateVerificationError extends Error {
  certs: string[]

  constructor (certs: string[], message?: string) {
    super(message ?? 'Certificate verification failed')
    this.certs = certs
  }
}
