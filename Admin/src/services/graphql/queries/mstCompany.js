import gql from "graphql-tag";

/* get mstCrmCustomer query */
const mstCompany = gql`
  query mstCompany($id: Int) {
    mstCompany(id: $id) {
        companyId
        companyName
        companyStatus{
            companyStatusId
            statusName
            isActive
            createdBy
        }
    }
  }
`;

export default mstCompany;
