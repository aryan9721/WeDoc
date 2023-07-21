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
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Row,
  Form,
  Input,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import { getOrders } from "../../../store/actions";
import EcommerceOrderColumns from "./EcommerceOrderColumns";
import EcommerceOrdersModal from "./EcommerceOrdersModal";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { prdOrdersForBusiness } from "../../../services/graphql";

const EcommerceOrders = (props) => {
  const { orders, onGetOrders, history } = props;
  const [modal, setModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const pageOptions = {
    sizePerPage: 10,
    totalSize: 50, // replace later with size(orders),
    custom: true,
  };

  const { SearchBar } = Search;

  // useEffect(() => {
  //   onGetOrders();
  //   setOrderList(orders);
  // }, [onGetOrders, orders]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) setOrderList(orders);
  // }, [orders]);

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setOrderList(
      orders.filter((order) =>
        Object.keys(order).some(
          (key) =>
            typeof order[key] === "string" &&
            order[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const [fetchOrdersForBusiness, { data: ordersForBusiness }] =
    useLazyQuery(prdOrdersForBusiness);

  useEffect(() => {
    fetchOrdersForBusiness({
      variables: {
        orderStatusTypeId: null,
        salesTypeId: null,
        scopeId: null,
        paymentStatusId: null,
        typeId: null,
        categoryId: null,
        productId: null,
        fromDate: null,
        toDate: null,
        page: 1,
        size: 10,
      },
    });
  }, [fetchOrdersForBusiness]);

  useEffect(() => {
    if (ordersForBusiness && ordersForBusiness.prdOrdersForBusiness) {
      setOrderList(ordersForBusiness.prdOrdersForBusiness.result);
    }
  }, [ordersForBusiness]);

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal} toggle={toggleModal} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="ORDER LIST" />
          <Row>
            <Col xs="12">
              <Card>
                {!isEmpty(orderList) && (
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="id"
                          data={orderList || []}
                          columns={EcommerceOrderColumns(toggleModal,history)}
                          bootstrap4
                          search
                        >
                          {(toolkitProps) => (
                            <React.Fragment>
                              <Row>
                                <Col lg="12">
                                  <Row>
                                    <Col sm="12" md="6">
                                      <Label>
                                        Show{" "}
                                        <Input
                                          type="select"
                                          className="custom-select custom-select-sm form-control form-control-sm form-select form-select-sm d-inline-block"
                                          style={{ width: "auto" }}
                                        >
                                          <option value="10">10</option>
                                          <option value="25">25</option>
                                          <option value="50">50</option>
                                          <option value="100">100</option>
                                        </Input>
                                      </Label>
                                    </Col>
                                    <Col sm="12" md="6">
                                      <Label className="float-end">
                                        Search:{" "}
                                        <SearchBar
                                          {...toolkitProps.searchProps}
                                        />
                                      </Label>
                                    </Col>
                                  </Row>
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      responsive
                                      remote
                                      bordered={false}
                                      striped={false}
                                      classes={
                                        "table-centered datatable dt-responsive nowrap table-card-list"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      onTableChange={handleTableChange}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

const mapStateToProps = (state) => ({
  orders: state.ecommerce.orders,
});

const mapDispatchToProps = (dispatch) => ({
  onGetOrders: () => dispatch(getOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EcommerceOrders));
