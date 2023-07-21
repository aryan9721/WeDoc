import gql from "graphql-tag";

/* get getMstCategoryMain query */
const getUser = gql`
  query {
    getUser {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        firstName
        lastName
        statusName
        vGender
        token
        email
        streetAddress
        provinceID
        provinceName
        cityID
        cityName
        statusName
        suburbID
        suburbName
        longitude
        latitude
        zipCode
        userProfileImage
        paymentUrl
        packageID
        compPercent
        companyId
      }
    }
  }
`;

export default getUser;
