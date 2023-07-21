import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const getCompanyAuditLog = gql`
query getCompanyAuditLog($page: Int!, $size: Int!)
{
    getCompanyAuditLog(page:$page, size: $size)
    {
        count,
        currentPage,
        message,
        nextPage,
        prevPage,
        success,
        totalPages,
        result {
            auditLogId
            companyId
            auditLog
            auditDate
            userId
            createdBy
            createdDate
            mapUsers{
                userID
                email 
                firstName 
                lastName
                userProfileImage
                userProfileThumbNailImage
            }
        }
    }
}
`;

export default getCompanyAuditLog;
