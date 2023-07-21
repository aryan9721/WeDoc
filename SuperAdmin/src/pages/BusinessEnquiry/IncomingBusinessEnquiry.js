import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
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
  Spinner,
} from "reactstrap";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { getIncomingItemRequestList } from "../../services/graphql";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";

const IncomingItemRequestList = (props) => {
  const [selectedGroup, setselectedGroup] = useState(null);
  const [drp_info1, setDrp_info1] = useState(false);
  // const [incomingList, setIncomingList] = useState([]);

  const [notification_Menu, setnotification_Menu] = useState(false);
  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu);
  };
  const [incomingItemRequestList, setIncomingItemRequestList] = useState([]);
  const [
    fetchIncomingItemRequestList,
    {
      loading: incomingItemRequestListLoading,
      data: incomingItemRequestListData,
    },
  ] = useLazyQuery(getIncomingItemRequestList);

  useEffect(() => {
    fetchIncomingItemRequestList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchIncomingItemRequestList]);

  useEffect(() => {
    if (
      incomingItemRequestListData &&
      incomingItemRequestListData.getIncomingItemRequestList
    ) {
      setIncomingItemRequestList(
        incomingItemRequestListData.getIncomingItemRequestList.result
      );
    }
  }, [incomingItemRequestListData]);

  const rowData = [
    {
      itemRequestDescription: "Product",
      itemRequestTitle: "	BMW 1 Series",
      itemCategory: "Product",
      itemRequestDate: "100 Vehicle",
      itemCategoryID: "234",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataIncomingItemRequestList = (incomingItemRequestListList) => {
    incomingItemRequestListList.forEach((datum) => {
      finalList.push({
        itemRequestDescription: datum.itemRequestDescription,
        itemRequestTitle: datum.itemRequestTitle,
        itemCategory: datum.enquiryDescription,
        itemRequestDate: datum.itemRequestDate,
        itemCategoryID: datum.itemCategoryID,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  const optionGroup1 = [
    {
      label: "Picnic",
      options: [
        { label: "Eastern Cape", value: "Eastern Cape" },
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

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }
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
                      <h4>My Enquiries</h4>
                    </CardTitle>
                    {isEmpty(incomingItemRequestList) &&
                      incomingItemRequestListLoading && (
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={12}>
                                  <CardBody>
                                    <Spinner className="m-1" color="primary" />
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      )}

                    {!isEmpty(incomingItemRequestList) &&
                      incomingItemRequestList.map((data, key) => (
                        <Row
                          className="g-0 align-items-center"
                          key={"kk" + key}
                        >
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={
                                data.imagePath === null
                                  ? img2
                                  : `${PRODUCT_IMAGE_URL}${data.imagePath}`
                              }
                              alt="Card image cap"
                            />
                          </Col>
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">
                                <Link to="/incomingdetail">
                                  {data.itemRequestTitle}
                                </Link>
                              </CardTitle>
                              <CardText>{data.itemCategoryID}</CardText>
                              <CardText>{data.itemCategory}</CardText>
                              <CardText>{data.itemRequestDescription}</CardText>

                              <CardText>
                                <Button
                                  color="info"
                                  className="btn-soft-info waves-effect waves-light mb-1"
                                >
                                  Posted on: {data.itemRequestDate}
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

export default IncomingItemRequestList;
