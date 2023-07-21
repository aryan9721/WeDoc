import gql from 'graphql-tag';

/* createMstFavourites mutation */
const createMstCrmCustomer = gql`
  mutation createMstCrmCustomer(
    $mstCrmCustomer: MstCrmCustomerInputType!
    
  ) {
    createMstCrmCustomer(
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

export default createMstCrmCustomer;