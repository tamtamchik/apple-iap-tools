export interface AppleApiHeadersOptions {
  privateKey: string;      // Your private key content
  keyId: string;           // Your key ID
  issuerId: string;        // Your issuer ID
  expirationTime?: number; // Optional: JWT expiration time in seconds
}
