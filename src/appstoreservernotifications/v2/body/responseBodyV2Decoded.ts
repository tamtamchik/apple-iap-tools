import { jwsRenewalInfoDecodedPayload } from '../../../jws/jwsRenewalInfoDecodedPayload'
import { jwsTransactionDecodedPayload } from '../../../jws/jwsTransactionDecodedPayload'

import { responseBodyV2DecodedPayload } from './responseBodyV2DecodedPayload'

export interface responseBodyV2Decoded extends responseBodyV2DecodedPayload {
  data: responseBodyV2DecodedPayload['data'] & {
    transactionPayload: jwsTransactionDecodedPayload
    pendingRenewalInfoPayload?: jwsRenewalInfoDecodedPayload
  }
}
