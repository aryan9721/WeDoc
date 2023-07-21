import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getMstPackageList = gql`
query getMstPackageList(
    $packageId: Int
    )
{
    getMstPackageList(
        packageId: $packageId
       )
    {
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result {
            packageID
            packageName
            amount
            isRecommended
            recommendedText
            sortOrder
            isActive
            activeText
            threeMonths
            sixMonths
            twelveMonths
            threeMonthsVat
            sixMonthsVat
            twelveMonthsVat
            fiveDiscount
            tenDiscount
            fifteenDiscount
            fiveOFF
            tenOFF
            fifteenOFF
            zeroOFF
        }
    }
}
`;

export default getMstPackageList;
