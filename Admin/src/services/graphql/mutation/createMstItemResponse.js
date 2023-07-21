import gql from 'graphql-tag';

/* createMstFavourites mutation */
const createMstItemResponse = gql`
mutation createMstItemResponse(
    $mstItemResponse: MstItemResponseInputType!
    $files: [Upload]
    
  ) {
    createMstItemResponse(
        mstItemResponse: $mstItemResponse
        files: $files
    ){
      itemResponseId
    }
  }
  `;

export default createMstItemResponse;