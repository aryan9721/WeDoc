import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const prdOrderDetails = gql`
query prdOrderDetails($id: Int)
{
    prdOrderDetails(id: $id)
    {
        orderDetailsId
        orderId
        productId
        productPrice
        orderQuantity
        orderAmount
        downloadCount
        createdBy
        createdDate
        modifiedBy
        modifiedDate
        order {
            orderId
            userId
            orderIdstring
            orderSessionId
            orderDate
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
            modifiedDate
            user{
                userId
                roleId
                email
                firstName
                lastName
                userName
            }
            prdOrderStatus{
                isCurrentStatus
                orderStatusDate
            }
           
        }
        products{
            productId
            categoryId
            productNumber
            productName
            productImage
            unitCost
            inventory
            description
            documentName
            documentPath
            domainId
            subCategoryId
            isActive
            createdBy
            createdDate
            modifiedBy
            modifiedDate
            salesTypeId
            scopeId
            companyID
        }
    }

}
`;
export default prdOrderDetails;