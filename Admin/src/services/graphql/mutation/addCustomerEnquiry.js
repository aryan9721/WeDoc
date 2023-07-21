import gql from "graphql-tag";

/* sign up mutation */
const addCustomerEnquiry = gql`
  mutation CustomerEnquiry($customerEnquiry: MstCustomerEnquiryInputType!) {
    customerEnquiry(customerEnquiry: $customerEnquiry) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export default addCustomerEnquiry;
