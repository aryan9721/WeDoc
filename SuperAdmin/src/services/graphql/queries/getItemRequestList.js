import gql from 'graphql-tag';

/* get badges query */
const getItemRequestList = gql`
  query getItemRequestList( 
    $itemRequestTitle: String
    $categoryIds: String
    $provinceIds: String
    $cityIds: String
    $suburbIds: String
    $page: Int!
    
    $size: Int!) {
            getItemRequestList
        (
            itemRequestTitle: $itemRequestTitle,
            categoryIds: $categoryIds,
            provinceIds: $provinceIds,
            cityIds: $cityIds,
            suburbIds:  $suburbIds,
            page: $page, 
            size: $size
        ) {
            count,
            currentPage,
            message,
            nextPage,
            prevPage,
            result{
            city,
            cityID,
            itemCategory,
            itemCategoryID,
            itemImagePath,
            itemRequestDate,
            itemRequestDescription,
            itemRequestID,
            itemRequestStatus,
            itemRequestStatusID,
            itemRequestTitle,
            mapItemRequestUploadDto{
                createdBy,
                createdDate,
                irUploadId,
                isActive,
                itemRequestId,
                modifiedBy,
                modifiedDate,
                thumbNailPath,
                uploadPath
            },
            province,
            provinceID,
            selectedCompany,
            suburb,
            suburbID,
            userID,
            userName
            },
            success,
            totalPages
        
            
        }
    }
`;

export default getItemRequestList;
