import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const prdOrdersGrowth = gql`
  query {
    prdOrdersGrowth{
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

export default prdOrdersGrowth;
