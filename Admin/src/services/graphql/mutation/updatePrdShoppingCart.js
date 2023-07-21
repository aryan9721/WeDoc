import gql from 'graphql-tag';

/* sign up mutation */
const updatePrdShoppingCart = gql`
  mutation  updatePrdShoppingCart($prdShoppingCart: PrdShoppingCartInputType!){
    updatePrdShoppingCart(prdShoppingCart: $prdShoppingCart)
  {    
    recordId,
    sessionId
  }
}
  
`;

export default updatePrdShoppingCart;