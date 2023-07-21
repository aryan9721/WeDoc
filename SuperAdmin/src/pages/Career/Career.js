import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Button,
  TabContent,
  TabPane,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Career = () => {
  //form Data
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workplaceType, setWorkplaceType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");

  const addCareer = () => {
    console.warn({
      jobTitle,
      company,
      workplaceType,
      description,
      location,
      jobType,
    });
    let data = {
      jobTitle,
      company,
      workplaceType,
      description,
      location,
      jobType,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/career`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      // console.warn("result", result);
      result.json().then((resp) => {
        if (result.status == 200) {
          console.warn("resp", resp);
          window.open("/career", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  };

  function tog_backdrop() {
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
              <Row
                style={{
                  marginLeft: 10,
                }}
              >
                <h3>Add job opening</h3>
              </Row>

              <Row>
                <Col lg={2}>{""}</Col>
                <Col lg={8}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink>Tell us who you are hiring </NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          <div className="body">
                            <TabContent>
                              <TabPane>
                                <Form>
                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Job Title*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={jobTitle}
                                          onChange={(e) =>
                                            setJobTitle(e.target.value)
                                          }
                                          maxLength="125"
                                          rows="1"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Company Name*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={company}
                                          onChange={(e) =>
                                            setCompany(e.target.value)
                                          }
                                          maxLength="125"
                                          rows="1"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label>Workplace type*</Label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        className="form-control"
                                        value={workplaceType}
                                        required={true}
                                        onChange={(e) =>
                                          setWorkplaceType(e.target.value)
                                        }
                                      >
                                        <option
                                          value="On-Site"
                                          style={{
                                            fontSize: 16,
                                            marginTop: 4,
                                          }}
                                        >
                                          On-Site
                                        </option>
                                        <option
                                          value="Hybrid"
                                          style={{
                                            fontSize: 16,
                                            marginTop: 4,
                                          }}
                                        >
                                          Hybrid
                                        </option>
                                        <option
                                          value="Remote"
                                          style={{
                                            fontSize: 16,
                                            marginTop: 4,
                                          }}
                                        >
                                          Remote
                                        </option>
                                      </Form.Select>
                                      <Form.Text className="text-muted">
                                        Please select the type of workplace.
                                      </Form.Text>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Job Location*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={location}
                                          onChange={(e) =>
                                            setLocation(e.target.value)
                                          }
                                          maxLength="125"
                                          rows="3"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label>Job type*</Label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        className="form-control"
                                        value={jobType}
                                        onChange={(e) =>
                                          setJobType(e.target.value)
                                        }
                                        required={true}
                                      >
                                        <option>part_time</option>
                                        <option>full_time</option>
                                        <option>Contract</option>
                                        <option>Temporary</option>
                                        <option>other</option>
                                        <option>Volunteer</option>
                                        <option>Internship</option>
                                      </Form.Select>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Description*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={description}
                                          onChange={(e) =>
                                            setDescription(e.target.value)
                                          }
                                          maxLength="1000"
                                          rows="20"
                                          placeholder="Please enter your text"
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row className="text-center">
                                    <Col>
                                      <Button
                                        color="primary"
                                        onClick={() => addCareer()}
                                        className="btn btn-primary waves-effect waves-light"
                                      >
                                        Post
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
                <Col lg={2}>{""}</Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Career;
