import gql from "graphql-tag";

/* get getBusinessTopHire query */
const getBusinessTopHire = gql`
  query {
    getBusinessTopHire {
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

export default getBusinessTopHire;
