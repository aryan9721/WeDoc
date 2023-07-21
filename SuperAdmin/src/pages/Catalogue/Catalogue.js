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

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import Select from "react-select";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { mapEflyersUploads } from "../../services/graphql";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";

const Catalogue = (props) => {
  const [selectedGroup, setselectedGroup] = useState(null);
  const [drp_info1, setDrp_info1] = useState(false);
  const [eFlyersUploads, setEFlyersUploads] = useState([]);
  const [
    fetchEFlyersUploads,
    { loading: IncomingEFlyersUploadsLoading, data: eFlyersUploadsData },
  ] = useLazyQuery(mapEflyersUploads);

  useEffect(() => {
    fetchEFlyersUploads({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchEFlyersUploads]);

  useEffect(() => {
    if (eFlyersUploadsData && eFlyersUploadsData.mapEflyersUploads) {
      setEFlyersUploads(eFlyersUploadsData.mapEflyersUploads.data);
    }
  }, [eFlyersUploadsData]);

  const rowData = [
    {
      documentType: "",
      documentName: "	BMW 1 Series",
      eflyerUploadId: "Product",
      efmid: "100 Vehicle",
      modifiedDate: "123",
      endDate: "234",
      isActive: "	Active",
    },
  ];

  let finalList = [];
  const makeDataEFlyersUploads = (EFlyersUploadsList) => {
    EFlyersUploadsList.forEach((datum) => {
      finalList.push({
        documentType: datum.documentType,
        documentName: datum.documentName,
        eflyerUploadId: datum.eflyerUploadId,
        efmid: datum.efmid,
        modifiedDate: datum.modifiedDate,
        endDate: datum.endDate,
        isActive: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let EFlyersUploads =
    eFlyersUploads.length === 0
      ? rowData
      : makeDataEFlyersUploads(eFlyersUploads);

  const data = {
    rows: EFlyersUploads,
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
            breadcrumbItem="Home &#187; Catalogue List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Catalogue</h4>
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
                                  Search
                                </Button>
                              </AvForm>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>{" "}
                      </Col>
                    </Row>
                    {isEmpty(eFlyersUploads) && IncomingEFlyersUploadsLoading && (
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
                    {!isEmpty(eFlyersUploads) &&
                      eFlyersUploads.map((data, key) => (
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
                                <Link to="/cataloguedetail">
                                  {data.documentType}
                                </Link>
                              </CardTitle>
                              <CardText>
                                <b>Category:</b>
                                {data.eflyerUploadId}
                              </CardText>
                              <CardText>{data.efmid}</CardText>
                              <CardText>
                                <Button
                                  color="info"
                                  className="btn-soft-info waves-effect waves-light mb-1"
                                >
                                  Start Date: {data.modifiedDate}
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

export default Catalogue;
