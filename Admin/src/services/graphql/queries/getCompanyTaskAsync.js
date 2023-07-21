import gql from 'graphql-tag';

/* get getCompanyTaskAsync query */
const getCompanyTaskAsync = gql`
query getCompanyTaskAsync($page: Int!, $size: Int!)
{
    getCompanyTaskAsync(page:$page, size: $size)
    {
    count,
    currentPage,
    message,
    nextPage,
    prevPage,
    success,
    totalPages,
    result {
       
            compTaskId
            taskId
            companyId
            completed
            completionDate
            createdBy
            createdDate
            modifiedBy
            modifiedDate
            company{
                companyId
                companyName
                logoPath
                description
                serviceTax
                vatnumber
                phone
                webSite
                email
                helpDeskNumber
                companyStatusId
                beestatusId
                directorsCount
                companyPercent
                payFastMerchantId
                payFastMerchantKey
                franchiseeId
                domainUrl
                mainBusinessUserId
                crmcolorCode
                crmQuoteHeader
                crmQuoteFooter
                crmInvoiceHeader
                crmInvoiceFooter
                featured: Boolean
                payGateMerchantId
                payGateMerchantKey
                payPalMerchantId
                payPalMerchantKey
                createdBy
                createdDate
                modifiedBy
                modifiedDate
              
            }
            task{
             
                taskId
                taskName
                taskDescription
                percentage
                sortOrder
                isActive
                createdBy
                createdDate
                modifiedBy
                modifiedDate
                
            }
        }
     }
   }
`;

export default getCompanyTaskAsync;
