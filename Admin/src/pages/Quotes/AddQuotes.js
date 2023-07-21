import React, { useState, useEffect } from "react";

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
import { createMstCrmQuote } from "../../services/graphql";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import jwt from "jsonwebtoken";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddQuotes = () => {
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });

  // amount: 500000.00,
  //       companyId: 2,
  //       createdBy: 2,
  //       createdDate: "2016-01-06T22:41:53.32",
  //       customerId: 1,
  //       isActive: true,
  //       modifiedBy: null,
  //       modifiedDate: null,
  //       quoteDate: "2016-01-07T00:00:00",
  //       quoteDescription: "Door of BMW",
  //       quoteFooter: "Door of BMW",
  //       quoteId: 0,
  //       quoteNo: "QUOTE - 00021",
  //       totalAmount: 570000.00,
  //       vatamount: 70000.00
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [createdDate, setCreatedDate] = useState("");

  const [selectedGroup, setselectedGroup] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [quoteNo, setQuoteNo] = useState("");
  const [quotesName, setquotesName] = useState("");
  const [quoteId, setQuoteId] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteFooter, setQuoteFooter] = useState("");
  const { addToast } = useToasts();

  const [
    AddQuotesData,
    { loading: addQuotesDataLoading, data: addQuotesData },
  ] = useMutation(createMstCrmQuote);

  useEffect(() => {
    if (addQuotesData && addQuotesData.createMstCrmQuote) {
      if (addQuotesData.createMstCrmQuote.success === true) {
        addToast(addQuotesData.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setQuantity("");

        setQuoteId(null);
        setCompanyId(null);
        setQuoteDescription("");
        setQuoteFooter("");
        setQuoteNo("");
        setquotesName("");
        setCreatedDate("");

        window.location.reload();
      }
    }
  }, [addQuotesData]);

  const quotesDataSubmit = () => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);

    // if (inventoryId === "") {
    //   addToast("userId not empty", { appearance: "error", autoDismiss: true });
    //   return;
    // }

    if (setCompanyId === "") {
      addToast("contactNo not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    AddQuotesData({
      variables: {
        mstCrmQuote: {
          amount: 500000.0,
          companyId: Number(decodeJwt.companyId),
          createdBy: 2,
          createdDate: "2016-01-06T22:41:53.32",
          customerId: 1,
          isActive: true,
          modifiedBy: null,
          modifiedDate: null,
          quotesName: quotesName,
          quoteDate: "2016-01-07T00:00:00",
          quoteDescription: quoteDescription,
          quoteFooter: "Door of BMW",
          quoteId: Number(quoteId),
          quoteNo: "QUOTE - 00021",
          totalAmount: 570000.0,
          vatamount: 70000.0,
        },
      },
    });
  };
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
          <Breadcrumbs title="Forms" breadcrumbItem="Add New Quote" />
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
                        <Label>Customer Name</Label>
                        {/* <Select
                            value={selectedGroup}
                            onChange={() => {
                              handleSelectGroup();
                            }}
                            options={optionInventoryType}
                            classNamePrefix="select2-selection"
                          /> */}
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
                    <Col>
                      <div className="col-md-10">
                        <Label>Date</Label>
                        <input
                          className="form-control"
                          type="date"
                          value={createdDate}
                          onChange={(e) => setCreatedDate(e)}
                          defaultValue="2019-08-19"
                          id="example-date-input"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-3">
                        <Label>Quote Footer</Label>
                        <Input
                          type="textarea"
                          id="textarea"
                          value={quoteFooter}
                          onChange={(e) => setQuoteFooter(e.target.value)}
                          maxLength="225"
                          rows="4"
                          placeholder="Description..."
                        />
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
                        <Label>Quote Description (Office Use)</Label>
                        <Input
                          type="textarea"
                          id="textarea"
                          value={quoteDescription}
                          onChange={(e) => setQuoteDescription(e.target.value)}
                          maxLength="225"
                          rows="4"
                          placeholder="Description..."
                        />
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
                  <h4>Items in Quote</h4>
                  <hr />
                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Quantity</Label>
                          <input
                            className="form-control"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            type="number"
                            defaultValue="1"
                            id="example-number-input"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Unit Price</Label>
                          <AvField
                            name="Unit price"
                            placeholder="Unit Price..."
                            type="text"
                            value={quoteId}
                            onChange={(e) => setQuoteId(e.target.value)}
                            errorMessage="Enter Unit Type"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Quotes Type
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
                      </Col>
                    </Row>
                    <hr />
                    <Button
                      color="primary"
                      type="submit"
                      className="mb-3"
                      onClick={() => quotesDataSubmit()}
                    >
                      <i className="uil-plus-circle"></i>Submit
                    </Button>

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
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>@fat</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>@twitter</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <b>Amount = </b>
                            <br />
                            <b>VAT (14%) = 0</b>
                            <br />
                            <b>Total Amount = 0</b>
                          </CardBody>
                        </Card>
                        <hr />
                        <Button color="primary" type="submit">
                          <i className="bx bx-save"></i>Save
                        </Button>
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

export default AddQuotes;
