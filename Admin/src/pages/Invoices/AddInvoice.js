import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  Table,
  Label,
  Input,
  Container,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddInvoice = () => {
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [selectedGroup, setselectedGroup] = useState(null);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const optionGroup = [
    {
      label: "Inventory",
      options: [
        { label: "Door of BMW", value: "Door of BMW" },
        { label: "BMW 1 Series", value: "BMW 1 Series" },
      ],
    },
  ];

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
//   const InvoiceDetail = (props) => {
//     const {
//       invoiceDetail,
//       match: { params },
//       onGetInvoiceDetail,
//     } = props;

//     useEffect(() => {
//       if (params && params.id) {
//         onGetInvoiceDetail(params.id);
//       } else {
//         onGetInvoiceDetail(1); //remove this after full integration
//       }
//     }, [params, onGetInvoiceDetail]);

//     //Print the Invoice
//     const printInvoice = () => {
//       window.print();
//     };

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Forms" breadcrumbItem="Add New Invoice" />
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <h4>Invoice Information</h4>
                    <hr />
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <Label>Customer Name </Label>
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
                      <Col>
                        <Label>Invoice Date </Label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="date"
                            defaultValue="2019-08-19"
                            id="example-date-input"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mt-3">
                          <Label>Invoice Footer *</Label>
                          <Input
                            type="textarea"
                            id="textarea"
                            onChange={(e) => {
                              textareachange(e);
                            }}
                            maxLength="225"
                            rows="3"
                            placeholder="This..."
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
                          <Label>Invoice Description (Office Use) *</Label>
                          <Input
                            type="textarea"
                            id="textarea"
                            onChange={(e) => {
                              textareachange(e);
                            }}
                            maxLength="225"
                            rows="3"
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
                    <AvForm className="needs-validation mt-3">
                      <h4>Items in Invoice</h4>
                      <hr />
                      <Row>
                        <Col md="4">
                          <div className="mb-3">
                            <Label>Inventory *</Label>
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
                        <Col md="4">
                          <FormGroup className="mb-3">
                            <Label>Quantity</Label>
                            <div className="col-md-10">
                              <input
                                className="form-control"
                                type="number"
                                defaultValue="42"
                                id="example-number-input"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup className="mb-3">
                            <Label>Unit Price</Label>
                            <div className="col-md-10">
                              <input
                                className="form-control"
                                type="number"
                                defaultValue="42"
                                id="example-number-input"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          <div className="mb-3">
                            <Button color="primary" type="submit">
                              <i className="bx bx-save"></i>Submit
                            </Button>{" "}
                            <Button color="danger" type="submit">
                              <i className="bx bx-delete"></i>Delete
                            </Button>
                          </div>
                        </Col>
                      </Row>
                      <div className="needs-validation mt-3">
                        <h4>Item List</h4>
                        <hr />

                        {!isEmpty
                        // (invoiceDetail)
                         && (
                          <div className="py-2">
                            <h5 className="font-size-15">Order summary</h5>
                            <div className="table-responsive">
                              <Table className="table-nowrap table-centered mb-0">
                                <thead>
                                  <tr>
                                    <th style={{ width: "70px" }}>No.</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th
                                      className="text-end"
                                      style={{ width: "120px" }}
                                    >
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {map(
                                    // invoiceDetail.orderSummary.items,
                                    (item, key) => (
                                      <tr key={key}>
                                        <td>{item.id}</td>
                                        <td>
                                          <h5 className="font-size-15 mb-1">
                                            {item.item}
                                          </h5>
                                          <ul className="list-inline mb-0">
                                            <li className="list-inline-item">
                                              Color :{" "}
                                              <span className="fw-medium">
                                                {item.color}
                                              </span>
                                            </li>{" "}
                                            <li className="list-inline-item">
                                              Size :{" "}
                                              <span className="fw-medium">
                                                {item.size}
                                              </span>
                                            </li>
                                          </ul>
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td className="text-end">
                                          {item.price}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr>
                                    <th colSpan="4" className="text-end">
                                      Sub Total
                                    </th>
                                    <td className="text-end">
                                      {/* {invoiceDetail.orderSummary.subTotal} */}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      colSpan="4"
                                      className="border-0 text-end"
                                    >
                                      Discount :
                                    </th>
                                    <td className="border-0 text-end">
                                      {/* - {invoiceDetail.orderSummary.discount} */}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      colSpan="4"
                                      className="border-0 text-end"
                                    >
                                      Shipping Charge :
                                    </th>
                                    <td className="border-0 text-end">
                                      {/* {invoiceDetail.orderSummary.shipping} */}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      colSpan="4"
                                      className="border-0 text-end"
                                    >
                                      Tax
                                    </th>
                                    <td className="border-0 text-end">
                                      {/* {invoiceDetail.orderSummary.tax} */}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th
                                      colSpan="4"
                                      className="border-0 text-end"
                                    >
                                      Total
                                    </th>
                                    <td className="border-0 text-end">
                                      <h4 className="m-0">
                                        {/* {invoiceDetail.orderSummary.total} */}
                                      </h4>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <div className="d-print-none mt-4">
                              <div className="float-end">
                                {/* <Link
                                  to="#"
                                  onClick={printInvoice}
                                  className="btn btn-success waves-effect waves-light me-1"
                                >
                                  <i className="fa fa-print"></i>
                                </Link>{" "} */}
                                <Link
                                  to="#"
                                  className="btn btn-primary w-md waves-effect waves-light"
                                >
                                  Save
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <hr />
                    </AvForm>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
//   };
};

export default AddInvoice;
