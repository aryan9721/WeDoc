import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const prdOrderPayments = gql`
query prdOrderPayments($page: ID, $size: ID)
{
    prdOrderPayments(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            amount,
        createdBy,
        createdDate,
        orderId,
        orderPaymentId,
        paymentDate,
        paymentModeId,
        paymentRefNo
        }
    }
}
`;

export default prdOrderPayments;
