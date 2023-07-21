import React from "react";
import { Link } from "react-router-dom";
import { Badge, Input, Label } from "reactstrap";


const EcommerceOrderColumns = (toggleModal, history) => [
  
  // {
  //   isDummyField: true,
  //   dataField: "id",
  //   text: "Id",
  //   formatter: (cellContent, row) => (
  //     <div className="form-check text-center font-size-16">
  //       <Input
  //         type="checkbox"
  //         className="form-check-input"
  //         id={"checkbox" + row.id}
  //       />
  //       <Label className="form-check-label" htmlFor={"checkbox" + row.id}>
  //         &nbsp;
  //       </Label>
  //     </div>
  //   ),
  // },
  {
    dataField: "userName",
    text: "User Name",
    sort: true,
    formatter: (cellContent, row) => (
      <Link  to={{
        pathname: '/vieworders',
        search: '',
        state: { orderID: row.orderId }
      }} className="text-dark fw-bold">
        <i className="uil-eye"></i>
      </Link>
    ),
  },
  {
    dataField: "orderIdstring",
    text: "OrderIdString",
    sort: true,
  },

  {
    dataField: "orderStatusName",
    text: "OrderStatusName",
    sort: true,
    formatter: (cellContent, row) => (
      <Badge
        className={"badge bg-pill font-size-12 bg-soft-" + row.badgeclass}
        color={row.badgeClass}
        pill
      >
        {row.paymentStatus}
      </Badge>
    ),
  },
  {
    dataField: "orderTotal",
    text: "Order Total",
    sort: true,
  },
  {
    dataField: "paymentDate",
    text: "Payment Date",
    sort: true,
  },
  {
    dataField: "expiredDate",
    text: "Expiry Date",
    sort: true,
  },

  {
    dataField: "orderAmount",
    text: "Order Amount",
    sort: true,
  },
  {
    isDummyField: true,
    dataField: "Action",
    text: "Action",
    sort: true,
    formatter: (cellContent, row) => (
      <>
        <Link  to={{
        pathname: '/vieworders',
        search: '',
        state: { orderID: row.orderId }
      }} className="text-dark fw-bold">
        <i className="uil-eye"></i>
      </Link>
      </>
    ),
  },
];

export default EcommerceOrderColumns;
