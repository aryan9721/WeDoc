import gql from "graphql-tag";

/* get getBusinessTopHire query */
const getBusinessTopOrderedBids = gql`
  query {
    getBusinessTopOrderedBids {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        userID
        firstName
        lastName
        email
        status
        userStatus
        userProfileImage
        userProfileThumbNailImage
        purchasedAmount
        productName
        productID
        orderID
      }
    }
  }
`;

export default getBusinessTopOrderedBids;
