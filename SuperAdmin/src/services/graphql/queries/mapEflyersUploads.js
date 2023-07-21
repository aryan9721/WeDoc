import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mapEflyersUploads = gql`
  query mapEflyersUploads($page: ID, $size: ID) {
    mapEflyersUploads(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        documentName
        documentType
        eflyerUploadId
        efmid
        filePath
        isActive
        modifiedBy
        modifiedDate
        sortOrder
        thumbNailImagePath
      }
    }
  }
`;
export default mapEflyersUploads;
