import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  NavLink,
  NavItem,
  Nav,
  Badge,
  Alert,
  TabContent,
  TabPane,
  Container,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import RatingTooltip from "react-rating-tooltip";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import img2 from "../../assets/images/small/img-2.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { mstFavouritess } from "../../services/graphql";

const MyFavourite = () => {
  const [def, setdef] = useState("");
  const starStyle = {};
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [favouriteProductList, setFavouriteProductList] = useState([]);

  const [
    fetchMstFavouritesProductList,
    { loading: favLoading, data: FavouritesProductListData },
  ] = useLazyQuery(mstFavouritess);

  useEffect(() => {
    fetchMstFavouritesProductList({
      variables: {
        page: 1,
        size: 10,
      },
    });
  }, [fetchMstFavouritesProductList]);

  useEffect(() => {
    if (FavouritesProductListData && FavouritesProductListData.mstFavouritess) {
      setFavouriteProductList(FavouritesProductListData.mstFavouritess.data);
    }
  }, [FavouritesProductListData]);

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
      fetchMstFavouritesProductList({
        variables: {
          key: 2,
          keyType: Number(tab),
          page: 1,
          size: 10,
          userId: null,
          documentPath: null,
        },
      });
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="My Favourite" />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>My Favourite</h4>
                    </CardTitle>

                    <Nav tabs className="nav-tabs-custom nav-justified">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "5",
                          })}
                          onClick={() => {
                            toggleCustomJustified("5");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Business{" "}
                            <Badge pill className="bg-soft-primary">
                              10
                            </Badge>{" "}
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "6",
                          })}
                          onClick={() => {
                            toggleCustomJustified("6");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="uil-no-entry"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Specials{" "}
                            <Badge pill className="bg-soft-primary">
                              0
                            </Badge>{" "}
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "7",
                          })}
                          onClick={() => {
                            toggleCustomJustified("7");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i class="uil-book-open"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Catalogue{" "}
                            <Badge pill className="bg-soft-primary">
                              10
                            </Badge>{" "}
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="5" className="p-3">
                        <h3>Your Favourite Businesses</h3>

                        {isEmpty(favouriteProductList) && favLoading && (
                          <Row>
                            <Col>
                              <Card>
                                <Row className="g-0 align-items-center">
                                  <Col md={12}>
                                    <CardBody>
                                      <Spinner
                                        className="m-1"
                                        color="primary"
                                      />
                                    </CardBody>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        )}
                        {!isEmpty(favouriteProductList) &&
                          favouriteProductList.map((item, key) => (
                            <Row key={"kk" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.productImage === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.productImage}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="#">
                                            {item.mstFavouriteId}
                                          </Link>
                                        </CardTitle>
                                        <CardText className="h5">
                                          <Link to="#">{item.createdBy}</Link>
                                        </CardText>
                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.rate);
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
                                              />{" "}
                                              <span>{item.rate}</span>
                                            </div>
                                          </Col>
                                        </CardText>

                                        <CardText>
                                          <Badge
                                            pill
                                            className="bg-soft-dark mt-5"
                                          >
                                            {item.createdDate}
                                          </Badge>{" "}
                                        </CardText>
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                          ))}
                      </TabPane>

                      <TabPane tabId="2" className="p-3">
                        <h3>Your Favourite Specials</h3>

                        {isEmpty(favouriteProductList) && favLoading && (
                          <Row>
                            <Col>
                              <Card>
                                <Row className="g-0 align-items-center">
                                  <Spinner className="m-1" color="primary" />
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        )}

                        {!isEmpty(favouriteProductList) &&
                          favouriteProductList.map((item, key) => (
                            <Row key={"kk" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.productImage === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.productImage}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="#">{item.specialId}</Link>
                                        </CardTitle>
                                        <CardText className="h5">
                                          <Link to="#">{item.createdBy}</Link>
                                        </CardText>

                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.rate);
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
                                              />{" "}
                                              <span>{item.rate}</span>
                                            </div>
                                          </Col>
                                        </CardText>
                                        <CardText>
                                          <Badge pill className="bg-soft-dark">
                                            {item.createdDate}
                                          </Badge>{" "}
                                        </CardText>
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                          ))}
                      </TabPane>

                      <TabPane tabId="7" className="p-3">
                        <h3>Your Favourite Catalogues</h3>
                        {isEmpty(favouriteProductList) && favLoading && (
                          <Row>
                            <Col>
                              <Card>
                                <Row className="g-0 align-items-center">
                                  <Spinner className="m-1" color="primary" />
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        )}

                        {!isEmpty(favouriteProductList) &&
                          favouriteProductList.map((item, key) => (
                            <Row key={"kk" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.imagePath === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.productImage}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="#">{item.eflyerId}</Link>
                                        </CardTitle>
                                        <CardText className="h5">
                                          <Link to="#">{item.createdBy}</Link>
                                        </CardText>
                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.rate);
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
                                              />{" "}
                                              <span>{item.rate}</span>
                                            </div>
                                          </Col>
                                        </CardText>

                                        <CardText>
                                          <CardText>
                                            <Badge
                                              pill
                                              className="bg-soft-dark"
                                            >
                                              {item.createdDate}
                                            </Badge>{" "}
                                          </CardText>
                                        </CardText>
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                          ))}
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyFavourite;
