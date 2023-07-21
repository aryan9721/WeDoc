
import gql from 'graphql-tag';

export const CreatePrdBid = gql`
  mutation CreatePrdBid(
    $prdBid: PrdBidInputType!
  ) {
    createPrdBid(prdBid: $prdBid) {
      bidAmount
      bidApprovedMail
      bidId
      createdDate
      isAccepted
      isActive
      modifiedBy
      modifiedDate
      # mstCountry {
      # }
      productId
      userId
    }
  }
`
export default CreatePrdBid;

