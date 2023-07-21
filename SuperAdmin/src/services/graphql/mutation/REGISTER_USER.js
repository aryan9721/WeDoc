import gql from 'graphql-tag';

/* sign up mutation */
const REGISTER_USER = gql`
  mutation HandleSignup(
    $userDto: MstUserDtoInputType!
    $platform: Int!
  ) {
    registerUser(
        userDto: $userDto
        platform: $platform
      
    ) {
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

export default REGISTER_USER;
