import gql from "graphql-tag";

/* createMstFavourites mutation */
const createMstEFlyers = gql`
  mutation createMstEFlyers($mstEFlyers: MstEFlyersInputType!) {
    createMstEFlyers(mstEFlyers: $mstEFlyers) {
      categoryId
      companyId
      createdBy
      createdDate
      description
      efmid
      endDate
      isMenu
      modifiedBy
      modifiedDate
      startDate
      statusId
      title
    }
  }
`;
export default createMstEFlyers;
