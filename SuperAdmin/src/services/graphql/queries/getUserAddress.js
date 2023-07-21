import gql from "graphql-tag";

/* get getUserAddress query */
const getUserAddress = gql`
  query getUserAddress($page: ID, $size: ID) {
    getUserAddress(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      result {
        companyId
        createdBy
        createdDate
        customerEnquiryId
        enquiryDate
        enquiryDescription
        enquiryStatusId
        enquiryTitle
        modifiedBy
        modifiedDate
        userId
      }
    }
  }
`;

export default getUserAddress;
