import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import moment from "moment";
import {
  Button,
  Card,
  CardBody,
  Col,
  NavItem,
  Container,
  TabContent,
  Label,
  TabPane,
  NavLink,
  Modal,
  Nav,
  Row,
  FormGroup,
  Form,
  Input,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { getOrders } from "../../../store/actions";
import EcommerceOrderColumns from "./EcommerceOrderColumns";
import EcommerceOrdersModal from "./EcommerceOrdersModal";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { prdOrderDetails } from "../../../services/graphql";
import classnames from "classnames";
const ViewOrders = (props) => {
  let { orderID } = props.location.state || {};
  
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [orderData, setOrderData] = useState(null);
  const [orderUser, setOrderUser] = useState(null)
  const [product, setProduct] = useState(null)

  const [fetchOrdersdetail, { loading: orderdetailLoding, data: ordersDetails }] =
    useLazyQuery(prdOrderDetails);

  useEffect(() => {
    fetchOrdersdetail({
      variables: {
        id: Number(orderID),
      },
    });
  }, [fetchOrdersdetail]);

  useEffect(() => {
    if (ordersDetails && ordersDetails.prdOrderDetails) {
      setOrderData(ordersDetails.prdOrderDetails);
      setOrderUser(ordersDetails.prdOrderDetails.order.user || {})
      setProduct(ordersDetails.prdOrderDetails.products || {})
    }
  }, [ordersDetails]);

  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [modal_scroll, setmodal_scroll] = useState(false);
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
  const optionGroup = [
    {
      label: "Document Type",
      options: [
        { label: "CV", value: "CV" },
        { label: "Passport", value: "Passport" },
        { label: "Cipro", value: "Cipro" },
        { label: "BEE", value: "BEE" },
        { label: "Qualification", value: "Qualification" },
        { label: "Industry", value: "Industry" },
        { label: "ID", value: "ID" },
        { label: "Photo", value: "Photo" },
      ],
    },
  ];


  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }
  function tog_scroll() {
    setmodal_scroll(!modal_scroll);
    removeBodyCss();
  }
  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="View Order Details" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "5",
                        })}
                        onClick={() => {
                          toggleCustomJustified("5");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">
                          General Details
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "16",
                        })}
                        onClick={() => {
                          toggleCustomJustified("16");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">Product List</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "50",
                        })}
                        onClick={() => {
                          toggleCustomJustified("50");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-envelope"></i>
                        </span>
                        <span className="d-none d-sm-block">Order Status</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <hr />
                  <TabContent activeTab={activeTabJustify}>
                    <TabPane tabId="5" className="p-3">
                      <Row>
                        <Col>
                          <div className="mb-3">
                            <Label>Customer Name:</Label>&#160;{ orderUser && orderUser.firstName +' '+orderUser.lastName}
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
                        <Col>
                          <div className="col-md-10">
                            <Label>Order Date:</Label>&#160;{orderData && moment(orderData.order.orderDate).format(
                                        "YYYY-MM-DD"
                                      )}
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
                          <div className="col-md-10">
                            <Label>Order Number:</Label>&#160;{orderData && orderData.order.orderIdstring}
                            {/* <input
                           className="form-control"
                           type="date"
                           defaultValue="2019-08-19"
                           id="example-date-input"
                         /> */}
                          </div>
                        </Col>
                        <Col>
                          <div className="col-md-10">
                            <Label>Date:</Label>&#160;{ orderData && moment(orderData.order.createDate).format(
                                        "YYYY-MM-DD"
                                      )}
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
                            <Label>OrderTotal:</Label>&#160;R { orderData && orderData.orderAmount}
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
                          </div>
                        </Col>
                        <Col>
                          <div className="col-md-10">
                            <Label>Payment Date:</Label>&#160;{ orderData && moment(orderData.order.paymentDate).format(
                                        "YYYY-MM-DD"
                                      )}
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
                            <Label>Order Status:</Label>&#160;Order Placed
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
                            {/* {textareabadge ? (
                          <span className="badgecount badge badge-success">
                            {" "}
                            {textcount} / 225{" "}
                          </span>
                        ) : null} */}
                          </div>
                        </Col>
                        <Col>
                          <div className="col-md-10">
                            <Label>Expiry Date:</Label>&#160;{orderData && moment(orderData.order.expiredDate).format(
                                        "YYYY-MM-DD"
                                      )}
                            {/* <input
                           className="form-control"
                           type="date"
                           defaultValue="2019-08-19"
                           id="example-date-input"
                         /> */}
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="16" className="p-3">
                      <Col xl={4} md={6}>
                        <Modal
                          isOpen={modal_scroll}
                          toggle={() => {
                            tog_scroll();
                          }}
                          scrollable={true}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">
                              Scrollable modal
                            </h5>
                            <button
                              type="button"
                              onClick={() => setmodal_scroll(false)}
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Category</Label>
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
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Keywords</Label>
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
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period</Label>
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
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period Type</Label>
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
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Quantity</Label>
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
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Volume</Label>
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

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setmodal_scroll(false)}
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </Col>
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Product Name</th>
                              <th>Product Price </th>
                              <th>Order Quantity </th>
                              <th>Order Amount </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                {product && product.productName}
                              </th>
                              <th scope="row">R { product && product.unitCost}</th>
                              <th scope="row">{ orderData && orderData.orderQuantity}</th>
                              <th scope="row">{ orderData && orderData.orderAmount}</th>
                              <td>
                                <Button
                                  color="danger"
                                  outline
                                  className="waves-effect waves-light"
                                >
                                  Download
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabPane>
                    <TabPane tabId="50" className="p-3">
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Order Status </th>
                              <th>Order Date </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Order Placed</th>

                              <th scope="row">{orderData && moment(orderData.order.orderDate).format(
                                        "YYYY-MM-DD"
                                      )}</th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ViewOrders;
