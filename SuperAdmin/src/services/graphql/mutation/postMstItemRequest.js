import gql from "graphql-tag";

/* sign up mutation */
const postMstItemRequest = gql`
  mutation postMstItemRequest($mstItemRequest: MstItemRequestInputType!) {
    postMstItemRequest(mstItemRequest: $mstItemRequest) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
    }
  }
`;

export default postMstItemRequest;
