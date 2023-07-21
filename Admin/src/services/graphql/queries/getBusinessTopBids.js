import gql from "graphql-tag";

/* get getBusinessTopHire query */
const getBusinessTopBids = gql`
  query {
    getBusinessTopBids {
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
        bidAmount
        purchasedAmount
        productName
        productID
        orderID
      }
    }
  }
`;

export default getBusinessTopBids;
