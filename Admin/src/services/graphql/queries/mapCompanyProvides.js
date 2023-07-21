import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mapCompanyProvides = gql`
  query mapCompanyProvides($page: ID, $size: ID) {
    mapCompanyProvides(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        compPackageId,
        createdBy,
        createdDate,
        keywordId,
        modifiedBy,
        modifiedDate,
        periodTypeId,
        periodValue,
        provideKeywordId,
        quantityTypeId,
        volumeTypeId
      }
    }
  }
`;

export default mapCompanyProvides;
