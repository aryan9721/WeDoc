import gql from 'graphql-tag';

/* get badges query */
const SIGN_IN = gql`
  query sSOLogin($jti: String) {
    sSOLogin(jti: $jti) {
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result{
          firstName,
          lastName,
          vGender,
          email,
          streetAddress,
          suburbName,
          zipCode,
          userProfileImage,
          cityName,
          provinceName
          streetAddress,
          userProfileImage,
          paymentUrl,
          token,
          tokenExpires
        }
    }
  }
`;

export default SIGN_IN;
