import gql from 'graphql-tag';

/* get getCompanyTaskAsync query */
const getRatingList = gql`
query getRatingList(
    $key: Int
    $keyType: Int
    $userId: Int
    $documentPath: String
    $page: Int
    $size: Int
)
{
    getRatingList(
        key: $key
        keyType: $keyType
        userId: $userId
        documentPath: $documentPath
        page:$page, 
        size: $size
        )
    {
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result{
           mST_RatingID,
           title,
           imagePath
           review,
           name,
           ratingScore,
           dateofReview
           reviewType
           key
           keyType
          
        }
     }
   }
`;

export default getRatingList;
