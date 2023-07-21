import gql from "graphql-tag";

/* sign up mutation */
const createMstCustomerEnquiry = gql`
  mutation {
    createMstCustomerEnquiry(
      mstCustomerEnquiry: {
        companyId: 2
        createdBy: 4096
        createdDate: "2016-01-14T08:10:49.93"
        customerEnquiryId: 0
        enquiryDate: "2016-01-14T08:10:49.93"
        enquiryDescription: "Testing My First Customer Enquiry Testing My First Customer Enquiry Testing My First Customer Enquiry Testing My First Customer Enquiry"
        enquiryStatusId: 2
        enquiryTitle: "Testing My First Customer Enquiry"
        modifiedBy: null
        modifiedDate: null
        userId: 4096
      }
    ) {
      customerEnquiryId
    }
  }
`;

export default createMstCustomerEnquiry;
