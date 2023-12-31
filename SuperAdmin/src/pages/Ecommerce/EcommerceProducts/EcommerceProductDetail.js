import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Input,
  TabPane,
  Table,
  InputGroup,
  InputGroupAddon,
  Alert,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";
import { PRODUCT_IMAGE_URL } from "../../../common/config";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//Import actions
import { getProductDetail } from "../../../store/actions";
import Reviews from "./Reviews";
import { useMutation } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { postPrdShoppingCartOptimized } from "../../../services/graphql";



const EcommerceProductDetail = (props) => {
  const {
    product,
    match: { params },
    onGetProductDetail,
  } = props;
  let { productDetails } = props.location.state || {};

  const productNew = productDetails.product;
  const [activeTab, setActiveTab] = useState("1");
  const [activeDescriptionTab, setDescriptionActiveTab] =
    useState("specifications");
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);
  // Api Calling

  const [
    productAddtoCart,
    { loading: productAddtoCartLoading, data: productAddtoCartData },
  ] = useMutation(postPrdShoppingCartOptimized);

  useEffect(() => {
    if (
      productAddtoCartData &&
      productAddtoCartData.postPrdShoppingCartOptimized
    ) {
      setCartSuccess(true);
    } else {
    }
  }, [productAddtoCartData]);

  useEffect(() => {
    if (params && params.id) {
      onGetProductDetail(params.id);
    } else {
      onGetProductDetail(1);
    }
  }, [onGetProductDetail, params]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggledescription = (tab) => {
    if (activeDescriptionTab !== tab) {
      setDescriptionActiveTab(tab);
    }
  };

  const imageShow = (img, id) => {
    const expandImg = document.getElementById("expandedImg" + id);
    expandImg.src = `${PRODUCT_IMAGE_URL}img`;
  };

  const addToCart = (productID) => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    productAddtoCart({
      variables: {
        prdShoppingCart: {
          productId: productID,
          dateCreated: dateFormated,
          quantity: quantity,
          fromDate: dateFormated,
          endDate: dateFormated,
          userId: 0,
        },
      },
    });
  };

  function countUP(prev_data_attr) {
    setQuantity(Number(prev_data_attr) + 1);
  }

  function countDown(prev_data_attr) {
    setQuantity(Number(prev_data_attr) - 1);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {cartSuccess && (
            <Alert color="success">Product add to cart successFully</Alert>
          )}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product Detail" />
          {!isEmpty(productNew) && (
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl="5">
                        <div className="product-detail">
                          <Row>
                            <Col xs="3">
                              <Nav className="flex-column" pills>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => {
                                      toggleTab("1");
                                    }}
                                  >
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      alt=""
                                      onClick={() => {
                                        imageShow(productNew.productImage, 1);
                                      }}
                                      className="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "2",
                                    })}
                                    onClick={() => {
                                      toggleTab("2");
                                    }}
                                  >
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      alt=""
                                      onClick={() => {
                                        imageShow(productNew.productImage, 2);
                                      }}
                                      className="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "3",
                                    })}
                                    onClick={() => {
                                      toggleTab("3");
                                    }}
                                  >
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      alt=""
                                      onClick={() => {
                                        imageShow(productNew.productImage, 3);
                                      }}
                                      className="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    className={classnames({
                                      active: activeTab === "4",
                                    })}
                                    onClick={() => {
                                      toggleTab("4");
                                    }}
                                  >
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      alt=""
                                      onClick={() => {
                                        imageShow(productNew.productImage, 4);
                                      }}
                                      className="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                  </NavLink>
                                </NavItem>
                              </Nav>
                            </Col>
                            <Col xs="9">
                              <TabContent
                                activeTab={activeTab}
                                className="position-relative"
                              >
                                <div className="product-wishlist">
                                  <Link to="#">
                                    <i className="mdi mdi-heart-outline"></i>
                                  </Link>
                                </div>
                                <TabPane tabId="1">
                                  <div className="product-img">
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      alt=""
                                      id="expandedImg1"
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId="2">
                                  <div className="product-img">
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      id="expandedImg2"
                                      alt=""
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId="3">
                                  <div className="product-img">
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      id="expandedImg3"
                                      alt=""
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                                <TabPane tabId="4">
                                  <div className="product-img">
                                    <img
                                      src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                      id="expandedImg4"
                                      alt=""
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                              </TabContent>
                              <Row className="text-center mt-2">
                                <div className="col-sm-6 d-grid">
                                  <Button
                                    type="button"
                                    color="primary"
                                    onClick={() =>
                                      addToCart(productNew.productID)
                                    }
                                    className="btn-block waves-effect waves-light mt-2 me-1"
                                  >
                                    {productAddtoCartLoading && (
                                      <Spinner
                                        type="grow"
                                        className="m-1"
                                        color="success"
                                      />
                                    )}
                                    <i className="uil uil-shopping-cart-alt me-2"></i>{" "}
                                    Add to cart
                                  </Button>
                                </div>
                                <div className="col-sm-6 d-grid">
                                  <Button
                                    type="button"
                                    color="light"
                                    onClick={() =>
                                      addToCart(productNew.productID)
                                    }
                                    className="btn-block waves-effect  mt-2 waves-light"
                                  >
                                    <i className="uil uil-shopping-basket me-2"></i>
                                    Buy now
                                  </Button>
                                </div>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col xl="7">
                        <div className="mt-4 mt-xl-3 ps-xl-4">
                          <h5 className="font-size-14">
                            <Link to="#" className="text-muted">
                              {productNew.categoryName}
                            </Link>
                          </h5>
                          <h4 className="font-size-20 mb-3">
                            {productNew.productName}
                          </h4>

                          <div className="text-muted">
                            <span className="badge bg-success font-size-14 me-1">
                              <i className="mdi mdi-star"></i>{" "}
                              {productNew.ratingScore}
                            </span>
                          </div>

                          <h5 className="mt-4 pt-2">
                            <del className="text-muted me-2">
                              R{productNew.oldPrice || 0}.00
                            </del>
                            R{productNew.unitCost || 0}.00
                            <span className="text-danger font-size-14 ms-2">
                              {!!product.isOffer && (
                                <h6 className="text-success text-uppercase">
                                  {product.offer} % Off
                                </h6>
                              )}
                            </span>
                          </h5>

                          <p className="mt-4 text-muted">
                            {productNew.description}
                          </p>
                          <div>
                            <Row>
                              <div className="col-md-4">
                                <div className="mt-3">
                                  <p className="text-muted mb-2">Quantity</p>
                                  <div style={{ width: "110px" }}>
                                    <InputGroup>
                                      <InputGroupAddon addonType="prepend">
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            countUP(quantity);
                                          }}
                                        >
                                          +
                                        </Button>
                                      </InputGroupAddon>
                                      <Input
                                        type="text"
                                        value={quantity}
                                        name="demo_vertical"
                                        readOnly
                                      />
                                      <InputGroupAddon addonType="append">
                                        <Button
                                          color="primary"
                                          onClick={() => {
                                            countDown(quantity);
                                          }}
                                        >
                                          -
                                        </Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </div>
                                </div>
                              </div>
                              {/* <Col md="6">
                                <div className="mt-3">
                                  <h5 className="font-size-14">Specification :</h5>
                                  <ul className="list-unstyled product-desc-list text-muted">
                                    {product.shortspecifications &&
                                      product.shortspecifications.map((item, i) => (
                                        <li key={i}>
                                          <i className="mdi mdi-circle-medium me-1 align-middle"></i> {item}
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </Col> */}
                              {/* <Col md="6">
                                <div className="mt-3">
                                  <h5 className="font-size-14">Services :</h5>
                                  <ul className="list-unstyled product-desc-list text-muted">
                                    {product.shortservices &&
                                      product.shortservices.map((item, i) => (
                                        <li key={i}><i className={"uil uil-" + item.icon + " text-primary me-1 font-size-16"}></i> {item.value}</li>
                                      ))}
                                  </ul>
                                </div>
                              </Col> */}
                            </Row>
                            <div className="product-color">
                              <h5 className="font-size-15">Color :</h5>
                              {product.colorOptions &&
                                product.colorOptions.map((option, i) => (
                                  <Link to="#" className="active" key={i}>
                                    <div className="product-color-item border rounded">
                                      <img
                                        src={option.image}
                                        alt=""
                                        className="avatar-md"
                                      />
                                    </div>
                                    <p>{option.color}</p>
                                  </Link>
                                ))}
                            </div>
                          </div>
                          <div className="mt-3">
                            <h5 className="font-size-14 mb-3">
                              <i className="uil uil-location-pin-alt font-size-20 text-primary align-middle me-2"></i>{" "}
                              Delivery location
                            </h5>

                            <div className="d-inline-flex">
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Delivery pincode"
                                />

                                <Button color="light" type="button">
                                  Check
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="mt-4">
                      <h5 className="font-size-14 mb-3">
                        Product description:{" "}
                      </h5>
                      <div className="product-desc">
                        <Nav tabs className="nav-tabs-custom">
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeDescriptionTab === "description",
                              })}
                              onClick={() => {
                                toggledescription("description");
                              }}
                            >
                              Description
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active:
                                  activeDescriptionTab === "specifications",
                              })}
                              onClick={() => {
                                toggledescription("specifications");
                              }}
                            >
                              Specifications
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent
                          activeTab={activeDescriptionTab}
                          className="border border-top-0 p-4"
                        >
                          <TabPane tabId="description">
                            <Row>
                              <Col sm={3} md={2}>
                                <div>
                                  <img
                                    src={`${PRODUCT_IMAGE_URL}${productNew.productImage}`}
                                    alt=""
                                    className="img-fluid mx-auto d-block"
                                  />
                                </div>
                              </Col>
                              <Col sm={9} md={10}>
                                <div className="text-muted p-2">
                                  <p>{productNew.description}</p>

                                  {/* <div>
                                    <ul className="list-unstyled product-desc-list text-muted">
                                      <li><i className="mdi mdi-circle-medium me-1 align-middle"></i> Sed ut perspiciatis omnis iste</li>
                                      <li><i className="mdi mdi-circle-medium me-1 align-middle"></i> Neque porro quisquam est</li>
                                      <li><i className="mdi mdi-circle-medium me-1 align-middle"></i> Quis autem vel eum iure</li>
                                    </ul>
                                  </div> */}
                                </div>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="specifications">
                            <Table className="table-nowrap mb-0">
                              <tbody>
                                {product.specification &&
                                  product.specification.map(
                                    (specification, i) => (
                                      <tr key={i}>
                                        <th
                                          scope="row"
                                          style={{ width: "20%" }}
                                        >
                                          {specification.type}
                                        </th>
                                        <td>{specification.value}</td>
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </Table>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>

                    <Reviews comments={product.comments} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

EcommerceProductDetail.propTypes = {
  product: PropTypes.object,
  onGetProductDetail: PropTypes.func,
};

const mapStateToProps = ({ ecommerce }) => ({
  product: ecommerce.product,
});

const mapDispatchToProps = (dispatch) => ({
  onGetProductDetail: (id) => dispatch(getProductDetail(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EcommerceProductDetail);
