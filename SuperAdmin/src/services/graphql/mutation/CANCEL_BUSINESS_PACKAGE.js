import gql from 'graphql-tag';

/* sign up mutation */
const CANCEL_BUSINESS_PACKAGE = gql`
  mutation {
    cancleBusinessPackage
  {    
    message,   
    success,   
    result
  }
}
  
`;

export default CANCEL_BUSINESS_PACKAGE;