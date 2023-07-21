import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import {
  Card,
  Alert,
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
  Button,
  TabContent,
  TabPane,
  Spinner,
} from "reactstrap";

//SimpleBar
import classnames from "classnames";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img6 from "../../assets/images/small/img-6.jpg";

// paths
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { mstSpecialss } from "../../services/graphql";
import "react-perfect-scrollbar/dist/css/styles.css";

const MySpecial = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [special, setSpecial] = useState([]);
  const [fetchSpecial, { loading: specialLoading, data: specialData }] =
    useLazyQuery(mstSpecialss);

  useEffect(() => {
    fetchSpecial({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
        userId: null,
        documentPath: null,
      },
    });
  }, [fetchSpecial]);

  useEffect(() => {
    if (specialData && specialData.mstSpecialss) {
      setSpecial(specialData.mstSpecialss.data);
    }
  }, [specialData]);

  const rowData = [
    {
      specialName: "	BMW 1 Series",
      specialId: "Product",
      specialDescription: "100 Vehicle",
      startDate: "123",
      endDate: "234",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataSpecial = (SpecialList) => {
    SpecialList.forEach((datum) => {
      finalList.push({
        specialName: datum.specialName,
        specialId: datum.specialId,
        specialDescription: datum.specialDescription,
        startDate: datum.startDate,
        endDate: datum.endDate,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let Special = special.length === 0 ? rowData : makeDataSpecial(special);

  const data = {
    rows: Special,
  };

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
      fetchSpecial({
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
          <Breadcrumbs
            title="WeDoc"
            breadcrumbItem="Home &#187; Specials List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Your Current Specials</h4>
                    </CardTitle>
                    <Row>
                      <Col>
                        <Link
                          to="./addnewspecial"
                          className="btn btn-danger my-3"
                        >
                          <i className="uil-plus"></i>
                          Add New Special
                        </Link>
                      </Col>
                    </Row>
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
                          <span className="d-none d-sm-block">All Active</span>
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
                          <span className="d-none d-sm-block">Pending</span>
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
                            <i class="fas fa-plane-slash"></i>
                          </span>
                          <span className="d-none d-sm-block">Cancelled</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTabJustify === "8",
                          })}
                          onClick={() => {
                            toggleCustomJustified("8");
                          }}
                        >
                          <span className="d-block d-sm-none">
                            <i class="fas fa-times"></i>
                          </span>
                          <span className="d-none d-sm-block">Expired</span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="5" className="p-3">
                        {isEmpty(special) && specialLoading && (
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
                        {!isEmpty(special) &&
                          special.map((item, key) => (
                            <Row key={"_special_" + key}>
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
                                          <Link>{item.specialName}</Link>
                                        </CardTitle>

                                        <CardText>{item.description}</CardText>
                                        <CardText>
                                          <Button
                                            color="info"
                                            className="btn-soft-info waves-effect waves-light"
                                          >
                                            Started on {item.startDate}
                                          </Button>{" "}
                                          <Button
                                            color="info"
                                            className="btn-soft-info waves-effect waves-light"
                                          >
                                            Ends on {item.endDate}
                                          </Button>{" "}
                                          <Button
                                            color="danger"
                                            className="btn btn-danger waves-effect waves-light"
                                          >
                                            Edit
                                          </Button>{" "}
                                          <Button
                                            color="success"
                                            className="btn btn-success waves-effect waves-light"
                                          >
                                            View
                                          </Button>{" "}
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
                        {isEmpty(special) && specialLoading && (
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
                        <Row>
                          <Col md={12}>
                            <Card>
                              <Alert color="primary">
                                No Pending Catalogues to display
                              </Alert>
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
                                      <Link to="/SpecialDetail">
                                        BMW ACCESSORIES CATALOGUE
                                      </Link>
                                    </CardTitle>

                                    <CardText>
                                      COMPETENT PARTNERS. Extraordinary products
                                      to meet extraordinary needs. BMW Group
                                      South Africa offers a wide range of
                                      special products and services to business
                                      customers in the corporate, government and
                                      rental markets. Through our Corporate,
                                      Direct and Special Sales, programmes are
                                      also available for diplomats and members
                                      of international organisations, for 5 Star
                                      hotels and airlines, suppliers and
                                      security cars.
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                      >
                                        Edit
                                      </Button>{" "}
                                      <Button
                                        color="success"
                                        className="btn btn-success waves-effect waves-light"
                                      >
                                        View
                                      </Button>{" "}
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7" className="p-3">
                        {isEmpty(special) && specialLoading && (
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
                                      <Link>THE NEW BMW 1 SERIES</Link>
                                    </CardTitle>

                                    <CardText>
                                      The New BMW 1 Series From R4499 P/M*
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                      >
                                        Edit
                                      </Button>{" "}
                                      <Button
                                        color="success"
                                        className="btn btn-success waves-effect waves-light"
                                      >
                                        View
                                      </Button>{" "}
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
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
                                      <Link>THE BMW 320I AUTOMATIC SEDAN</Link>
                                    </CardTitle>

                                    <CardText>
                                      The BMW 320i Automatic Sedan From R5499 PM
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                      >
                                        Edit
                                      </Button>{" "}
                                      <Button
                                        color="success"
                                        className="btn btn-success waves-effect waves-light"
                                      >
                                        View
                                      </Button>{" "}
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="8" className="p-3">
                        {isEmpty(special) && specialLoading && (
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
                        <Row>
                          <Col md={12}>
                            <Card>
                              <Alert color="primary">
                                No Expired Catalogues to display
                              </Alert>
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
                                      <Link>STEPHANIE JOSHUA ATTORNEYS</Link>
                                    </CardTitle>

                                    <CardText>
                                      Unbelievable product that covers all areas
                                      of Air dryers & Air preheaters.
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                      >
                                        Edit
                                      </Button>{" "}
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

export default MySpecial;
