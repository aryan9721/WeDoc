import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const prdOrdersStats = gql`
query {
    prdOrdersStats{
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages
        result{
            year,
            month,
            totalAmount,
            averageAmount,
            minAmount,
            maxAmount
            
        }
    }

}
`;
export default prdOrdersStats;