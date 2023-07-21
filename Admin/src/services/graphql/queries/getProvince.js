import gql from 'graphql-tag';

/* get getCity query */
const getProvince = gql`
query {
    getProvince{
       count,
       currentPage,
       message,
       nextPage,
       prevPage,
       success,
       totalPages,
       result{
         countryId,
         createdBy,
         createdDate,
         isActive,
         modifiedBy,
         modifiedDate,
         provinceId,
         provinceName
       }
     }
   }
   `;

   export default getProvince;