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

const ViewCustomer = () => {
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [selectedGroup, setselectedGroup] = useState(null);
  const optionGroup = [
    {
      label: "Gender",
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
    },
  ];
  const optionGroup1 = [
    {
      label: "Select Customer",
      options: [
        { label: "External Customer", value: "External Customer" },
        { label: "Internal Customer", value: "Internal Customer" },
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="View Customer" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>Map with WeDoc Users</h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>WeDoc Users</Label>
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
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">
                            First name :
                          </Label>
                          &#160; Zaid
                          {/* <AvField
                             name="firstname"
                             placeholder="First name"
                             type="text"
                             errorMessage="Enter First Name"
                             className="form-control"
                             validate={{ required: { value: true } }}
                             id="validationCustom01"
                           /> */}
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Last name :
                          </Label>
                          &#160; Khan
                          {/* <AvField
                             name="lastname"
                             placeholder="Last name"
                             type="text"
                             errorMessage="Enter Last name"
                             className="form-control"
                             validate={{ required: { value: true } }}
                             id="validationCustom02"
                           /> */}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>E-Mail:</Label> &#160; zaidkhan.a888@gmail.com
                          {/* <AvField
                             name="email"
                             label="E-Mail:"
                             placeholder="Enter Valid Email"
                             type="email"
                             errorMessage="Invalid Email"
                             validate={{
                               required: { value: true },
                               email: { value: true },
                             }}
                           /> */}
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Company:</Label>&#160;Google
                          {/* <AvField
                             name="email"
                             label="Company"
                             placeholder="Enter Company"
                             type="email"
                             errorMessage="Invalid Email"
                             validate={{
                               required: { value: true },
                               email: { value: true },
                             }}
                           /> */}
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Gender:</Label>&#160;Male
                          {/* <Select
                             value={selectedGroup}
                             onChange={() => {
                               handleSelectGroup();
                             }}
                             options={optionGroup}
                             classNamePrefix="select2-selection"
                           /> */}
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Mobile:</Label>&#160;1-(555)-555-5555
                          {/* <AvField
                             name="email"
                             label="Mobile"
                             defaultValue="1-(555)-555-5555"
                             type="tel"
                             // errorMessage="Invalid Email"
                             // validate={{
                             // required: { value: true },
                             // email: { value: true },
                             // }}
                           /> */}
                        </div>
                      </Col>
                    </Row>
                    <h4>Address</h4>
                    <hr />
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label className="form-label">Street Address:</label>
                          Delhi,India
                          {/* <input
                             className="form-control"
                             type="text"
                             placeholder="Enter Street Address"
                           /> */}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Province:</Label>&#160;xyz
                          {/* <Select
                             value={selectedGroup}
                             onChange={() => {
                               handleSelectGroup();
                             }}
                             options={optionGroup2}
                             classNamePrefix="select2-selection"
                           /> */}
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>City:</Label>&#160;Delhi
                          {/* <Select
                             value={selectedGroup}
                             onChange={() => {
                               handleSelectGroup();
                             }}
                             options={optionGroup}
                             classNamePrefix="select2-selection"
                           /> */}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Suburb:</Label>&#160;xyz
                          {/* <Select
                             value={selectedGroup}
                             onChange={() => {
                               handleSelectGroup();
                             }}
                             options={optionGroup2}
                             classNamePrefix="select2-selection"
                           /> */}
                        </div>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Zip:</Label>
                          &#160;250101
                          {/* <AvField
                             name="zip"
                             placeholder="Zip Code"
                             type="text"
                             errorMessage=" Please provide a valid zip."
                             className="form-control"
                             validate={{ required: { value: true } }}
                             id="validationCustom05"
                           /> */}
                        </FormGroup>
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
                                  Last update 6 years ago
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

          {/* <Row>
             <Col>
               <Card>
                 <CardBody>
                   <h4>
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
                   </Row>
                   <Button color="primary" type="submit">
                     submit
                   </Button>
                 </CardBody>
               </Card>
             </Col>
           </Row> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewCustomer;
