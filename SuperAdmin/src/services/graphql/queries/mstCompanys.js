import gql from 'graphql-tag';

/* get getMstCategoryByParentId query */
const mstCompanys = gql`
query mstCompanys($page: ID, $size: ID)
{
    mstCompanys(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            beestatusId,
    companyId,
    companyName,
    companyPercent,
    companyStatusId,
    createdBy,
    createdDate,
    crmcolorCode,
    crmInvoiceFooter,
    crmInvoiceHeader,
    crmQuoteFooter,
    crmQuoteHeader,
    description,
    directorsCount,
    domainUrl,
    email,
    featured,
    franchiseeId,
    helpDeskNumber,
    logoPath,
    mainBusinessUserId,
    modifiedBy,
    modifiedDate,
    payFastMerchantId,
    payFastMerchantKey,
    payGateMerchantId,
    payGateMerchantKey,
    payPalMerchantId,
    payPalMerchantKey,
    phone,
    serviceTax,
    vatnumber,
    webSite
           
        }
    }
}
`;

export default mstCompanys;
