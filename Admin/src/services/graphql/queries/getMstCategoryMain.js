import gql from 'graphql-tag';

/* get getMstCategoryMain query */
const getMstCategoryMain = gql`
  query {
    getMstCategoryMain

        {
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

export default getMstCategoryMain;
