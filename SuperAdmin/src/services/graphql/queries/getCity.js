
import gql from 'graphql-tag';

/* get getCity query */
const getCity = gql`
query {
    getCity{
       count,
       currentPage,
       message,
       nextPage,
       prevPage,
       success,
       totalPages,
       result{
         cityId,
         cityName,
         createdBy,
         createdDate,
         isActive,
         modifiedBy,
         modifiedDate,
         provinceId
       }
     }
   }
   `;

export default getCity;