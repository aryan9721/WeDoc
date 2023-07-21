import gql from "graphql-tag";

/* get getBusinessTopHire query */
const getBusinessIncomingEnquiry = gql`
  query {
    getBusinessIncomingEnquiry {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        userID
        enquiryTitle
        enquiryDescription
        enquiryDate
        enquiryStatusId
        companyId
        createdDate
        createdBy
        modifiedBy
        modifiedDate
        mapCustomerEnquiryUpload
        mstCustomerEnquiryResponse
      }
    }
  }
`;

export default getBusinessIncomingEnquiry;
