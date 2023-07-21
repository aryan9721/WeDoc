import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const prdOrdersSummary = gql`
  query {
    prdOrdersSummary{
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages
        result{
            salesType,
            totalAmount
            
        }
    }
    }
  
`;

export default prdOrdersSummary;
