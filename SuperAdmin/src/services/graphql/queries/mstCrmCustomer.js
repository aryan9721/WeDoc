import gql from "graphql-tag";

/* get mstCrmCustomer query */
const mstCrmCustomer = gql`
  query mstCrmCustomer($id: Int) {
    mstCrmCustomer(id: $id) {
      cityId
      companyId
      companyName
      contactNo
      countryId
      createdBy
      createdDate
      customerId
      email
      firstName
      gender
      lastName
      modifiedBy
      modifiedDate
      provinceId
      streetAddress
      suburbId
      userId
      zipCode
    }
  }
`;

export default mstCrmCustomer;
