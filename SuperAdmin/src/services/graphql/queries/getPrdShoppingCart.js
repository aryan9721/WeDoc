import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getPrdShoppingCart = gql`
query getPrdShoppingCart($page: Int!, $size: Int!){
    getPrdShoppingCart(page:$page, size: $size){
        count,
    currentPage,
    message,
    nextPage,
    prevPage,
    success,
    totalPages,
    result {
      prdShoppingCartDto {
        categoryID
        categoryName
        description
        productID
        productImage
        productName
        productNumber
        quantity
        recordID
        totalPrice
        unitCost
      }
      totalAmount,
      amountExlVat,
      vatAmount,
      recuringAmount
    }
     }
   }
`;

export default getPrdShoppingCart;
