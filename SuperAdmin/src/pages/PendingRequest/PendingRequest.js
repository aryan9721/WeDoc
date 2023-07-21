import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import {
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const PendingRequest = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [drp_danger1, setDrp_danger1] = useState(false);
  const [association, setAssociation] = useState();

  //Association k dropdown  liye calling get api here
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
    fetch(`${REACT_APP_API_ENDPOINT}/association`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAssociation(result))
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
                <h3>Pending Request</h3>
              </Row>

              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col lg={8}> </Col>
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
                        <Col lg={2}>
                          <div className="btn-group me-1 mb-2">
                            <ButtonDropdown
                              isOpen={drp_danger1}
                              toggle={() => setDrp_danger1(!drp_danger1)}
                            >
                              <Button id="caret" color="primary">
                                Associations
                              </Button>
                              <DropdownToggle
                                caret
                                color="primary"
                                className="dropdown-toggle-split"
                              >
                                <i className="mdi mdi-chevron-down" />
                              </DropdownToggle>
                              <DropdownMenu>
                                {association &&
                                  association.map((index, id) => (
                                    <DropdownItem key={id}>
                                      {index ? index.name : null}
                                    </DropdownItem>
                                  ))}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </div>{" "}
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Profile Photo</th>
                              <th>Doctor Name</th>
                              <th>Degree</th>
                              <th>Occupation</th>
                              <th>Association</th>
                              <th>Speciality</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">01</th>
                              <td>
                                <img
                                  src={avatar4}
                                  className="rounded avatar-md"
                                  alt=""
                                />
                              </td>
                              <td>Dr. Ajit Pawar</td>
                              <td>BHMS</td>
                              <td>Working</td>
                              <td>Baner</td>
                              <td>Proctology</td>
                              <td>
                                <Button
                                  color="success"
                                  className="btn btn-success waves-effect waves-light mx-1"
                                >
                                  Approve
                                </Button>{" "}
                                <Button
                                  color="danger"
                                  className="btn btn-danger waves-effect waves-light mx-1"
                                >
                                  Reject
                                </Button>{" "}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">02</th>
                              <td>
                                <img
                                  src={avatar5}
                                  className="rounded avatar-md"
                                  alt=""
                                />
                              </td>
                              <td>Dr. Ajit Pawar</td>
                              <td>BHMS</td>
                              <td>Working</td>
                              <td>Baner</td>
                              <td>Proctology</td>
                              <td>
                                <Button
                                  color="success"
                                  className="btn btn-success waves-effect waves-light mx-1"
                                >
                                  Approve
                                </Button>{" "}
                                <Button
                                  color="danger"
                                  className="btn btn-danger waves-effect waves-light mx-1"
                                >
                                  Reject
                                </Button>{" "}
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">03</th>
                              <td>
                                <img
                                  src={avatar6}
                                  className="rounded avatar-md"
                                  alt=""
                                />
                              </td>
                              <td>Dr. Ajit Pawar</td>
                              <td>BHMS</td>
                              <td>Working</td>
                              <td>Baner</td>
                              <td>Proctology</td>
                              <td>
                                <Button
                                  color="success"
                                  className="btn btn-success waves-effect waves-light mx-1"
                                >
                                  Approve
                                </Button>{" "}
                                <Button
                                  color="danger"
                                  className="btn btn-danger waves-effect waves-light mx-1"
                                >
                                  Reject
                                </Button>{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PendingRequest;
