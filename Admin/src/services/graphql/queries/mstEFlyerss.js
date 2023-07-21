import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mstEFlyerss = gql`
  query mstEFlyerss($page: ID, $size: ID) {
    mstEFlyerss(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        categoryId
        companyId
        createdBy
        createdDate
        description
        efmid
        endDate
        isMenu
        modifiedBy
        modifiedDate
        startDate
        statusId
        title
      }
    }
  }
`;

export default mstEFlyerss;
