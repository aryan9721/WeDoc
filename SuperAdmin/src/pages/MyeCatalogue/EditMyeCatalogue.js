import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Table,
  Button,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Modal,
  CardText,
  TabContent,
  TabPane,
} from "reactstrap";

import classnames from "classnames";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

const EditMyeCatalogue = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [activeTabVartical, setoggleTabVertical] = useState(1);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab);
      }
    }
  }

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

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
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Edit My Catalogue" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{""}</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1);
                            }}
                          >
                            <span className="number">
                              {" "}
                              <i className="uil-pen"></i>
                            </span>{" "}
                            Catalogue Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2);
                            }}
                          >
                            <span className="number me-2">
                              {" "}
                              <i className="uil-list-ul"></i>
                            </span>{" "}
                            Category
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3);
                            }}
                          >
                            <span className="number">
                              {" "}
                              <i className="uil-map"></i>
                            </span>{" "}
                            Upload Documents
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4);
                            }}
                          >
                            <span className="number">
                              <i className="uil-image"></i>
                            </span>{" "}
                            Upload Photos
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <div className="body">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={1}>
                            <Form>
                              <Row>
                                <Col className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                  >
                                    Title
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      defaultValue=""
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <div className="mt-3">
                                    <Label>Description</Label>

                                    <Input
                                      type="textarea"
                                      id="textarea"
                                      onChange={(e) => {
                                        textareachange(e);
                                      }}
                                      maxLength="225"
                                      rows="7"
                                      placeholder="This Description has a limit of 400 chars."
                                    />
                                    {textareabadge ? (
                                      <span className="badgecount badge badge-success">
                                        {" "}
                                        {textcount} / 400{" "}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-3">
                                <Col md={6}>
                                  <div className="mt-3">
                                    <Label>Start Date</Label>
                                    <div className="col-md-10">
                                      <input
                                        className="form-control"
                                        type="date"
                                        defaultValue="2019-08-19"
                                        id="example-date-input"
                                      />
                                    </div>
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <div className="mt-3">
                                    <Label>End Date</Label>
                                    <div className="col-md-10">
                                      <input
                                        className="form-control"
                                        type="date"
                                        defaultValue="2019-08-19"
                                        id="example-date-input"
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              {/* <Row className="mb-3">
                                <Label>Amount (R)</Label>
                                <div className="col-md-10">
                                  <input
                                    className="form-control"
                                    type="number"
                                    defaultValue="42"
                                    id="example-number-input"
                                  />
                                </div>
                              </Row> */}
                            </Form>
                          </TabPane>
                          <TabPane tabId={2}>
                            <div>
                              <Form>
                                <Row>
                                  <Col>
                                    <div className="my-4 text-center">
                                      <button
                                        type="button"
                                        className="btn btn-info waves-effect waves-light"
                                        onClick={() => {
                                          tog_backdrop();
                                        }}
                                        data-toggle="modal"
                                      >
                                        Select Category
                                        <i className="uil-edit"></i>
                                      </button>
                                      <Modal
                                        isOpen={modal_backdrop}
                                        toggle={() => {
                                          tog_backdrop();
                                        }}
                                        scrollable={true}
                                        id="staticBackdrop"
                                      >
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="staticBackdropLabel"
                                          >
                                            Select Category
                                          </h5>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                              setmodal_backdrop(false);
                                            }}
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <Row>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Automotive
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Manufacturing
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Agriculture
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Construction
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Entertainment
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>Financial</CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>Attorneys</CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={() => {
                                              setmodal_backdrop(false);
                                            }}
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                          >
                                            Main Categories
                                          </button>
                                        </div>
                                      </Modal>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div className="row justify-content-center">
                              <Col className="mb-3">
                                <label htmlFor="resume">{""}</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="resume"
                                />
                              </Col>
                            </div>
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Image</th>
                                    <th>{""}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                    <td>{""}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Submit
                            </Button>{" "}
                          </TabPane>
                          <TabPane tabId={4}>
                            <div className="row justify-content-center">
                              <Col className="mb-3">
                                <label htmlFor="resume">{""}</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="resume"
                                />
                              </Col>
                            </div>
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Image</th>
                                    <th>{""}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                    <td>{""}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <Button
                              color="primary"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Submit
                            </Button>{" "}
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditMyeCatalogue;
