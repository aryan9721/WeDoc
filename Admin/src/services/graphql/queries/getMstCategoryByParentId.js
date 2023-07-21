import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getMstCategoryByParentId = gql`
query getMstCategoryByParentId($id: Int){
    getMstCategoryByParentId(id:$id){
       count,
       currentPage,
       message,
       nextPage,
       prevPage,
       success,
       totalPages,
       result{
         categoryIcon,
         categoryId,
         categoryName,
         categoryThumbNailIcon,
         createdBy,
         createdDate,
         isActive,
         isCategory,
         isMainCategory,
         isMenuAllowed,
         modifiedBy,
         modifiedDate,
         parentCategoryId,
         timeDelayException
       }
     }
   }
`;

export default getMstCategoryByParentId;
