import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Table,
  CardTitle,
  Label,
  Input,
  Row,
  Col,
  Button,
  Spinner,
} from "reactstrap";
import { isEmpty, map } from "lodash";
import { Link } from "react-router-dom";

import "react-perfect-scrollbar/dist/css/styles.css";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { prdOrderPayments } from "../../services/graphql";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";

const LatestTransaction = (props) => {
  const [transactionList, setTransactionList] = useState([]);
  const [
    fetchTransactionList,
    { loading: TransactionLoading, data: transactionListData },
  ] = useLazyQuery(prdOrderPayments);

  useEffect(() => {
    fetchTransactionList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchTransactionList]);

  useEffect(() => {
    if (transactionListData && transactionListData.prdOrderPayments) {
      setTransactionList(transactionListData.prdOrderPayments.data);
    }
  }, [transactionListData]);

  const rowData = [
    {
      amount: "R100",
      createdBy: "krivahn",
      createdDate: "10/12/2022",
      orderId: "34",
      orderPaymentId: "32",
      paymentDate: "12/12/2022",
      paymentModeId: "23",
      paymentRefNo: "21",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataTransactionList = (TransactionListList) => {
    TransactionListList.forEach((datum) => {
      finalList.push({
        amount: datum.amount,
        createdBy: datum.createdBy,
        createdDate: datum.createdDate,
        orderId: datum.orderId,
        orderPaymentId: datum.orderPaymentId,
        paymentDate: datum.paymentDate,
        paymentModeId: datum.paymentModeId,
        paymentRefNo: datum.paymentRefNo,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let TransactionList =
    transactionList.length === 0
      ? rowData
      : makeDataTransactionList(transactionList);

  const data = {
    rows: TransactionList,
  };

  return (
    <Row>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle className="h4 mb-4">Reference List</CardTitle>
            <div className="table-responsive">
              <Table className="table-centered table-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Sr.No</th>
                    <th>Patient Name</th>
                    <th>Contact No.</th>
                    <th>Reason</th>
                    <th>Reffered To</th>
                    <th>Referred From</th>
                    <th>Date of referrence</th>
                    <th>Time of referrence</th>
                  </tr>
                </thead>
                {isEmpty(transactionList) && TransactionLoading && (
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

                {!isEmpty(transactionList) &&
                  transactionList.map((data, key) => (
                    <tbody key={"kk" + key}>
                      <tr>
                        <td>
                          <Link>{data.orderId}</Link>
                        </td>
                        <td>{data.paymentRefNo}</td>
                        <td>{data.paymentDate}</td>
                        <td>{data.amount}</td>
                        <td>{data.name} Dr. Name</td>
                        <td>{data.name} Dr. Name</td>
                        <td>16/12/2022</td>
                        <td>01:00 PM</td>
                      </tr>
                    </tbody>
                  ))}
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default LatestTransaction;
