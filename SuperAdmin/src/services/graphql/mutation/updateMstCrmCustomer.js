import gql from 'graphql-tag';

/* createMstFavourites mutation */
const updateMstCrmCustomer = gql`
  mutation updateMstCrmCustomer(
    $mstCrmCustomer: MstCrmCustomerInputType!
    
  ) {
    updateMstCrmCustomer(
      mstCrmCustomer: $mstCrmCustomer
    ) {
        customerId
        userId
        companyId
        companyName
        firstName
        lastName
        email
        gender
        streetAddress
        countryId
        provinceId
        cityId
        suburbId
        zipCode
        contactNo
        createdBy
        createdDate
        modifiedBy
        modifiedDate
        
    }
  }
`;

export default updateMstCrmCustomer;