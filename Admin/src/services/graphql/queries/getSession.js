
  import gql from 'graphql-tag';

  /* get getMstCategoryByParentId query */
  const getSession = gql`
  query getSession($id: Int){
    getSession(id:$id){
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result{
          domain,
          expires,
          sessionContractLogin,
          sessionKeyContractLogin,
          sessionKeyLogin,
          sessionLogin
        }
       }
     }
  `;
  
  export default getSession;
  