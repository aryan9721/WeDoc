import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const mstSpecialss = gql`
query mstSpecialss($page: ID, $size: ID)
{
    mstSpecialss(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            amount,
        categoryId,
        cityId,
        companyId,
        countryId,
        createdBy,
        createdDate,
        description,
        endDate,
        featured,
        imagePath,
        latitude,
        longitude,
        modifiedBy,
        phone,
        provinceId,
        specialId,
        specialName,
        startDate,
        statusId,
        streetAddress,
        suburbId,
        zipCode
        }
    }
}
`;

export default mstSpecialss;
