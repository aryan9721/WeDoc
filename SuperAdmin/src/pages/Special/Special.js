import React, { useEffect, useState, useCallback } from "react";
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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Spinner,
} from "reactstrap";

//SimpleBar
import img2 from "../../assets/images/small/img-2.jpg";

//Import Scrollbar
import Select from "react-select";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { getMstSpecialList } from "../../services/graphql";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Special = (props) => {
  const [selectedGroup, setselectedGroup] = useState(null);
  const [drp_info1, setDrp_info1] = useState(false);
  const [specialList, setSpecialList] = useState([]);
  const [
    fetchSpecialList,
    { loading: IncomingSpecialLoading, data: specialListData },
  ] = useLazyQuery(getMstSpecialList);

  useEffect(() => {
    fetchSpecialList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchSpecialList]);

  useEffect(() => {
    if (specialListData && specialListData.getMstSpecialList) {
      setSpecialList(specialListData.getMstSpecialList.result);
    }
  }, [specialListData]);

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
  const makeDataSpecialList = (SpecialListList) => {
    SpecialListList.forEach((datum) => {
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

  let SpecialList =
    specialList.length === 0 ? rowData : makeDataSpecialList(specialList);

  const data = {
    rows: SpecialList,
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
            breadcrumbItem="Home &#187; Special List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Special</h4>
                    </CardTitle>
                    <Row>
                      <Col>
                        <div className="btn-block me-1 my-3">
                          <ButtonDropdown
                            isOpen={drp_info1}
                            toggle={() => setDrp_info1(!drp_info1)}
                          >
                            <Button id="caret" color="info">
                              <i className="uil-search"></i>
                              SEARCH FILTERS
                            </Button>
                            <DropdownToggle
                              caret
                              color="info"
                              className="dropdown-toggle-split"
                            >
                              <i className="mdi mdi-chevron-down" />
                            </DropdownToggle>
                            <DropdownMenu>
                              <AvForm className="needs-validation">
                                <Row className="my-1 mx-3">
                                  <label htmlFor="example-search-input">
                                    Search
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="search"
                                      defaultValue="How do I shoot web"
                                    />
                                  </div>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Company</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Select Category</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Province</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>City</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Suburb</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Button
                                  className="my-2 mx-3"
                                  color="primary"
                                  type="submit"
                                >
                                  SEARCH
                                </Button>
                              </AvForm>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>{" "}
                      </Col>
                    </Row>
                    {isEmpty(specialList) && IncomingSpecialLoading && (
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
                    {!isEmpty(specialList) &&
                      specialList.map((data, key) => (
                        <Row
                          className="g-0 align-items-center"
                          key={"_special_" + key}
                        >
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
                                <Link>{data.specialName}</Link>
                              </CardTitle>
                              <CardText>
                                <b>Category:</b>
                                {data.specialId}
                              </CardText>
                              <CardText>{data.specialDescription}</CardText>
                              <CardText>
                                <Button
                                  color="info"
                                  className="btn-soft-info waves-effect waves-light mb-1"
                                >
                                  Start Date: {data.startDate}
                                </Button>{" "}
                                <Button
                                  color="info"
                                  className="btn-soft-info waves-effect waves-light"
                                >
                                  End Date: {data.endDate}
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

export default Special;
