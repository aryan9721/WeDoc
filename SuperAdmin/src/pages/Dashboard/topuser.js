import React from "react";
import {
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  UncontrolledDropdown,
} from "reactstrap";

import FeatherIcon from "feather-icons-react";
//Simple bar
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";

//Import Image

const TopUser = (props) => {
  const { topUser } = props;

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
          <h4 className="card-title mb-4">Highest Bids</h4>
          <SimpleBar style={{ maxHeight: "336px" }}>
            <div className="table-responsive">
              {topUser.map((item, key) => (
                <Table
                  className="table-borderless table-centered table-nowrap"
                  key={key}
                >
                  <tbody>
                    <tr>
                      <td>{item.userID}</td>
                      <td>
                        <h6 className="font-size-15 mb-1 fw-normal">
                          <i className="mdi mdi-account-circle"></i>
                          {item.firstName} {item.lastName}
                        </h6>
                        <p className="text-muted font-size-13 mb-0">
                          <i className="mdi mdi-email-mark-as-unread"></i>{" "}
                          
                          <Link to="/ecommerce-products">{item.productName}</Link>
                        </p>
                        {/* <p
                                  onClick={() =>
                                    history.push(
                                      `/ecommerce-products/${product.productID}`,
                                      {
                                        productDetails: {
                                          product: product,
                                        },
                                      }
                                    )
                                  }
                                >
                                  {product.categoryName}{" "}
                                </p> */}
                      </td>
                      <td>{item.status}</td>
                      <td className="text-muted fw-semibold text-end">
                        <FeatherIcon
                          icon="trending-up"
                          className="icon-xs icon me-2 text-success"
                        />
                        R {item.purchasedAmount}.00
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

export default TopUser;
