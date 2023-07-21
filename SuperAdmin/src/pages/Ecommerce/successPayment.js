import React from "react";
import {
  Alert,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  UncontrolledAlert,
  Container,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const SuccessPayment = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="UI Elements" breadcrumbItem="Alerts" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4 mb-0">Alert Examples</CardTitle>
                  <Row>
                    <Col>
                      <UncontrolledAlert
                        color="success"
                        className="alert-success alert-dismissible fade show mt-4 px-4 mb-0 text-center"
                        role="alert"
                      >
                        <i className="uil uil-check-circle d-block display-4 mt-2 mb-3 text-success"></i>
                        <h5 className="text-success">Success</h5>
                        <p>Payment Successful</p>
                      </UncontrolledAlert>
                    </Col>

                    <Button
                      color="primary"
                      className="btn btn-success btn-lg btn-block waves-effect waves-light mt-4"
                    >
                      Okay
                    </Button>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SuccessPayment;
