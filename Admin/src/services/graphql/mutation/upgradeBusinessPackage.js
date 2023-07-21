import gql from 'graphql-tag';

/* sign up mutation */
const upgradeBusinessPackage = gql`

    mutation upgradeBusinessPackage(
      $userDto: MstUserDtoInputType!
      
    ) {
      upgradeBusinessPackage(
        userDto: $userDto
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
        paymentUrl,
        token,
        tokenExpires
      }
    }
  }

  `;

export default upgradeBusinessPackage;