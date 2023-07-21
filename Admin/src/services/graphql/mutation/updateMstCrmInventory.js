import gql from "graphql-tag";

/* sign up mutation */
const updateMstCrmInventory = gql`
  mutation {
    updateMstCrmInventory(
      mstCrmInventory: {
        companyId: 2
        createdBy: 2
        createdDate: "2016-01-06T22:41:30.717"
        inventoryDescription: "Door of BMW"
        inventoryId: 5
        inventoryName: "Door of BMW"
        inventoryTypeId: 1
        isActive: true
        modifiedBy: null
        modifiedDate: null
        officeDescription: "Door of BMW"
        quantity: 2500
      }
    ) {
      inventoryId
    }
  }
`;

export default updateMstCrmInventory;
