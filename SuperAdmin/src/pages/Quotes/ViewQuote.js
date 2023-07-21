import React, { useState } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Table,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ViewQuotes = () => {
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
          <Breadcrumbs title="Forms" breadcrumbItem="View Quote" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>
                    <i className="uil-plus-circle"></i>Quote Details
                  </h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Customer Name:</Label>&#160;Zaid Khan
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
                  <Row>
                    <Col>
                      <div className="col-md-10">
                        <Label>Date:</Label>&#160;07-01-2019
                        {/* <input
                           className="form-control"
                           type="date"
                           defaultValue="2019-08-19"
                           id="example-date-input"
                         /> */}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-3">
                        <Label>Quote Footer:</Label>&#160;Door of BMW
                        {/* <Input
                           type="textarea"
                           id="textarea"
                           onChange={(e) => {
                             textareachange(e);
                           }}
                           maxLength="225"
                           rows="4"
                           placeholder="Door of BMW"
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
                        <Label>Quote Description (Office Use):</Label>&#160;Door
                        of BMW
                        {/* <Input
                           type="textarea"
                           id="textarea"
                           onChange={(e) => {
                             textareachange(e);
                           }}
                           maxLength="225"
                           rows="4"
                           placeholder="Door of BMW"
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
                  <br />
                  {/* <h4>Items in Quote</h4>
                   <hr /> */}
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Quantity:</Label>
                          &#160;2
                          {/* <input
                             className="form-control"
                             type="number"
                             defaultValue="1"
                             id="example-number-input"
                           /> */}
                        </FormGroup>
                      </Col>
                      {/* <Col md="4">
                         <FormGroup className="mb-3">
                           <Label htmlFor="validationCustom02">Unit Type</Label>
                           <AvField
                             name="Unit Type"
                             placeholder="Unit Type..."
                             type="text"
                             errorMessage="Enter Unit Type"
                             className="form-control"
                             validate={{ required: { value: true } }}
                             id="validationCustom02"
                           />
                         </FormGroup>
                       </Col> */}
                      {/* <Col md="4">
                         <FormGroup className="mb-3">
                           <Label htmlFor="validationCustom02">
                             Inventory Type
                           </Label>
                           <Select
                             value={selectedGroup}
                             onChange={() => {
                               handleSelectGroup();
                             }}
                             options={optionInventoryType}
                             classNamePrefix="select2-selection"
                           />
                         </FormGroup>
                       </Col> */}
                    </Row>
                    <hr />
                    {/* <Button color="primary" type="submit" className="mb-3">
                       <i className="uil-plus-circle"></i>Submit
                     </Button> */}

                    <h4>Items in Quote</h4>
                    <hr />
                    <Row>
                      <Col>
                        <Card>
                          <CardBody>
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead className="table-light">
                                  <tr>
                                    <th>Action</th>
                                    <th>Inventory</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>Door of BMW</td>
                                    <td>2</td>
                                    <td>250000</td>
                                    <td>500000</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <b>Amount = 500000</b>
                            <br />
                            <b>VAT (14%) = 70000</b>
                            <br />
                            <b>Total Amount = 570000</b>
                          </CardBody>
                        </Card>
                        <hr />
                        {/* <Button color="primary" type="submit">
                           <i className="bx bx-save"></i>Save
                         </Button> */}
                      </Col>
                    </Row>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewQuotes;
