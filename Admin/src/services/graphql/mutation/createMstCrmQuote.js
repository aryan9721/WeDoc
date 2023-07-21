import gql from "graphql-tag";

/* sign up mutation */
const createMstCrmQuote = gql`
  mutation {
    createMstCrmQuote(
      mstCrmQuote: {
        amount: 500000.00
        companyId: 2
        createdBy: 2
        createdDate: "2016-01-06T22:41:53.32"
        customerId: 1
        isActive: true
        modifiedBy: null
        modifiedDate: null
        quoteDate: "2016-01-07T00:00:00"
        quoteDescription: "Door of BMW"
        quoteFooter: "Door of BMW"
        quoteId: 0
        quoteNo: "QUOTE - 00021"
        totalAmount: 570000.00
        vatamount: 70000.00
      }
    ) {
      quoteId
    }
  }
`;

export default createMstCrmQuote;
