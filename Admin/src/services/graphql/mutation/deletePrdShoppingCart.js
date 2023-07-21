import gql from 'graphql-tag';

/* deletePrdShoppingCart mutation */
const deletePrdShoppingCart = gql`
  mutation deletePrdShoppingCart(
    $prdShoppingCart: PrdShoppingCartInputType!
    
  ) {
    deletePrdShoppingCart(
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

export default deletePrdShoppingCart;
