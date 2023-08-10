import { jwsRenewalInfoDecodedPayload } from './jwsRenewalInfoDecodedPayload'
import { jwsTransactionDecodedPayload } from './jwsTransactionDecodedPayload'
import { responseBodyV2DecodedPayload } from './responseBodyV2DecodedPayload'

export interface responseBodyV2Decoded extends responseBodyV2DecodedPayload {
  data: responseBodyV2DecodedPayload['data'] & {
    transactionPayload: jwsTransactionDecodedPayload
    pendingRenewalInfoPayload?: jwsRenewalInfoDecodedPayload
  }
}
