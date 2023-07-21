import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getSuburb = gql`

query {
    getSuburb{
       count,
       currentPage,
       message,
       nextPage,
       prevPage,
       success,
       totalPages,
       result{
         cityId,
         createdBy,
         createdDate,
         isActive,
         modifiedBy,
         modifiedDate,
         suburbId,
         suburbName
       }
     }
   }
   `;
  
   export default getSuburb;