import gql from 'graphql-tag';

/* sign up mutation */
const postPrdShoppingCartOptimized = gql`
  mutation postPrdShoppingCartOptimized(
    $prdShoppingCart: PrdShoppingCartInputType!
         
  ) {
    postPrdShoppingCartOptimized(
        prdShoppingCart: $prdShoppingCart
    ) {
        count
        currentPage
        message
        nextPage
        prevPage
        success
        totalPages
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

export default postPrdShoppingCartOptimized;
