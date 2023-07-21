import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Card,
  Col,
  Container,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Row,
  Button,
} from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";
import img2 from "../../assets/images/small/img-2.jpg";
import { useLazyQuery } from "@apollo/react-hooks";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// getBusinessIncomingEnquiry
// import { getBusinessList } from "../../services/graphql";
import { getBusinessIncomingEnquiry } from "../../services/graphql";
import { PRODUCT_IMAGE_URL } from "../../common/config";

const BusinessEnquiry = (props) => {
  const [notification_Menu, setnotification_Menu] = useState(false);

  const [enquiryTitle, setEnquiryTitle] = useState("");
  const [businessIncomingEnquiry, setBusinessIncomingEnquiry] = useState([]);

  const [
    fetchBusinessIncomingEnquiry,
    {
      loading: businessIncomingEnquiryLoading,
      data: businessIncomingEnquiryData,
    },
  ] = useLazyQuery(getBusinessIncomingEnquiry);

  useEffect(() => {
    fetchBusinessIncomingEnquiry({
      variables: {
        // key: 2,
        // keyType: 1,
        page: 1,
        size: 10,
        userID: null,
        enquiryTitle: null,
        enquiryDescription: null,
        enquiryDate: null,
        enquiryStatusId: null,
        companyId: null,
        createdDate: null,
        itemRequestTitle: null,
      },
    });
  }, [fetchBusinessIncomingEnquiry]);

  useEffect(() => {
    if (
      businessIncomingEnquiryData &&
      businessIncomingEnquiryData.getBusinessIncomingEnquiry
    ) {
      setBusinessIncomingEnquiry(
        businessIncomingEnquiryData.getBusinessIncomingEnquiry.result
      );
    }
  }, [businessIncomingEnquiryData]);
  const rowData = [
    {
      userID: "2334",
      enquiryTitle: "dhhjfjf",
      enquiryDescription: "	BMW 1 Series",
      enquiryDate: "383",
      enquiryStatusId: "Product",
      companyId: "234",
      createdDate: "100 vehicle",
      itemRequestTitle: "	BMW 1 Series",
    },
  ];

  let finalList = [];
  const makeDataBusinessIncomingEnquiry = (businessIncomingEnquiry) => {
    businessIncomingEnquiry.forEach((datum) => {
      finalList.push({
        userID: datum.userID,
        enquiryDescription: datum.enquiryDescription,
        enquiryTitle: datum.enquiryTitle,
        enquiryStatusId: datum.enquiryStatusId,
        companyId: datum.companyId,
        createdDate: datum.createdDate,
        itemRequestTitle: datum.itemRequestTitle,

        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };
  let BusinessIncomingEnquiry =
    businessIncomingEnquiry.length === 0
      ? rowData
      : makeDataBusinessIncomingEnquiry(businessIncomingEnquiry);

  const data = {
    rows: BusinessIncomingEnquiry,
  };
  const optionGroup = [
    {
      label: "Picnic",
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
    {
      label: "Camping",
      options: [
        { label: "Tent", value: "Tent" },
        { label: "Flashlight", value: "Flashlight" },
        { label: "Toilet Paper", value: "Toilet Paper" },
      ],
    },
  ];

  const optionGroup1 = [
    {
      label: "Picnic",
      options: [
        { label: "Eastern Cape", value: "Eastern Cape" },
        { label: "Ketchups", value: "Ketchups" },
        { label: "Relish", value: "Relish" },
      ],
    },
    {
      label: "Camping",
      options: [
        { label: "Tent", value: "Tent" },
        { label: "Flashlight", value: "Flashlight" },
        { label: "Toilet Paper", value: "Toilet Paper" },
      ],
    },
  ];

  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="WeDoc"
            breadcrumbItem="Home &#187; My Enquiry List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>My Enquiry</h4>
                    </CardTitle>
                    <Row>
                      <Col>
                        <Link
                          to="./addbusinessenquiry"
                          className="btn btn-danger my-3"
                        >
                          <i className="uil-plus"></i>
                          Add New Enquiry
                        </Link>
                      </Col>
                    </Row>
                    {BusinessIncomingEnquiry.map((item, index) => (
                      <Row className="g-0 align-items-center">
                        <Col md={4}>
                          <CardImg
                            className="img-fluid"
                            src={
                              item.itemImagePath === null
                                ? img2
                                : PRODUCT_IMAGE_URL + item.itemImagePath
                            }
                            alt="Card image cap"
                          />
                        </Col>
                        <Col md={8}>
                          <CardBody>
                            <CardTitle className="h5">
                              <Link>{item.enquiryTitle}</Link>
                            </CardTitle>
                            <CardText>{item.userID}</CardText>
                            <CardText>{item.enquiryDescription}</CardText>
                            <CardText>{item.itemRequestTitle}</CardText>
                            <CardText>{item.enquiryDate}</CardText>
                            <CardText>
                              <Button
                                color="info"
                                className="btn-soft-info waves-effect waves-light mb-1"
                              >
                                {item.createdDate}
                              </Button>{" "}
                            </CardText>
                          </CardBody>
                        </Col>
                      </Row>
                    ))}
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

export default BusinessEnquiry;
