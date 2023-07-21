import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const mstCrmInventorys = gql`
query mstCrmInventorys($page: ID, $size: ID)
{
    mstCrmInventorys(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            inventoryId
            companyId
            inventoryTypeId
            inventoryName
            inventoryDescription
            officeDescription
            qunatityTypeName
            quantity
            isActive
            createdBy
            createdDate
            modifiedBy
            modifiedDate
           
        }
    }
}
`;

export default mstCrmInventorys;
