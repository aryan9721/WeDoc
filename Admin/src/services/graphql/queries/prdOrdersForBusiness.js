import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const prdOrdersForBusiness = gql`
query prdOrdersForBusiness(
    $orderStatusTypeId: Int
    $salesTypeId: Int
    $scopeId: Int
    $paymentStatusId: Int
    $typeId: Int
    $categoryId: Int
    $productId: Int
    $userId: Int
    $fromDate: DateTime
    $toDate: DateTime
    $page: ID
    $size: ID
)
{
    prdOrdersForBusiness(orderStatusTypeId: $orderStatusTypeId
        salesTypeId: $salesTypeId
        scopeId: $scopeId
        paymentStatusId: $paymentStatusId
        typeId: $typeId
        categoryId: $categoryId
        productId: $productId
        userId: $userId
        fromDate: $fromDate
        toDate: $toDate
        page: $page
        
        size: $size
    )
    {
        count
        currentPage
        message
        nextPage
        prevPage
        success
        totalPages
        result{
            orderId
            userId
            orderIdstring
            orderSessionId
            orderDate
            orderIpaddress
            orderAmount
            orderTotal
            transactionId
            orderStatusId
            paymentDate
            expiredDate
            productId
            downloadCount
            createdBy
            createdDate
            modifiedBy
            user{
                userId
                roleId
                email
                firstName
                lastName
                userName
                dateofBirth
                gender
                streetAddress
                countryId
                provinceId
                cityId
            }

        }
       
       
    }
}
`;

export default prdOrdersForBusiness;
