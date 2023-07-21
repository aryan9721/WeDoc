import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const purchaseShoppingCartAsync = gql`
query purchaseShoppingCartAsync($id: Int!)
{
    purchaseShoppingCartAsync(id:$id)
    {
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result{
        paymentUrl,
        paymentMethod,
        }
    }
}
`;

export default purchaseShoppingCartAsync;
