import React, { useState, useEffect } from "react";
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
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";

//SimpleBar
import classnames from "classnames";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { Link } from "react-router-dom";
import RatingTooltip from "react-rating-tooltip";
//Import Scrollbar

import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { isEmpty, map } from "lodash";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { getMstRatingScoreList } from "../../services/graphql";

const Reviews = (props) => {
  const [def, setdef] = useState("");
  const starStyle = {};

  // eslint-disable-next-line no-unused-vars
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [notification_Menu, setnotification_Menu] = useState(false);
  const [ratingList, setRatingList] = useState([]);

  const [fetchRatingList, { loading: ratingLoading, data: RatingListData }] =
    useLazyQuery(getMstRatingScoreList);

  useEffect(() => {
    fetchRatingList({
      variables: {
        page: 1,
        size: 10,
      },
    });
  }, [fetchRatingList]);

  useEffect(() => {
    if (RatingListData && RatingListData.getMstRatingScoreList) {
      setRatingList(RatingListData.getMstRatingScoreList.result);
    }
  }, [RatingListData]);

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
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Minible" breadcrumbItem="Rating & Reviews" />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Reviews & Ratings for Your Company</h4>
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
                            Your Business
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
                            <i className="far fa-user"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Your Specials
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
                            <i className="far fa-user"></i>
                          </span>
                          <span className="d-none d-sm-block">
                            Your Catalogue
                          </span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="5" className="p-3">
                        <h3>Reviews on Your Business</h3>
                        {isEmpty(ratingList) && ratingLoading && (
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
                                         item.productImage
                                        }
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                      <CardTitle className="h5">
                                          <Link to="#">
                                            {item.ratingScoreName}
                                          </Link>
                                        </CardTitle>
                                        <CardText>
                                          <Col xl="3" md="4" sm="6">
                                            <div>
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
                                              />{" "}
                                              <span>{item.totalRatingScore}</span>
                                            </div>
                                          </Col>
                                        </CardText>

                                        <CardText>
                                         {item.totalRatingCount}
                                        </CardText>
                                        <CardText>
                                          <small>{item.ratingScore}</small>
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
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      KRIVAHN DOSS
                                    </CardTitle>
                                    <CardText>
                                      <Col xl="3" md="4" sm="6">
                                        <div>
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
                                          />{" "}
                                          <span>{def}</span>
                                        </div>
                                      </Col>
                                    </CardText>

                                    <CardText>
                                      <b>
                                        Unbelievable product that covers all
                                        areas of Air dryers & Air preheaters.
                                      </b>
                                    </CardText>
                                    <CardText>
                                      <small>Last updated 3 mins ago</small>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      KRIVAHN DOSS
                                    </CardTitle>
                                    <CardText>
                                      <Col xl="3" md="4" sm="6">
                                        <div>
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
                                          />{" "}
                                          <span>{def}</span>
                                        </div>
                                      </Col>
                                    </CardText>

                                    <CardText>
                                      <b>
                                        Unbelievable product that covers all
                                        areas of Air dryers & Air preheaters.
                                      </b>
                                    </CardText>
                                    <CardText>
                                      <small>Last updated 3 mins ago</small>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7" className="p-3">
                        <h3>Reviews on Your Catalogue</h3>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      STEPHANIE JOSHUA ATTORNEYS
                                    </CardTitle>
                                    <CardText>
                                      <Col xl="3" md="4" sm="6">
                                        <div>
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
                                          />{" "}
                                          <span>{def}</span>
                                        </div>
                                      </Col>
                                    </CardText>

                                    <CardText>
                                      <b>
                                        Unbelievable product that covers all
                                        areas of Air dryers & Air preheaters.
                                      </b>
                                    </CardText>
                                    <CardText>
                                      <small>Last updated 3 mins ago</small>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      STEPHANIE JOSHUA ATTORNEYS
                                    </CardTitle>
                                    <CardText>
                                      <Col xl="3" md="4" sm="6">
                                        <div>
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
                                          />{" "}
                                          <span>{def}</span>
                                        </div>
                                      </Col>
                                    </CardText>

                                    <CardText>
                                      <b>
                                        Unbelievable product that covers all
                                        areas of Air dryers & Air preheaters.
                                      </b>
                                    </CardText>
                                    <CardText>
                                      <small>Last updated 3 mins ago</small>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
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

export default Reviews;
