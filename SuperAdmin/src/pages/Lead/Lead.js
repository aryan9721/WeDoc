import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
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

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { mapCompanySeeks } from "../../services/graphql";
import { mapCompanyProvides } from "../../services/graphql";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";

const Lead = (props) => {
  const [notification_Menu, setnotification_Menu] = useState(false);
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [companySeeksList, setCompanySeeksList] = useState([]);
  const [companyProvidesList, setCompanyProvidesList] = useState([]);
  const [
    fetchCompanySeeksList,
    { loading: IncomingCompanySeeksLoading, data: companySeeksListData },
  ] = useLazyQuery(mapCompanySeeks);

  const [
    fetchCompanyProvidesList,
    { loading: IncomingCompanyProvidesLoading, data1: companyProvidesListData },
  ] = useLazyQuery(mapCompanyProvides);

  useEffect(() => {
    fetchCompanySeeksList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanySeeksList]);

  useEffect(() => {
    fetchCompanyProvidesList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanyProvidesList]);

  useEffect(() => {
    if (companySeeksListData && companySeeksListData.mapCompanySeeks) {
      setCompanySeeksList(companySeeksListData.mapCompanySeeks.data);
    }
  }, [companySeeksListData]);

  useEffect(() => {
    if (companyProvidesListData && companyProvidesListData.mapCompanyProvides) {
      setCompanyProvidesList(companyProvidesListData.mapCompanyProvides.data1);
    }
  }, [companyProvidesListData]);

  const rowData = [
    {
      compPackageId: "	BMW 1 Series",
      seekKeywordId: "Product",
      periodTypeId: "100 Vehicle",
      quantityTypeId: "100",
      status: "	Active",
    },
  ];

  const rowData1 = [
    {
      compPackageId: "	BMW 1 Series",
      provideKeywordId: "Product",
      periodTypeId: "100 Vehicle",
      quantityTypeId: "100",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataCompanySeeksList = (CompanySeeksListList) => {
    CompanySeeksListList.forEach((datum) => {
      finalList.push({
        compPackageId: datum.compPackageId,
        seekKeywordId: datum.seekKeywordId,
        periodTypeId: datum.periodTypeId,
        quantityTypeId: datum.quantityTypeId,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let finalList1 = [];
  const makeDataCompanyProvidesList = (CompanyProvidesListList) => {
    CompanyProvidesListList.forEach((datum) => {
      finalList.push({
        compPackageId: datum.compPackageId,
        provideKeywordId: datum.seekKeywordId,
        periodTypeId: datum.periodTypeId,
        quantityTypeId: datum.quantityTypeId,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList1;
  };

  let CompanySeeksList =
    companySeeksList.length === 0
      ? rowData
      : makeDataCompanySeeksList(companySeeksList);

  const data = {
    rows: CompanySeeksList,
  };

  let CompanyProvidesList =
    companyProvidesList.length === 0
      ? rowData1
      : makeDataCompanyProvidesList(companyProvidesList);

  const data1 = {
    rows: CompanyProvidesList,
  };

  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu);
  };

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="WeDoc" breadcrumbItem="Leads" />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="h4">My Leads</CardTitle>

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
                          <span className="d-none d-sm-block">Seek</span>
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
                          <span className="d-none d-sm-block">Provide</span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="5" className="p-3">
                        {isEmpty(companySeeksList) &&
                          IncomingCompanySeeksLoading && (
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
                        {!isEmpty(companySeeksList) &&
                          companySeeksList.map((data, key) => (
                            <Row>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={img2}
                                        alt="Card image cap"
                                      />
                                      {/* <CardImg
                              className="img-fluid"
                              src={
                                data.imagePath === null
                                  ? img2
                                  : `${PRODUCT_IMAGE_URL}${data.imagePath}`
                              }
                              alt="Card image cap"
                            /> */}
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link>{data.compPackageId}</Link>
                                        </CardTitle>
                                        <CardText>
                                          <b>Keyword :</b>
                                          {data.seekKeywordId}
                                          <br />
                                          <b>Period :</b> {data.periodTypeId}
                                          <br />
                                          <b>Quantity :</b>{" "}
                                          {data.quantityTypeId}
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
                        {isEmpty(companyProvidesList) &&
                          IncomingCompanyProvidesLoading && (
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
                        {!isEmpty(companySeeksList) &&
                          companySeeksList.map((data1, key) => (
                            <Row>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={img3}
                                        alt="Card image cap"
                                      />
                                      {/* <CardImg
                              className="img-fluid"
                              src={
                                data.imagePath === null
                                  ? img2
                                  : `${PRODUCT_IMAGE_URL}${data1.imagePath}`
                              }
                              alt="Card image cap"
                            /> */}
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link>{data1.compPackageId}</Link>
                                        </CardTitle>
                                        <CardText>
                                          <b>Keyword :</b>
                                          {data1.provideKeywordId}
                                          <br />
                                          <b>Period :</b> {data1.periodTypeId}
                                          <br />
                                          <b>Quantity :</b>
                                          {data1.quantityTypeId}
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

export default Lead;
