import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const mstCrmQuotes = gql`
query mstCrmQuotes($page: ID, $size: ID)
{
    mstCrmQuotes(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            amount,
        companyId,
        createdBy,
        createdDate,
        customerId,
        isActive,
        modifiedBy,
        modifiedDate,
        quoteDate,
        quoteDescription,
        quoteFooter,
        quoteId,
        quoteNo,
        totalAmount,
        vatamount
           
        }
    }
}
`;

export default mstCrmQuotes;
