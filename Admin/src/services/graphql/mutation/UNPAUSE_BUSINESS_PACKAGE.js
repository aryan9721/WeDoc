import gql from 'graphql-tag';

/* sign up mutation */
const UNPAUSE_BUSINESS_PACKAGE = gql`
  mutation {
    unPauseBusinessPackage
  {    
    message,   
    success,   
    result
  }
}
  
`;

export default UNPAUSE_BUSINESS_PACKAGE;