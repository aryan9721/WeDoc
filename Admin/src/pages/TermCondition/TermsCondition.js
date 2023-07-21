import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Row,
  Button,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
const TermsCondition = () => {
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  //form Data

  const requestDataSubmit = () => {};

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

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
              <Row>
                <Col lg={1}></Col>
                <Col lg={10}>
                  <Card>
                    <CardBody>
                      <h4 className="card-title">Terms and Conditions</h4>
                      <div className="wizard clearfix">
                        <div className="content clearfix">
                          <div className="body">
                            <Form>
                              <Row>
                                <Col lg="2"> </Col>
                                <Col lg="8">
                                  <Input
                                    type="textarea"
                                    id="textarea"
                                    // value={requestDetail}
                                    // onChange={(e) => {
                                    //   textareachange(e);
                                    // }}
                                    maxLength="225"
                                    rows="21"
                                    placeholder="This Description has a limit of 400 chars."
                                  />

                                  <span className="badgecount badge badge-success">
                                    jhfbwgj{textcount} / 400{" "}
                                  </span>
                                </Col>
                                <Col lg="2"> </Col>
                              </Row>
                              <Row className="text-center">
                                <Col>
                                  <Button
                                    color="primary"
                                    className="btn btn-primary waves-effect waves-light"
                                  >
                                    Post
                                  </Button>{" "}
                                </Col>
                              </Row>
                            </Form>
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

export default TermsCondition;
