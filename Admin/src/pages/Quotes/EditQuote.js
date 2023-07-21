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
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import { updateMstCrmQuote, mstCrmQuotes } from "../../services/graphql";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditQuotes = () => {
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [idx, setidx] = useState(1);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [createdDate, setCreatedDate] = useState("");
  const [storageData, setStorageData] = useState({});
  const [customerId, setCustomerId] = useState("");

  const [selectedGroup, setselectedGroup] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [quoteNo, setQuoteNo] = useState("");
  const [quoteId, setQuoteId] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [quoteFooter, setQuoteFooter] = useState("");
  const { addToast } = useToasts();
  const [
    fetchEditQuotesData,
    { loading: editQuotesLoading, data: editQuotesData },
  ] = useMutation(updateMstCrmQuote);

  useEffect(() => {
    fetchEditQuotesData();
  }, [fetchEditQuotesData]);
  useEffect(() => {
    fetchEditQuotesData();
  }, [fetchEditQuotesData]);
  const [fetchQuotesData, { loading: QuotesLoading, data: QuotesData }] =
    useLazyQuery(mstCrmQuotes);
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

  useEffect(() => {
    if (QuotesData && QuotesData.mstCrmQuotes) {
      setCompanyId(QuotesData.mstCrmQuotes.companyId);
      setQuoteNo(QuotesData.mstCrmQuotes.quoteNo);
      setQuoteDescription(QuotesData.mstCrmQuotes.quoteDescription);
      setQuoteId(QuotesData.mstCrmQuotes.quoteId);
      setQuoteFooter(QuotesData.mstCrmQuotes.quoteFooter);
      setCreatedDate(QuotesData.mstCrmQuotes.createdDate);
      setQuantity(QuotesData.mstCrmQuotes.quantity);
      setidx(QuotesData.mstCrmQuotes.date);
    }
  }, [QuotesData]);

  function handleUpdate(e) {
    if (quoteNo === "") {
      addToast("quoteNo not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (quoteId === "") {
      addToast("quoteId not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    fetchEditQuotesData({
      variables: {
        companyId: Number(companyId),
        quoteNo: quoteNo,
        quoteId: Number(2),
        quoteDescription: quoteDescription,
        quoteFooter: quoteFooter,

        quantity: quantity,
        createdDate: createdDate,
      },
    });
  }
  useEffect(() => {
    // if (editCustomerData && editCustomerData.updateMstCrmCustomer)
    setStorageData({
      CompanyId: companyId,
      createdDate: createdDate,
      quoteFooter: quoteFooter,

      quoteNo: quoteNo,
      quoteId: quoteId,
      customerId: customerId,
      quoteDescription: quoteDescription,
      quantity: quantity,
    });
  }, [
    createdDate,
    companyId,
    customerId,
    quoteDescription,

    quoteFooter,
    quoteId,
    quoteNo,
    quantity,
  ]);
  // const handleUpdate = () => {
  //   let data =
  //     companyId +
  //     ":" +
  //     createdDate +
  //     ":" +
  //     quoteDescription +
  //     ":" +
  //     quoteId +
  //     ":" +
  //     quoteFooter +
  //     ":" +
  //     quoteNo +
  //     ":" +
  //     customerId +
  //     ":" +
  //     quantity;
  //   let buff = new Buffer(data);
  //   let base64data = buff.toString("base64");
  //   fetchEditQuotesData({
  //     variables: { jti: "hhhyyyyyy" },
  //     context: { headers: { Authorization: `Basic ${base64data}` } },
  //   });
  //   localStorage.setItem("editquotesData", JSON.stringify(data));
  // };

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
          <Breadcrumbs title="Forms" breadcrumbItem="Edit Quote" />
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
                        <Select
                          value={quoteNo}
                          onChange={(e) => setQuoteNo(e)}
                          options={optionGroup1}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                    <Col>
                      {/* <div className="form-group mt-4"> */}
                      {/* <AvField
                          name="birthDate"
                          type="date"
                          label="Birth Date"
                          class="form-control"
                          placeholder="Enter Your Birthdate"
                          // value={this.state.birthDate}
                          //        onChange={this.handleChange}

                          required
                        />
                        <AvField name="idx" value={idx} type="hidden" />
                      </div> */}
                      <div className="col-md-10">
                        <Label>Date</Label>
                        <input
                          className="form-control"
                          type="date"
                          value={createdDate}
                          onChange={(e) => setCreatedDate(e.target.value)}
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
                          <Label htmlFor="validationCustom02">Unit Type</Label>
                          <AvField
                            name="Unit Type"
                            placeholder="Unit Type..."
                            type="text"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
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
                      </Col>
                    </Row>
                    <hr />
                    <Button
                      color="primary"
                      type="submit"
                      className="mb-3"
                      onClick={() => handleUpdate()}
                    >
                      <i className="uil-plus-circle"></i>Submit
                    </Button>

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

export default EditQuotes;
