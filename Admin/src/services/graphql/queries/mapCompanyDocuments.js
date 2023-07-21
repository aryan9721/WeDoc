import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mapCompanyDocuments = gql`
  query mapCompanyDocuments($page: ID, $size: ID) {
    mapCompanyDocuments(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      result {
        aboutDocument,
        companyId,
        compDocId,
        createdDate,
        documentName,
        documentPath,
        documentStatusId,
        documentTypeId,
        modifiedBy,
        modifiedDate,
        rejectReason
      }
    }
  }
`;

export default mapCompanyDocuments;
