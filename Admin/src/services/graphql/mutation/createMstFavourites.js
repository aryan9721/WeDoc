
import gql from 'graphql-tag';

/* createMstFavourites mutation */
const createMstFavourites = gql`
  mutation createMstFavourites(
    $mstFavourites: MstFavouritesInputType!
    
  ) {
    createMstFavourites(
        mstFavourites: $mstFavourites
    ) {
        mstFavouriteId
    }
  }
`;

export default createMstFavourites;
