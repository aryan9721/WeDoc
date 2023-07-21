import gql from "graphql-tag";

/* get getMstCategoryByParentId query */
const createMstSpecials = gql`
  mutation createMstSpecials {
    mstSpecials {
      totalPages
      count
      currentPage
      nextPage
      prevPage
      data {
        amount
        categoryId
        cityId
        companyId
        countryId
        createdBy
        createdDate
        description
        endDate
        featured
        imagePath
        latitude
        longitude
        modifiedBy
        phone
        provinceId
        specialId
        specialName
        startDate
        statusId
        streetAddress
        suburbId
        zipCode
      }
    }
  }
`;

export default createMstSpecials;
