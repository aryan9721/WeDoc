import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const mstFavouritess = gql`
  query mstFavouritess($page: ID, $size: ID) {
    mstFavouritess(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        companyId,
        createdBy,
        createdDate,
        eflyerId,
        modifiedBy,
        modifiedDate,
        mstFavouriteId,
        productId,
        specialId,
        userId
      }
    }
  }
`;

export default mstFavouritess;
