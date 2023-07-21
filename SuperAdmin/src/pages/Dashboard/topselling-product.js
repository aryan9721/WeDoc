import React from "react";
import _ from "lodash";
import {
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Row,
  Col,
  Progress,
} from "reactstrap";
import SimpleBar from "simplebar-react";
const TopProduct = (props) => {
  const { topProduct } = props;

  const progressbars = [
    {
      id: 1,
      title: "Desktops",
      value: 52,
      color: "primary",
    },
    {
      id: 2,
      title: "iPhones",
      value: 45,
      color: "info",
    },
    {
      id: 3,
      title: "Android",
      value: 48,
      color: "success",
    },
    {
      id: 4,
      title: "Tablets",
      value: 78,
      color: "warning",
    },
    {
      id: 5,
      title: "Cables",
      value: 63,
      color: "purple",
    },
  ];

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Top Selling Products</h4>
          <SimpleBar style={{ maxHeight: "220px" }}>
            <div className="table-responsive">
              {topProduct.map((progressbar, key) => (
                <Row className="align-items-center g-0 mt-2" key={key}>
                  <Col sm={6}>
                    <p className="text-truncate mt-1 mb-0">
                      <i className="mdi mdi-circle-medium text-warning me-2"></i>
                      {progressbar.productName}
                    </p>
                  </Col>
                  <Col sm={6}>
                    <div className="mt-1" style={{ height: "6px" }}>
                      <Progress
                        value={progressbar.count}
                        color="primary"
                        size="sm"
                        className="progress-sm"
                      />
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </SimpleBar>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default TopProduct;
