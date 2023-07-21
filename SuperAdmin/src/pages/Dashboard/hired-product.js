import React from "react";
import _ from "lodash";
import {
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Row,
  Col,
  UncontrolledDropdown,
} from "reactstrap";

import FeatherIcon from "feather-icons-react";
//Simple bar
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

const HiredProduct = (props) => {
  const { hiredProduct } = props;

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="float-end">
            <UncontrolledDropdown>
              <DropdownToggle
                tag="a"
                className="text-reset"
                id="dropdownMenuButton5"
                caret
              >
                <span className="text-muted">
                  All Members<i className="mdi mdi-chevron-down ms-1"></i>
                </span>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#">Locations</DropdownItem>
                <DropdownItem href="#">Revenue</DropdownItem>
                <DropdownItem href="#">Join Date</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <h4 className="card-title mb-4">Top Purchased Products By User </h4>
          <SimpleBar style={{ maxHeight: "336px" }}>
            <div className="table-responsive">
              {hiredProduct.map((item, key) => (
                <Table
                  className="table-borderless table-centered table-nowrap"
                  key={key}
                >
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="font-size-15 mb-1 fw-normal">
                          {item.userID}
                        </h6>
                      </td>
                      <td>
                        <h6 className="font-size-15 mb-1 fw-normal">
                          <i className="mdi mdi-account-circle"></i>
                          {item.firstName} {item.lastName}
                        </h6>
                        <p className="text-muted font-size-13 mb-0">
                          {/* <i className="mdi mdi-email-mark-as-unread"></i>{" "} */}
                          <Link to="/">{item.productName}</Link>
                        </p>
                      </td>
                      <td>{item.status}</td>
                      <td className="text-muted fw-semibold text-end">
                        <FeatherIcon
                          icon="trending-up"
                          className="icon-xs icon me-2 text-success"
                        />
                        R{item.purchasedAmount}.00
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ))}
            </div>
          </SimpleBar>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default HiredProduct;
