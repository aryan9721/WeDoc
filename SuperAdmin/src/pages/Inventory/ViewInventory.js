import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  Label,
  Input,
  Container,
} from "reactstrap";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ViewInventory = () => {
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [selectedGroup, setselectedGroup] = useState(null);
  const optionGroup1 = [
    {
      label: "Select Customer",
      options: [
        { label: "External Customer", value: "External Customer" },
        { label: "Internal Customer", value: "Internal Customer" },
      ],
    },
  ];
  const optionInventoryType = [
    {
      label: "Select Inventory",
      options: [
        { label: "Product", value: "Product" },
        { label: "Service", value: "Service" },
      ],
    },
  ];
  const optionGroup2 = [
    {
      label: "Select Customer",
      options: [
        { label: "Eastern Cape", value: "Eastern Cape" },
        { label: "Free State", value: "Free State" },
        { label: "Gauteng", value: "Gauten" },
        { label: "Kwazulu Natal", value: "Kwazulu Natal" },
        { label: "Limpopo", value: "Limpopo" },
        { label: "Mpumalanga", value: "Mpumalanga" },
        { label: "North West", value: "North West" },
        { label: "Northern Cape", value: "Northern Cape" },
        { label: "Western Cape", value: "Western Cape" },
      ],
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const modifiedV = { ...validation };
    var fnm = document.getElementById("validationTooltip01").value;
    var lnm = document.getElementById("validationTooltip02").value;
    var unm = document.getElementById("validationTooltipUsername").value;
    var city = document.getElementById("validationTooltip03").value;
    var stateV = document.getElementById("validationTooltip04").value;

    if (fnm === "") {
      modifiedV["fnm"] = false;
    } else {
      modifiedV["fnm"] = true;
    }

    if (lnm === "") {
      modifiedV["lnm"] = false;
    } else {
      modifiedV["lnm"] = true;
    }

    if (unm === "") {
      modifiedV["unm"] = false;
    } else {
      modifiedV["unm"] = true;
    }

    if (city === "") {
      modifiedV["city"] = false;
    } else {
      modifiedV["city"] = true;
    }

    if (stateV === "") {
      modifiedV["stateV"] = false;
    } else {
      modifiedV["stateV"] = true;
    }
    setValidation(modifiedV);
  }

  //for change tooltip display propery
  const onChangeValidation = (fieldName, value) => {
    const modifiedV = { ...validation };
    if (value !== "") {
      modifiedV[fieldName] = true;
    } else {
      modifiedV[fieldName] = false;
    }
    setValidation(modifiedV);
  };

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="View Inventory" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>View Inventory - BMW 1 Series</h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Inventory Name:</Label>&#160;BMW 1 Series
                        {/* <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup();
                            }}
                            options={optionGroup1}
                            classNamePrefix="select2-selection"
                          /> */}
                      </div>
                    </Col>
                  </Row>

                  <AvForm className="needs-validation">
                    <h4>Person Info</h4>
                    <hr />
                    <Row>
                      <Col>
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Quantity:&#160;
                          </Label>
                          101
                          {/* <input
                              className="form-control"
                              type="number"
                              defaultValue="1"
                              id="example-number-input"
                            /> */}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Unit Type:</Label>
                          &#160;Nos
                          {/* <AvField
                              name="Unit Type"
                              placeholder="Unit Type..."
                              type="text"
                              errorMessage="Enter Unit Type"
                              className="form-control"
                              validate={{ required: { value: true } }}
                              id="validationCustom02"
                            /> */}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="mt-3">
                          <Label>Inventory Description:</Label>&#160;BMW 135
                          Series
                          {/* <Input
                              type="textarea"
                              id="textarea"
                              onChange={(e) => {
                                textareachange(e);
                              }}
                              maxLength="225"
                              rows="4"
                              placeholder="Description..."
                            /> */}
                          {textareabadge ? (
                            <span className="badgecount badge badge-success">
                              {" "}
                              {textcount} / 225{" "}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mt-3">
                          <Label>Office Discription:</Label>&#160;5 on floor 95
                          in warehouse
                          {/* <Input
                              type="textarea"
                              id="textarea"
                              onChange={(e) => {
                                textareachange(e);
                              }}
                              maxLength="225"
                              rows="4"
                              placeholder="Comment..."
                            /> */}
                          {textareabadge ? (
                            <span className="badgecount badge badge-success">
                              {" "}
                              {textcount} / 225{" "}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    {/* <Button color="primary" type="submit">
                        <i className="uil-check-circle"></i>Update
                      </Button> */}
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>
                    <i className="uil-plus-circle"></i>Follow up & Comment
                  </h4>
                  <hr />
                  <Row>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img2}
                              alt="Card image cap"
                            />
                          </Col>
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>Added Customer on 06-Jan-2016</CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Quote # has been created on 06-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img3}
                              alt="Card image cap"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img2}
                              alt="Card image cap"
                            />
                          </Col>
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Invoice #INVOICE - 00021 has been created on
                                06-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Quote #QUOTE - 00023 has been created on
                                14-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img3}
                              alt="Card image cap"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  {/* <h4>
                      <i className="uil-comment-dots"></i>Leave A Comment
                    </h4>
                    <hr />
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Write comment here..."
                          />
                        </div>
                      </Col>
                    </Row> */
                  /* <Button color="primary" type="submit">
                      submit
                    </Button> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewInventory;
