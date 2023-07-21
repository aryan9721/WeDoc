import gql from 'graphql-tag';

/* createMstCrmInventory mutation */
const createMstCrmInventory = gql`
  mutation createMstCrmInventory(
    $mstCrmInventory: MstCrmInventoryInputType!
    
  ) {
    createMstCrmInventory(
      mstCrmInventory: $mstCrmInventory
    ) {
      inventoryId
      companyId
      createdBy
      createdDate
      inventoryDescription
      inventoryName
      inventoryTypeId
      isActive
      modifiedBy
      modifiedDate
      officeDescription
      quantity
        
    }
   
  }
`;

export default createMstCrmInventory;