import gql from 'graphql-tag';

/* get mstCrmInvoices query */
const mstCrmInvoices = gql`
query mstCrmInvoices($page: ID, $size: ID)
{
    mstCrmInvoices(page:$page, size: $size)
    {
        totalPages
        count
        currentPage
        nextPage
        prevPage
        data{
            invoiceId
            invoiceNo
            invoiceDescription
            invoiceFooter
            companyId
            invoiceDate
            customerId
            quoteId
            amount
            vatamount
            totalAmount
            paymentDate
            paymentModeId
            paymentStatusId
            transactionId
            isActive
            createdBy
            createdDate
            modifiedBy
            modifiedDate
            
        }
    }
}
`;

export default mstCrmInvoices;
