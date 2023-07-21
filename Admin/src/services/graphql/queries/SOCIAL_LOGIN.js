import gql from 'graphql-tag';

/* get badges query */
const SOCIAL_LOGIN = gql`
  query oAuth {
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
`;

export default SOCIAL_LOGIN;
