import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mapCompanySeeks = gql`
  query mapCompanySeeks($page: ID, $size: ID) {
    mapCompanySeeks(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        compPackageId
        createdBy
        createdDate
        keywordId
        modifiedBy
        modifiedDate
        periodTypeId
        periodValue
        quantityTypeId
        seekKeywordId
        volumeTypeId
      }
    }
  }
`;

export default mapCompanySeeks;
