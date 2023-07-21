import gql from 'graphql-tag';

/* sign up mutation */
const PAUSE_BUSINESS_PACKAGE = gql`
  mutation {
    pauseBusinessPackage
  {    
    message,   
    success,   
    result
  }
}
`;

export default PAUSE_BUSINESS_PACKAGE;