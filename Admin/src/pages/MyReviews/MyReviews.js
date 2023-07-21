import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Col,
  Row,
  Container,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  NavLink,
  NavItem,
  Nav,
  Badge,
  Alert,
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";

//SimpleBar
import classnames from "classnames";

import RatingTooltip from "react-rating-tooltip";
//Import Scrollbar

import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";

import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { getRatingList } from "../../services/graphql";

const MyReviews = (props) => {
  const [def, setdef] = useState("");
  const starStyle = {};

  // eslint-disable-next-line no-unused-vars
  const [activeTabJustify, setactiveTabJustify] = useState("1");

  const [notification_Menu, setnotification_Menu] = useState(false);

  const [ratingList, setRatingList] = useState([]);

  const [fetchRatingList, { loading: reviewLoading, data: ratingListData }] =
    useLazyQuery(getRatingList);

  useEffect(() => {
    fetchRatingList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
        userId: null,
        documentPath: null,
      },
    });
  }, [fetchRatingList]);

  useEffect(() => {
    if (ratingListData && ratingListData.getRatingList) {
      setRatingList(ratingListData.getRatingList.result);
    }
  }, [ratingListData]);

  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu);
  };

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
      fetchRatingList({
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
          {/* Render Breadcrumb */}
          <Breadcrumbs title="WeDoc" breadcrumbItem="Rating & Reviews" />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Your Reviews on Businesses</h4>
                    </CardTitle>

                    <Nav tabs className="nav-tabs-custom nav-justified">
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "1",
                          })}
                          onClick={() => {
                            toggleCustomJustified("1");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i className="fas fa-home"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Business{" "}
                            <Badge pill className="bg-soft-primary">
                              1
                            </Badge>{" "}
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "2",
                          })}
                          onClick={() => {
                            toggleCustomJustified("2");
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
                            active: activeTabJustify === "3",
                          })}
                          onClick={() => {
                            toggleCustomJustified("3");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i class="uil-book-open"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Catalogue{" "}
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
                            active: activeTabJustify === "4",
                          })}
                          onClick={() => {
                            toggleCustomJustified("4");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i class="fas fa-parking"></i>
                          </span>
                          <span className="d-none d-sm-block">Product</span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="1" className="p-3">
                        <h3>Reviews on Your Business</h3>
                        {isEmpty(ratingList) && reviewLoading && (
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

                        {!isEmpty(ratingList) &&
                          ratingList.map((item, key) => (
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
                                            : `${PRODUCT_IMAGE_URL}${item.imagePath}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="">{item.title}</Link>
                                        </CardTitle>

                                        <CardText>
                                          <b>{item.review}</b>
                                        </CardText>

                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.ratingScore);
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
                                              <span>{item.ratingScore}</span>
                                            </div>
                                          </Col>
                                        </CardText>
                                        <CardText>
                                          <Badge pill className="bg-soft-dark">
                                            {item.dateofReview}
                                          </Badge>{" "}
                                          <Badge pill className="bg-soft-dark">
                                            Pending
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
                      <TabPane tabId="6" className="p-3">
                        <h3>Reviews on Your Specials</h3>
                        <Alert color="primary">No records found</Alert>
                      </TabPane>
                      <TabPane tabId="2" className="p-3">
                        <h3>Reviews on Your Specials</h3>

                        {isEmpty(ratingList) && reviewLoading && (
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

                        {!isEmpty(ratingList) &&
                          ratingList.map((item, key) => (
                            <Row key={"ss" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.imagePath === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.imagePath}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="">{item.title}</Link>
                                        </CardTitle>

                                        <CardText>
                                          <b>{item.review}</b>
                                        </CardText>

                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.ratingScore);
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
                                              <span>{item.ratingScore}</span>
                                            </div>
                                          </Col>
                                        </CardText>
                                        <CardText>
                                          <Badge pill className="bg-soft-dark">
                                            {item.dateofReview}
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
                      <TabPane tabId="3" className="p-3">
                        <h3>Reviews on Your Catalogue</h3>
                        <Alert color="primary">No records found</Alert>
                      </TabPane>
                      <TabPane tabId="3" className="p-3">
                        <h3>Reviews on Your Catalogue</h3>
                        {isEmpty(ratingList) && reviewLoading && (
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

                        {!isEmpty(ratingList) &&
                          ratingList.map((item, key) => (
                            <Row key={"cc" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.imagePath === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.imagePath}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="">{item.title}</Link>
                                        </CardTitle>
                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.ratingScore);
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
                                              <span>{item.ratingScore}</span>
                                            </div>
                                          </Col>
                                        </CardText>

                                        <CardText>
                                          <b>{item.review}.</b>
                                        </CardText>
                                        <CardText>
                                          <CardText>
                                            <Badge
                                              pill
                                              className="bg-soft-dark"
                                            >
                                              {item.dateofReview}
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
                      <TabPane tabId="4" className="p-3">
                        <h3>Reviews on Your Product</h3>
                        {isEmpty(ratingList) && reviewLoading && (
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

                        {!isEmpty(ratingList) &&
                          ratingList.map((item, key) => (
                            <Row key={"pp" + key}>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={
                                          item.imagePath === null
                                            ? img2
                                            : `${PRODUCT_IMAGE_URL}${item.imagePath}`
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="#">{item.name}</Link>
                                        </CardTitle>
                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
                                              <RatingTooltip
                                                max={5}
                                                onChange={(rate) => {
                                                  setdef(item.ratingScore);
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
                                              <span>{item.ratingScore}</span>
                                            </div>
                                          </Col>
                                        </CardText>

                                        <CardText>
                                          <b>{item.review}.</b>
                                        </CardText>
                                        <CardText>
                                          <small>{item.dateofReview}</small>
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

export default MyReviews;
