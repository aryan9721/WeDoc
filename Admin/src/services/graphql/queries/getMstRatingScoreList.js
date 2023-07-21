import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const getMstRatingScoreList = gql`
  query getMstRatingScoreList($page: Int, $size: Int) {
    getMstRatingScoreList(page: $page, size: $size) {
      totalPages
      count
      currentPage
      nextPage
      prevPage
     result {
        ratingScore,
      ratingScoreName,
      ratingScoreCount,
      ratingScorePercent,
      totalRatingCount,
      totalRatingScore
      }
    }
  }
`;

export default getMstRatingScoreList;
