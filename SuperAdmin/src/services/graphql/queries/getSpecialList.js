import gql from "graphql-tag";

/* get getCompanyTaskAsync query */
const getSpecialList = gql`
  query getSpecialList(
    $key: Int
    $keyType: Int
    $userId: Int
    $documentPath: String
    $page: Int
    $size: Int
  ) {
    getSpecialList(
      key: $key
      keyType: $keyType
      userId: $userId
      documentPath: $documentPath
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      success
      totalPages
      result {
        mST_SpecialID
        title
        imagePath
        review
        specialName
        startDate
        endDate
        amount
        categoryId
        cityId
        companyId
        countryId
        createdBy
        createdDate
        description
        phone
        provinceId
        specialId
        key
        keyType
      }
    }
  }
`;

export default getSpecialList;
