import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import jwt from "jsonwebtoken";
import { useToasts } from "react-toast-notifications";
import "./Index.css";
import {
  Card,
  Alert,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Collapse,
  Row,
  Spinner,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { isEmpty, map } from "lodash";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

// Rating Plugin
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Import data
import { discountData, colorData } from "../../../common/data";

//Import actions
import {
  getProducts,
  getProductsSuccess,
} from "../../../store/e-commerce/actions";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
//import Skeleton from '@material-ui/core/Skeleton';
import {
  PRODUCTS_LIST,
  getMstCategoryMain,
  getMstCategoryByParentId,
} from "../../../services/graphql";

import {
  postPrdShoppingCartOptimized,
  CreatePrdBid,
  CreatePrdHire,
} from "../../../services/graphql";
// import DatePicker from 'react-datepicker'
import { PRODUCT_IMAGE_URL } from "../../../common/config";
import loader from "../../../assets/images/loader.gif";
import httpLink from "../../../Api/http";

const EcommerceProducts = (props) => {
  const { products, history, onGetProducts } = props;
  const [def, setdef] = useState("");
  const starStyle = {};
  const [fetchProductList, { loading: productLoading, data: pData }] =
    useLazyQuery(PRODUCTS_LIST, {
      fetchPolicy: "network-only",
    });
  const [fetchCategoryMain, { data: categoryMainData }] =
    useLazyQuery(getMstCategoryMain);
  const [quantity, setQuantity] = useState(1);
  const [productQuantity, setproductQuantity] = useState("");
  const [cartType, setcartType] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [fetchSubCategoryMain, { data: subCategoryMainData }] = useLazyQuery(
    getMstCategoryByParentId,
    {
      fetchPolicy: "network-only",
    }
  );
  const cache = new InMemoryCache({
    addTypename: false,
  });
  const client = new ApolloClient({
    link: httpLink,
    cache,
  });
  const { addToast } = useToasts();
  const [
    productAddtoCart,
    { loading: productAddtoCartLoading, data: productAddtoCartData },
  ] = useMutation(postPrdShoppingCartOptimized);

  const [
    productBidCreate,
    { loading: productBidLoading, data: productBidData },
  ] = useMutation(CreatePrdBid);
  const [
    productHireCreate,
    { loading: productHireLoading, data: productHireData },
  ] = useMutation(CreatePrdHire);

  useEffect(() => {
    if (productBidData && productBidData.CreatePrdBid) {
      if (productBidData.CreatePrdBid.success) {
        console(productBidData.CreatePrdBid.message);
      }
    }
  }, [CreatePrdBid]);

  useEffect(() => {
    if (productHireData && productHireData.CreatePrdHire) {
      if (productHireData.CreatePrdHire.success) {
        console(productHireData.CreatePrdHire.message);
      }
    }
  }, [CreatePrdBid]);
  const addToCart = (productID, type, salesTypeId) => {
    setproductQuantity(productID);
    setcartType(type);
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const startDateFormated = startDate.find(
      (item) => item.index === productID
    );
    let invaild = false;
    const endDateFormated = endDate.find((item) => item.index === productID);
    console.log(invaild, startDateFormated, endDateFormated);
    if (salesTypeId === 3) {
      if (typeof startDateFormated === "undefined") {
        setVaildStartDate(true);
        invaild = true;
      }
      if (typeof startDateFormated === "undefined") {
        setVaildEndDate(true);
        invaild = true;
      }

      if (invaild) {
        addToast("startDate and endDate not selected", { appearance: "error" });
        return;
      }
    }
    productAddtoCart({
      variables: {
        prdShoppingCart: {
          productId: productID,
          dateCreated: dateFormated,
          quantity: quantity,
          fromDate: salesTypeId === 3 ? startDateFormated.date : dateFormated,
          endDate: salesTypeId === 3 ? endDateFormated.date : dateFormated,
          userId: 0,
        },
      },
    });
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const [isFilterSizesOpen, setIsFilterSizesOpen] = useState(true);

  const filtersizestoggle = () => setIsFilterSizesOpen(!isFilterSizesOpen);

  const [isFilterProductPurchaseType, setIsFilterProductPurchaseType] =
    useState(true);

  const productPurchaseType = () =>
    setIsFilterProductPurchaseType(!isFilterProductPurchaseType);

  const [isFilterProductScore, setIsFilterProductScore] = useState(true);

  const productScore = () => setIsFilterProductScore(!isFilterProductScore);

  const [isFilterProductType, setIsFilterProductType] = useState(true);

  const productType = () => setIsFilterProductType(!isFilterProductType);

  const [isFilterProductStatus, setIsFilterProductStatus] = useState(true);

  const productStatus = () => setIsFilterProductStatus(!isFilterProductStatus);

  const [isFilterProductRatingOpen, setIsFilterRatingsOpen] = useState(true);
  const [productSalesTypeFilter, setProductSalesTypeFilter] = useState(null);

  const filterratingtoggle = () =>
    setIsFilterRatingsOpen(!isFilterProductRatingOpen);

  const [isFilterProductDiscountOpen, setIsFilterDiscountOpen] =
    useState(false);

  const filterdiscountstoggle = () =>
    setIsFilterDiscountOpen(!isFilterProductDiscountOpen);

  const [productList, setProductList] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoryMain, setCategoryMain] = useState([]);
  const [subCategoryMain, setSubCategoryMain] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categoryData, setCategoryData] = useState({
    parentId: null,
    categoryId: null,
  });

  const [startDate, setStartDate] = useState([{}]);
  const [endDate, setEndDate] = useState([{}]);
  const [vaildStartDate, setVaildStartDate] = useState(false);
  const [vaildEndDate, setVaildEndDate] = useState(false);
  const [diffDays, setDiffDays] = useState(0);
  const [increaseBidAmount, setIncreaseBidAmount] = useState(100);
  const [hide10, setHide10] = useState(true);
  const [productScopeId, setProductScopeId] = useState(null);
  const [productTypeId, setProductTypeId] = useState(null);
  const [productStatusId, setProductStatusId] = useState(null);

  const handleIncreaseBidAmount = (e, product) => {
    e.preventDefault();
    const lastBid = product.prdBid
      ? product.prdBid.slice().sort((a, b) => {
          if (!a?.bidId) return -1;
          if (!b?.bidId) return 1;
          return b.bidId - a.bidId;
        })[0]
      : null;
    setproductQuantity(product.productID);
    const newAmount = increaseBidAmount + (lastBid?.bidAmount || 0) * 0.1;
    setIncreaseBidAmount(newAmount);
    // handleBidNow(newAmount)
    setHide10(false);
    setTimeout(() => setHide10(true), 3000);
  };
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState([]);

  const [filters, setFilters] = useState({
    discount: [],
    color: [],
    price: { min: 0, max: 500 },
  });
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(10);

  useEffect(() => {
    //setProductList(products);
    onGetProducts();
    setDiscountDataList(discountData);
  }, [onGetProducts, products]);

  useEffect(() => {
    if (categoryMainData && categoryMainData.getMstCategoryMain) {
      const catMainData = categoryMainData.getMstCategoryMain.result || [];
      setCategoryMain(catMainData);
    }
  }, [categoryMainData]);

  let catlist = [];
  useEffect(() => {
    const fetchSubCategory = async (status) => {
      const data = await client
        .query({
          query: getMstCategoryByParentId,
          variables: { id: status },
        })
        .then((result) => result.data.getMstCategoryByParentId.result);
      catlist.push({ id: status, data: data });
      setSubCategoryMain(catlist);
    };

    (async () => {
      Promise.all(
        categoryMain.map((status) => {
          return fetchSubCategory(status.categoryId);
        })
      );
    })();
  }, [categoryMain, fetchSubCategoryMain]);

  useEffect(() => {
    if (subCategoryMainData && subCategoryMainData.getMstCategoryByParentId) {
      const data = subCategoryMainData.getMstCategoryByParentId.result;
      const tempData = subCategoryMain;
      const categoryId = data.categoryId;
      tempData.push({ data });
      setSubCategoryMain(data);
    }
  }, [subCategoryMainData]);

  useEffect(() => {
    if (
      productAddtoCartData &&
      productAddtoCartData.postPrdShoppingCartOptimized
    ) {
      if (productAddtoCartData.postPrdShoppingCartOptimized.success) {
        const count = localStorage.getItem("cartCount");
        localStorage.setItem("cartCount", JSON.stringify(Number(count) + 1));
        document.getElementById("cartCountNumber").textContent = count;
        addToast("Product Added Cart Successfully", { appearance: "success" });
        if (cartType === "buy") {
          history.push("/ecommerce-cart");
        }
      }
    }
  }, [productAddtoCartData]);

  const selectCategoryFilter = (parentCatId, subCateId) => {
    //console.log(parentCatId)
    setActiveCategory(subCateId);
    setPage(1);
    setCategoryData({ parentId: parentCatId, categoryId: subCateId });
  };

  useEffect(() => {
    fetchCategoryMain();
  }, [fetchCategoryMain]);

  useEffect(() => {
    if (pData && pData.getPrdProductList) {
      setProductsData(pData.getPrdProductList);
      setProductList(pData.getPrdProductList.result);
    }
  }, [pData]);

  useEffect(() => {
    fetchProductList({
      variables: {
        productName: null,
        productId: null,
        categoryId: categoryData.categoryId,
        domainCategoryIds:
          categoryData.parentId !== null
            ? categoryData.parentId.toString()
            : categoryData.parentId,
        status: productStatusId,
        salesTypeId: productSalesTypeFilter,
        scopeId: productScopeId,
        userId: null,
        companyId: null,
        page: page,
        size: totalPage,
        typeId: productTypeId,
      },
    });

    // if (!isEmpty(products)) setProductList(products);
  }, [
    fetchProductList,
    page,
    categoryData,
    productSalesTypeFilter,
    productStatusId,
    productScopeId,
    productTypeId,
    totalPage,
  ]);

  function countUP(prev_data_attr, productId) {
    if (productQuantity !== productId) {
      setQuantity(1);
    } else {
      setQuantity(Number(prev_data_attr) + 1);
    }
    setproductQuantity(productId);
  }

  function countDown(prev_data_attr, productId) {
    if (productQuantity !== productId) {
      setQuantity(1);
    } else {
      setQuantity(Number(prev_data_attr) - 1);
    }
    setproductQuantity(productId);
  }
  const onSelectDiscount = (e) => {
    const { value, checked } = e.target;
    const { discount } = filters;
    var existing = [...discount];
    if (checked) {
      existing = [...discount, value];
      setFilters({
        ...filters,
        discount: existing,
      });
    } else {
      const unCheckedItem = discount.find((item) => item === value);
      if (unCheckedItem) {
        existing = discount.filter((item) => item !== value);
      }
    }
    setFilters({
      ...filters,
      discount: existing,
    });
    // onFilterProducts(value, checked)
    let filteredProducts = productsData;
    if (checked && parseInt(value) === 0) {
      filteredProducts = productsData.filter((product) => product.offer < 10);
    } else if (checked && existing.length > 0) {
      filteredProducts = productsData.filter(
        (product) => product.offer >= Math.min(...existing)
      );
    }
    setProductList(filteredProducts);
  };

  const onUpdate = (render, handle, value) => {
    setProductList(
      productsData.filter(
        (product) =>
          product.newPrice >= value[0] && product.newPrice <= value[1]
      )
    );
  };

  /*
  on change rating checkbox method
  */
  const onChangeRating = (value) => {
    setProductList(productsData.filter((product) => product.rating >= value));
  };

  const onSelectRating = (value) => {
    setProductList(productsData.filter((product) => product.rating === value));
  };

  const onUncheckMark = () => {
    setProductList(productsData);
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
  var decodeJwt = jwt.decode(token);
  const handleBidNow = async (product, amount) => {
    productBidCreate({
      variables: {
        prdBid: {
          bidId: 0,
          userId: Number(decodeJwt.Id),
          productId: product.productID,
          bidAmount: amount || 0,
          bidApprovedMail: false,
          isAccepted: true,
          isActive: true,
          createdDate: null,
          modifiedBy: 0,
          modifiedDate: null,
        },
      },
    });
  };
  const handleHireNow = async (product) => {
    const lastHire =
      product.prdHire.length > 0
        ? product.prdHire.slice().sort((a, b) => {
            if (!a?.hireId) return -1;
            if (!b?.hireId) return 1;
            return b.hireId - a.hireId;
          })[0]
        : null;
    const startDateFormated = startDate.find(
      (item) => item.index === product.productID
    );
    const endDateFormated = endDate.find(
      (item) => item.index === product.productID
    );
    productHireCreate({
      variables: {
        prdHire: {
          hireId: lastHire?.hireId || 1,
          userId: null,
          productId: product.productID,
          returned: null,
          returnedDate: null,
          isAccepted: null,
          businessConfirmedReturned: null,
          businessConfirmedReturnedDate: null,
          clientConfirmedReturned: null,
          clientConfirmedReturnedDate: null,
          fromDate: startDateFormated.startDate,
          toDate: endDateFormated.endDate,
          mstProvinces: null,
        },
      },
    });
  };

  const formatPrice = (amount) => {
    if (amount) {
      return amount
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {errorMsg !== null && <Alert color="danger">{errorMsg}</Alert>}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product" />
          <Row>
            <Col lg="4" xl="3">
              <Card>
                <CardHeader className="bg-transparent border-bottom">
                  <h5 className="mb-0">Filters</h5>
                </CardHeader>

                <div className="p-4">
                  <h5 className="font-size-14 mb-3">Categories</h5>
                  {categoryMain.map((item, index) => (
                    <div
                      key={"_category_" + index}
                      className="custom-accordion"
                    >
                      <Link
                        to="#"
                        className="text-body fw-semibold pb-2 d-block"
                        onClick={toggle}
                      >
                        <i className="mdi mdi-chevron-up accor-down-icon text-primary me-1"></i>{" "}
                        {item.categoryName}
                      </Link>

                      <Collapse isOpen={isOpen}>
                        <SimpleBar style={{ maxHeight: "200px" }}>
                          <div className="table-responsive">
                            <div className="card p-2 border shadow-none">
                              <ul className="list-unstyled categories-list mb-0">
                                {subCategoryMain &&
                                  subCategoryMain.map((subitem, index) => (
                                    <>
                                      {subitem.id === item.categoryId
                                        ? subitem.data.map((cat, key) => (
                                            <li
                                              key={"_subCategory_" + key}
                                              onClick={() =>
                                                selectCategoryFilter(
                                                  item.categoryId,
                                                  cat.categoryId
                                                )
                                              }
                                              className={
                                                activeCategory ===
                                                cat.categoryId
                                                  ? "active"
                                                  : ""
                                              }
                                            >
                                              <Link to="#">
                                                <i className="mdi mdi-circle-medium me-1"></i>{" "}
                                                {cat.categoryName}
                                              </Link>
                                            </li>
                                          ))
                                        : ""}
                                    </>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </SimpleBar>
                      </Collapse>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-top">
                  <div>
                    <h5 className="font-size-14 mb-4">Price (R)</h5>
                    <br />
                    <Nouislider
                      range={{ min: 0, max: 600 }}
                      tooltips={true}
                      start={[100, 500]}
                      connect
                      onSlide={onUpdate}
                    />
                  </div>
                </div>
                <div className="custom-accordion">
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={filterratingtoggle}
                          className="text-dark d-block"
                        >
                          Customer Rating{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductRatingOpen}
                        id="filterprodductcolor-collapse"
                      >
                        <div className="mt-4">
                          <div className="form-check mt-2">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="productratingCheck1"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  onChangeRating(4);
                                } else {
                                  onUncheckMark(4);
                                }
                              }}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="productratingCheck1"
                            >
                              4 <i className="bx bx-star text-warning"></i> &
                              Above
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="productratingCheck2"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  onChangeRating(3);
                                } else {
                                  onUncheckMark(3);
                                }
                              }}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="productratingCheck2"
                            >
                              3 <i className="bx bx-star text-warning"></i> &
                              Above
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="productratingCheck3"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  onChangeRating(2);
                                } else {
                                  onUncheckMark(2);
                                }
                              }}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="productratingCheck3"
                            >
                              2 <i className="bx bx-star text-warning"></i> &
                              Above
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="productratingCheck4"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  onSelectRating(1);
                                } else {
                                  onUncheckMark(1);
                                }
                              }}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="productratingCheck4"
                            >
                              1 <i className="bx bx-star text-warning"></i>
                            </Label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>

                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={filterdiscountstoggle}
                          className="text-dark d-block"
                        >
                          Discount{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductDiscountOpen}
                        id="filterprodductcolor-collapse"
                      >
                        {discountData.map((discount, i) => (
                          <div
                            className="form-check mt-2"
                            key={"_discount_" + i}
                          >
                            <Input
                              type="checkbox"
                              value={discount.value}
                              className="form-check-input"
                              id={i}
                              onChange={onSelectDiscount}
                            />
                            <Label className="form-check-label" htmlFor={i}>
                              {discount.label}
                            </Label>
                          </div>
                        ))}
                      </Collapse>
                    </div>
                  </div>
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={productPurchaseType}
                          className="text-dark d-block"
                        >
                          Product Sales Type{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductPurchaseType}
                        id="filterProductPurchaseType-collapse"
                      >
                        <div className="mt-4">
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductSalesTypeFilter3"
                              className="form-check-input"
                              name="productSalesType"
                              value="hire"
                              // defaultChecked
                              // onChange={(e) => {
                              //   if (e.target.checked) {
                              //     onChangeRating(4);
                              //   } else {
                              //     onUncheckMark(4);
                              //   }
                              // }}
                              onChange={() => setProductSalesTypeFilter(3)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductSalesTypeFilter3"
                            >
                              Hire
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductSalesTypeFilter2"
                              className="form-check-input"
                              name="productSalesType"
                              value="bid"
                              // onChange={(e) => {
                              //   if (e.target.checked) {
                              //     onChangeRating(3);
                              //   } else {
                              //     onUncheckMark(3);
                              //   }
                              // }}
                              onChange={() => setProductSalesTypeFilter(2)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductSalesTypeFilter2"
                            >
                              Bid
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductSalesTypeFilter1"
                              className="form-check-input"
                              name="productSalesType"
                              value="purchase"
                              onChange={() => setProductSalesTypeFilter(1)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductSalesTypeFilter1"
                            >
                              Purchase
                            </Label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={productScore}
                          className="text-dark d-block"
                        >
                          Product Score{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductScore}
                        id="filterProductPurchaseType-collapse"
                      >
                        <div className="mt-4">
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductScopeId1"
                              className="form-check-input"
                              name="productScore"
                              value="normal"
                              onChange={() => setProductScopeId(1)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductScopeId1"
                            >
                              Normal
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductScopeId2"
                              className="form-check-input"
                              name="productScore"
                              value="special"
                              onChange={() => setProductScopeId(2)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductScopeId2"
                            >
                              Special
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductScopeId3"
                              className="form-check-input"
                              name="productScore"
                              value="feature"
                              onChange={() => setProductScopeId(3)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductScopeId3"
                            >
                              Fertured
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductScopeId4"
                              className="form-check-input"
                              name="productScore"
                              value="mostViewed"
                              onChange={() => setProductScopeId(4)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductScopeId4"
                            >
                              Most Viewed
                            </Label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={productType}
                          className="text-dark d-block"
                        >
                          Product Type{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductType}
                        id="filterProductPurchaseType-collapse"
                      >
                        <div className="mt-4">
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductTypeId1"
                              className="form-check-input"
                              name="productType"
                              value="physical"
                              onChange={() => setProductTypeId(1)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductTypeId1"
                            >
                              Physical
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductTypeId2"
                              className="form-check-input"
                              name="productType"
                              value="digital"
                              onChange={() => setProductTypeId(2)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductTypeId2"
                            >
                              Digital
                            </Label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-14 mb-0">
                        <Link
                          to="#"
                          onClick={productStatus}
                          className="text-dark d-block"
                        >
                          Product Status{" "}
                          <i className="mdi mdi-chevron-up float-end accor-down-icon"></i>
                        </Link>
                      </h5>
                      <Collapse
                        isOpen={isFilterProductStatus}
                        id="filterProductPurchaseType-collapse"
                      >
                        <div className="mt-4">
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductStatusId1"
                              className="form-check-input"
                              name="productStatus"
                              value="active"
                              onChange={() => setProductStatusId(2)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductStatusId1"
                            >
                              Active
                            </Label>
                          </div>
                          <div className="form-check mt-2">
                            <Input
                              type="radio"
                              id="ProductStatusId2"
                              className="form-check-input"
                              name="productStatus"
                              value="inactive"
                              onChange={() => setProductStatusId(1)}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="ProductStatusId2"
                            >
                              Inactive
                            </Label>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

            <Col lg="8" xl="9">
              <Card>
                <CardBody>
                  <div>
                    <Row>
                      <Col md="6">
                        <div>
                          <h5>Showing results</h5>
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-inline float-md-end">
                          <div className="search-box ml-2">
                            <div className="position-relative">
                              <Input
                                type="text"
                                className="orm-control bg-light border-light rounded"
                                placeholder="Search..."
                              />
                              <i className="mdi mdi-magnify search-icon"></i>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Nav
                      tabs
                      className="nav-tabs-custom mt-3 mb-2 ecommerce-sortby-list"
                    >
                      <NavItem>
                        <NavLink className="disabled fw-medium">
                          Sort by:
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="active">Popularity</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink>Newest</NavLink>{" "}
                      </NavItem>
                      <NavItem>
                        <NavLink>Discount</NavLink>
                      </NavItem>
                    </Nav>
                    <Row className="overflow-muted-text">
                      {isEmpty(productList) && productLoading && (
                        <Spinner className="m-5" color="primary" />
                      )}
                      {!isEmpty(productList) &&
                        productList.map((product, key) => (
                          <Col xl="4" sm="6" key={"_col_" + key}>
                            <div className="product-box product-box-scroll">
                              <div className="product-img pt-4 px-4">
                                {product.productNumber ? (
                                  <div className="product-ribbon badge bg-warning">
                                    {product.productNumber}
                                  </div>
                                ) : null}
                                {product.isOffer ? (
                                  <div className="product-ribbon badge bg-danger">
                                    {`-${product.productNumber}%`}
                                  </div>
                                ) : null}
                                <div className="product-wishlist">
                                  <Link to="#">
                                    <i className="mdi mdi-heart-outline"></i>
                                  </Link>
                                </div>
                                <img
                                  src={`${PRODUCT_IMAGE_URL}${product.productImage}`}
                                  alt=""
                                  onClick={() =>
                                    history.push(
                                      `/ecommerce-products/${product.productID}`,
                                      {
                                        productDetails: {
                                          product: product,
                                        },
                                      }
                                    )
                                  }
                                  className="img-fluid mx-auto d-block"
                                />
                              </div>

                              <div className="text-center  product-content p-4">
                                <h6
                                  className="mb-1 text-muted-center"
                                  onClick={() =>
                                    history.push(
                                      `/ecommerce-products/${product.productID}`,
                                      {
                                        productDetails: {
                                          product: product,
                                        },
                                      }
                                    )
                                  }
                                >
                                  {product.productName}{" "}
                                </h6>
                                <p
                                  onClick={() =>
                                    history.push(
                                      `/ecommerce-products/${product.productID}`,
                                      {
                                        productDetails: {
                                          product: product,
                                        },
                                      }
                                    )
                                  }
                                >
                                  {product.categoryName}{" "}
                                </p>
                                <p
                                  className="text-muted text-complement font-size-12"
                                  onClick={() =>
                                    history.push(
                                      `/ecommerce-products/${product.productID}`,
                                      {
                                        productDetails: {
                                          product: product,
                                        },
                                      }
                                    )
                                  }
                                >
                                  {product.description}
                                </p>

                                <Col className="text-muted my-2">
                                  <b>R</b>
                                  {product.unitCost} &nbsp;
                                  <strike>
                                    <b>R</b>
                                    {product.viewCount}
                                  </strike>
                                </Col>

                                <Col style={{ width: "180px" }}>
                                  {product.salesTypeId === 1 ? (
                                    <InputGroup className="input-group-1">
                                      <InputGroupAddon addonType="prepend">
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            countUP(
                                              quantity,
                                              product.productID
                                            );
                                          }}
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      <Input
                                        type="text"
                                        className="text-center"
                                        value={
                                          productQuantity === product.productID
                                            ? quantity
                                            : 1
                                        }
                                        name="demo_vertical"
                                        readOnly
                                      />
                                      <InputGroupAddon addonType="append">
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            countDown(
                                              quantity,
                                              product.productID
                                            );
                                          }}
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  ) : (
                                    <>
                                      <Col className="date_picker">
                                        <DatePicker
                                          className="date__pick"
                                          placeholderText="Start Date"
                                          selected={
                                            startDate.find(
                                              (item) =>
                                                item.index === product.productID
                                            )?.date
                                          }
                                          onChange={(date) => {
                                            setVaildStartDate(false);
                                            setStartDate([
                                              ...startDate,
                                              {
                                                index: product.productID,
                                                date: date,
                                              },
                                            ]);
                                          }}
                                          popperClassName="hire-date-range"
                                          popperPlacement="top-end"
                                          minDate={new Date()}
                                          maxDate={
                                            endDate.find(
                                              (item) =>
                                                item.index === product.productID
                                            )?.date
                                          }
                                        />
                                        {vaildStartDate && (
                                          <span className="text-primary text-vaild">
                                            Enter Start Date
                                          </span>
                                        )}
                                        `
                                        <DatePicker
                                          className="date__pick"
                                          placeholderText="End Date"
                                          selected={
                                            endDate.find(
                                              (item) =>
                                                item.index === product.productID
                                            )?.date
                                          }
                                          onChange={(date) => {
                                            setVaildEndDate(false);
                                            setEndDate([
                                              ...endDate,
                                              {
                                                index: product.productID,
                                                date: date,
                                              },
                                            ]);
                                          }}
                                          popperClassName="hire-date-range"
                                          popperPlacement="top-end"
                                          minDate={
                                            startDate.find(
                                              (item) =>
                                                item.index === product.productID
                                            )?.date || new Date()
                                          }
                                        />
                                        {vaildEndDate && (
                                          <span className="text-primary text-vaild">
                                            Enter End Date
                                          </span>
                                        )}
                                        {diffDays ? (
                                          <p className="product-hire-detail">{`Days: ${diffDays}; Total: R${
                                            product?.unitCost * diffDays
                                          }`}</p>
                                        ) : null}
                                      </Col>
                                    </>
                                  )}
                                </Col>

                                <Col className="p-2 mx-3">
                                  <RatingTooltip
                                    max={5}
                                    onChange={(rate) => {
                                      setdef(rate);
                                    }}
                                    ActiveComponent={
                                      <i
                                        key={"active_1"}
                                        className="mdi mdi-star text-primary"
                                        style={starStyle}
                                      />
                                    }
                                    InActiveComponent={
                                      <i
                                        key={"active_01"}
                                        className="mdi mdi-star-outline text-muted"
                                        style={starStyle}
                                      />
                                    }
                                  />
                                </Col>
                                {product.salesTypeId === 2 && (
                                  <div className="col">
                                    <div className="position-relative">
                                      <div className="product-bid-ammount-form-box bid__now">
                                        <input
                                          className="input__bid"
                                          type="text"
                                          name="bid_ammount"
                                          placeholder="Enter Bid Amount"
                                          value={
                                            productQuantity ===
                                            product.productID
                                              ? `R${formatPrice(
                                                  increaseBidAmount
                                                )}`
                                              : 100
                                          }
                                          readOnly
                                        />
                                        <button
                                          className=" hammer__bid"
                                          color="primary"
                                          value=""
                                          aria-label="Submit Bid"
                                          onClick={(e) =>
                                            handleIncreaseBidAmount(e, product)
                                          }
                                        >
                                          {/* <i className="icon-bid"></i> */}
                                          <i className="mdi mdi-hammer icon__bid"></i>
                                          {/* increaseBidAmounts */}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <Row>
                                  <Col className="product-button-hire">
                                    {product.salesTypeId === 1 && (
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          addToCart(
                                            product.productID,
                                            "buy",
                                            product.salesTypeId
                                          )
                                        }
                                        disabled={productAddtoCartLoading}
                                        className="btn-soft-primary waves-effect buy-now-men waves-light button-hire-now "
                                      >
                                        Buy Now
                                      </Button>
                                    )}

                                    {product.salesTypeId === 2 && (
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          handleBidNow(
                                            product,
                                            increaseBidAmount
                                          )
                                        }
                                        className="btn-soft-primary waves-effect waves-light bid__but"
                                      >
                                        Bid Now
                                      </Button>
                                    )}
                                    {product.salesTypeId === 3 && (
                                      <Button
                                        color="primary"
                                        disabled={productHireLoading}
                                        onClick={() => handleHireNow(product)}
                                        className="btn-soft-primary waves-effect waves-light button-hire-now"
                                      >
                                        Hire Now
                                      </Button>
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        addToCart(
                                          product.productID,
                                          "cart",
                                          product.salesTypeId
                                        )
                                      }
                                      className="btn-soft-primary waves-effect waves-light button-hire-now"
                                    >
                                      {productAddtoCartLoading &&
                                        productQuantity === product.productID &&
                                        cartType === "cart" && (
                                          <Spinner
                                            className="m-1"
                                            color="primary"
                                          />
                                        )}
                                      Add Cart{" "}
                                    </Button>
                                  </Col>
                                </Row>

                                {/* <h5 className="mt-3 mb-0">
                                  <span className="text-muted me-2">
                                    <del>${product.oldPrice}</del>
                                  </span>
                                  <b>${product.newPrice}</b>
                                </h5> */}

                                {/* <ul className="list-inline mb-0 text-muted product-color">
                                  <li className="list-inline-item">
                                    Colors :
                                  </li>
                                  {!isEmpty(product.colors) && product.colors.map((pcolor, colorkey) => (
                                    <React.Fragment key={key + "_color_" + colorkey}>
                                      <li className="list-inline-item">
                                        <i className={"mdi mdi-circle text-" + pcolor}></i>
                                      </li>
                                    </React.Fragment>
                                  ))}
                                </ul> */}
                              </div>
                            </div>
                          </Col>
                        ))}
                    </Row>
                    <Row className="mt-4">
                      <Col sm="6">
                        <div>
                          <p className="mb-sm-0">
                            Page {productsData.currentPage} of{" "}
                            {productsData.totalPages}
                          </p>
                        </div>
                      </Col>
                      <Col sm="6">
                        <div className="float-sm-end">
                          <Pagination className="pagination pagination-rounded mb-sm-0">
                            <PaginationItem disabled={page === 1}>
                              <PaginationLink
                                previous
                                to="#"
                                onClick={() => handlePageClick(page - 1)}
                              />
                            </PaginationItem>
                            {map(Array(totalPage), (item, i) => (
                              <PaginationItem
                                active={i + 1 === page}
                                key={"_pagination_" + i}
                              >
                                <PaginationLink
                                  onClick={() => handlePageClick(i + 1)}
                                  to="#"
                                >
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            ))}
                            <PaginationItem disabled={page === totalPage}>
                              <PaginationLink
                                next
                                to="#"
                                onClick={() => handlePageClick(page + 1)}
                              />
                            </PaginationItem>
                          </Pagination>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  products: state.ecommerce.products,
});

const mapDispatchToProps = (dispatch) => ({
  onGetProducts: () => dispatch(getProducts()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceProducts));
