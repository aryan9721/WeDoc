import gql from 'graphql-tag';

/* get badges query */
const PRODUCTS_LIST = gql`
  query productData( 
    $productName: String,
    $productId: Int,
    $categoryId: Int,
    $domainCategoryIds: String,
    $status: Boolean,
    $salesTypeId: Int,
    $scopeId: Int,
    $userId: Int,
    $companyId: Int,
    $page: Int,
    $size: Int) {
    getPrdProductList(productName: $productName,
        productId: $productId,
        categoryId: $categoryId,
        domainCategoryIds: $domainCategoryIds,
        status: $status,
        salesTypeId:  $salesTypeId,
        scopeId: $scopeId,
        userId: $userId,  
        companyId: $companyId, 
        page: $page, 
        size: $size) 
        {
            count,
            currentPage,    
            message,
            nextPage,
            prevPage,
            success,
            totalPages,
            result{
              activeText,
              categoryID,
              categoryName,
              description,
              documentName,
              documentPath,
              isActive,
              ratingScore,
              productID,
              productImage,
              productName,
              productNumber,
              salesTypeId,
              typeID,
              inventory,
              clickCount,
              viewCount
              unitCost,
              length, 
              width, 
              height, 
              volume, 
              weight, 
              googleSchema,
              domainCategory, 
              startDate,
              endDate,
              companyID,
              mapProductImages{        
                imageName,
                imagePath
              }   
              prdBid{
                bidId,
                createdDate,
                bidAmount,
                userId
              }
              prdHire{
                hireId, 
                userId,
                isAccepted,
                fromDate, 
                toDate,
                returned
              }
        }
    }
  }
`;

export default PRODUCTS_LIST;
