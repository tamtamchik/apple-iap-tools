export interface AppleApiHeadersOptions {
  privateKey: string; // Your private key content
  kid: string;        // Your key ID
  iss: string;        // Your issuer ID
  expOffset?: number; // Optional: JWT expiration time in seconds
}
