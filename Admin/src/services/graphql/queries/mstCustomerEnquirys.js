import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mstCustomerEnquirys = gql`
  query mstCustomerEnquirys($page: ID, $size: ID) {
    mstCustomerEnquirys(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
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

export default mstCustomerEnquirys;
