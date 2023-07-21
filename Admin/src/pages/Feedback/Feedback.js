import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Button,
  TabContent,
  TabPane,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
const Feedback = () => {
  function requestDataSubmit() {}

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container fluid={true} className="p-3">
              <Header />
              <Breadcrumbs
                title="Feedback"
                breadcrumbItem="Home &#187; Feedback"
              />
              <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="content clearfix">
                          <div className="body">
                            <TabContent>
                              <TabPane>
                                <Form>
                                  <Row>
                                    <Col lg="2"> </Col>
                                    <Col lg="8">
                                      <div>
                                        <Label>Enter your feedback</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          // value={requestDetail}
                                          maxLength="225"
                                          rows="12"
                                          placeholder="..."
                                        />
                                      </div>
                                    </Col>
                                    <Col lg="2"> </Col>
                                  </Row>
                                  <Row className="text-center mt-2">
                                    <Col>
                                      <Button
                                        color="primary"
                                        // disabled={itemRequestLoading}
                                        onClick={() => requestDataSubmit()}
                                        className="btn btn-primary waves-effect waves-light"
                                      >
                                        Submit
                                      </Button>{" "}
                                    </Col>
                                  </Row>
                                </Form>
                              </TabPane>
                            </TabContent>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={1}></Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Feedback;
