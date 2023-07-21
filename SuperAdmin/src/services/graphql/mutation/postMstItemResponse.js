import gql from 'graphql-tag';

/* createMstFavourites mutation */
const postMstItemResponse = gql`
mutation postMstItemResponse(
    $mstItemResponse: MstItemResponseInputType!
    $files: [Upload]
    
  ) {
    postMstItemResponse(
        mstItemResponse: $mstItemResponse
        files: $files
    ){
      itemResponseId
    }
  }
  `;

export default postMstItemResponse;