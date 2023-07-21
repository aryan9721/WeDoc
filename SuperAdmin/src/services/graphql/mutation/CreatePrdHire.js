
import gql from 'graphql-tag';

const CreatePrdHire = gql`
  mutation CreatePrdHire(
    $prdHire: PrdHireInputType!
  ) {
    createPrdHire(prdHire: $prdHire) {
      businessConfirmedReturned
      businessConfirmedReturnedDate
      clientConfirmedReturned
      clientConfirmedReturnedDate
      fromDate
      hireId
      isAccepted
      # mstCountry {
      # }
      productId
      returned
      returnedDate
      toDate
      userId
    }
  }
`

export default CreatePrdHire;

