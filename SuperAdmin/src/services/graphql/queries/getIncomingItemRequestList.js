import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getIncomingItemRequestList = gql`
{
    getIncomingItemRequestList(
       itemRequestTitle: null,
       categoryIds: null,
       provinceIds: null,
       cityIds: null
       suburbIds: null
       page: 1
       size: 10
   ){
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

export default getIncomingItemRequestList;