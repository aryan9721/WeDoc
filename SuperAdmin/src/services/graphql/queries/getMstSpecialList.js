import gql from "graphql-tag";

/* get getMstSpecialList query */
const getMstSpecialList = gql`
  query getMstSpecialList($page: Int, $size: Int) {
    getMstSpecialList(page: $page, size: $size) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        amount
        categoryID
        categoryIds
        categoryName
        cityID
        cityIds
        cityName
        companyIds
        countryID
        countryName
        dis
        distance
        documentLink
        endDate
        franchiseId
        imagePath
        latitude
        longitude
        phone
        provinceID
        provinceIds
        provinceName
        specialDescription
        specialId
        specialID
        specialName
        staId
        startDate
        statusId
        statusID
        statusName
        streetAddress
        suburb
        suburbID
        suburbIds
        userId
        userLatitude
        userLongtitude
        zipCode
      }
    }
  }
`;

export default getMstSpecialList;
