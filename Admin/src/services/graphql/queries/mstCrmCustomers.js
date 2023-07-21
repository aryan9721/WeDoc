import gql from "graphql-tag";

/* get mstCrmCustomer query */
const mstCrmCustomers = gql`
  query mstCrmCustomers($page: ID, $size: ID) {
    mstCrmCustomers(page: $page, size: $size) {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
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
  }
`;

export default mstCrmCustomers;
