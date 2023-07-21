import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const prdTopOrdersProducts = gql`
  query {
    prdTopOrdersProducts{
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages
        result{
            productID,
            productName,
            count                       
        }
    }
    }
  
`;

export default prdTopOrdersProducts;
