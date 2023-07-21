import gql from "graphql-tag";

/* get badges query */
const getBusinessList = gql`
  query getBusinessList(
      $companyId: Int!
      $companyName: String
      $franchiseeId: Int!
      $statusIds: String
    $categoryIds: String
    $provinceIds: String
    $cityIds: String
    $suburbIds: String
    $page: Int!
    $size: Int!
  ) {
    getBusinessList(
        companyId: $companyId
      companyName: $companyName
      franchiseeId: $franchiseeId
      statusIds: $statusIds
      categoryIds: $categoryIds
      provinceIds: $provinceIds
      cityIds: $cityIds
      suburbIds: $suburbIds
      page: $page
      size: $size
    ) {
      count
      currentPage
      message
      nextPage
      prevPage
      result {
        bEEScorePoint,
        bEEStatus,
        bEEStatusID,
        companyId,
        companyName,
        companyPercentage,
        companyStatus,
        companyStatusID,
        compCityID,
        compCityName,
        compCountryID,
        compCountryName,
        compDescription,
        compEmailId,
        compHelpDeskNumber,
        compPhone,
        compProvinceID,
        compProvinceName,
        compStreetAddress,
        compSuburb,
        compSuburbID,      
        compWebSite,
        directorsCount,
        franchiseId,
        intCompanyMBUDeviceID,
        intCompanyMBUDeviceType,
        intCompanyMBUEmail,
        intCompanyMBUName,
        joinDate,
        logoPath,
        procurementRecognition,
        serviceTax,
        vATNumber,
        zipCode,
        viewCount,
        clickCount
        mstCompanyDto {
          createdBy
          createdDate
          irUploadId
          isActive
          itemRequestId
          modifiedBy
          modifiedDate
          thumbNailPath
          uploadPath
        }
        province
        provinceID
        selectedCompany
        suburb
        suburbID
        userID
        userName
      }
      success
      totalPages
    }
  }
`;

export default getBusinessList;
