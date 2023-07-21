import gql from "graphql-tag";

/* get getMstCategoryMain query */
const getBusinessTopUserOrdersUsers = gql`
  query {
    getBusinessTopUserOrdersUsers {
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

export default getBusinessTopUserOrdersUsers;
