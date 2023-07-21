import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap";
import {
  Button,
  ButtonDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Reference = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [reference, setReferencer] = useState();
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  // console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/references`, requestOptions)
      .then((response) => response.json())
      .then((result) => setReferencer(result))
      .catch((error) => console.log("error", error));
  }, []);

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
              <Row
                style={{
                  marginLeft: 10,
                }}
              >
                <h3>Reference</h3>
              </Row>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col lg={10}></Col>
                        <Col lg={2}>
                          <div className="btn-group me-1 mb-2">
                            <ButtonDropdown>
                              <Button id="caret" color="primary">
                                Recent{" "}
                                <i className="mdi mdi-filter-variant"></i>
                              </Button>
                            </ButtonDropdown>
                          </div>{" "}
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Patient Name</th>
                              <th>Contact No.</th>
                              <th>Reason</th>
                              <th>Referred To</th>
                              <th>Referred From</th>
                              <th>Date of reference</th>
                              <th>Time of reference</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reference &&
                              reference.map((reference, id) => (
                                <tr key={id}>
                                  <th scope="row">{id + 1}</th>
                                  <td>{reference ? reference.name : null}</td>
                                  <td>
                                    {reference ? reference.contact : null}
                                  </td>
                                  <td>{reference ? reference.reason : null}</td>
                                  <td>
                                    {reference ? reference.referredTo : null}
                                  </td>
                                  <td>
                                    {reference ? reference.referredFrom : null}
                                  </td>
                                  <td>
                                    {reference
                                      ? new Date(
                                          reference.referenceDateTime
                                        ).toLocaleDateString("en-GB")
                                      : null}
                                  </td>

                                  <td>
                                    {reference
                                      ? new Date(
                                          reference.referenceDateTime
                                        ).toLocaleTimeString("en-US", {
                                          hour: "numeric",
                                          minute: "numeric",
                                          second: "numeric",
                                          hour12: true,
                                        })
                                      : null}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>

                  <Row>
                    <Col sm="6">
                      <div>
                        <p className="mb-sm-0">Page 1 of 97</p>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="float-sm-end">
                        <Pagination className="pagination pagination-rounded mb-sm-0">
                          <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Reference;
