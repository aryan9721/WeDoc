import React from "react";
import {
  Card,
  CardBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import SimpleBar from "simplebar-react";

const RecentActivity = (props) => {
  const { auditLogData } =props;
  return (
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
                Recent<i className="mdi mdi-chevron-down ms-1"></i>
              </span>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem href="#">Recent</DropdownItem>
              <DropdownItem href="#">By Users</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <h4 className="card-title mb-4">Recent Activity</h4>

        <SimpleBar
          className="activity-feed mb-0 ps-2"
          style={{ maxHeight: "336px" }}
        >
          {auditLogData.map((item, index) => (
          <li className="feed-item">
            <div className="feed-item-list">
              <p className="text-muted mb-1 font-size-13">
                Today<small className="d-inline-block ms-1">{item.createdDate}</small>
              </p>
              <p className="mt-0 mb-0">
                {item.auditLog}
              </p>
            </div>
          </li>
          ))}
         
        </SimpleBar>
      </CardBody>
    </Card>
  );
};

export default RecentActivity;
