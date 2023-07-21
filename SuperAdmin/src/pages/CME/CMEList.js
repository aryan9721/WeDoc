import React, { useState } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Table,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Button,
  Modal,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const CMEList = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  const { addToast } = useToasts();
  //form Data
  const [name, setName] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [lastDateTime, setLastDateTime] = useState("");
  const [startDateTimeError, setStartDateTimeError] = useState(false);
  const [lastDateTimeError, setLastDateTimeError] = useState(false);

  function saveCme() {
    const jwt = localStorage.getItem("jwt");
    console.log(localStorage.getItem("jwt"));
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);
    console.warn({
      name,
      isOnline,
      isOffline,
      startDateTime,
      lastDateTime,
      location,
      description,
      coverImg,
    });
    let data = {
      name,
      isOnline,
      isOffline,
      startDateTime,
      lastDateTime,
      location,
      description,
      coverImg,
    };
    var formdata = new FormData();
    formdata.append("image", coverImg, coverImg.name);
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("location", data.location);
    formdata.append("isOnline", data.isOnline);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${REACT_APP_API_ENDPOINT}/cme`, requestOptions).then((result) => {
      // console.warn("result", result);
      result.json().then((resp) => {
        if (result.status == 200) {
          console.warn("resp", resp);
          localStorage.setItem("iscme", true);
          window.open("/edit-cme", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  const handleStartDateTimeChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const now = new Date();

    if (selectedDateTime < now) {
      // Prevent selection of previous date from today
      // You can display an error message or take other actions here
      setStartDateTimeError(true);
      return;
    }

    if (selectedDateTime > new Date(lastDateTime)) {
      // Prevent selection of date greater than lastDateTime
      // You can display an error message or take other actions here
      setStartDateTimeError(true);
      return;
    }

    setStartDateTimeError(false);
    setStartDateTime(e.target.value);
  };

  const handleLastDateTimeChange = (e) => {
    const selectedDateTime = new Date(e.target.value);
    const now = new Date();

    if (selectedDateTime < now) {
      // Prevent selection of previous date from today
      // You can display an error message or take other actions here
      setLastDateTimeError(true);
      return;
    }

    if (selectedDateTime < new Date(startDateTime)) {
      // Prevent selection of date smaller than startDateTime
      // You can display an error message or take other actions here
      setLastDateTimeError(true);
      return;
    }

    setLastDateTimeError(false);
    setLastDateTime(e.target.value);
  };

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
          <Col md={1}></Col>
          <Col md={9}>
            <Container fluid={true}>
              <Header />
              <Row
                style={{
                  marginLeft: 10,
                }}
              >
                <h3>Add CME</h3>
              </Row>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink className="h4">
                                {" "}
                                Create a Continuous Medical Education
                              </NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          <div className="body">
                            <TabContent>
                              <TabPane>
                                <Form>
                                  <Row>
                                    <Col md={6}>
                                      <div className="form-check mb-3">
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios1"
                                          value={isOnline}
                                          onChange={(e) =>
                                            setIsOnline(e.target.value)
                                          }
                                          defaultChecked
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="exampleRadios1"
                                        >
                                          Online
                                        </Label>
                                      </div>
                                    </Col>
                                    <Col md={6}>
                                      <div className="form-check">
                                        <Input
                                          className="form-check-input"
                                          type="radio"
                                          name="exampleRadios"
                                          id="exampleRadios2"
                                          onChange={(e) =>
                                            setIsOffline(e.target.value)
                                          }
                                          value={isOffline}
                                        />
                                        <Label
                                          className="form-check-label"
                                          htmlFor="exampleRadios2"
                                        >
                                          Offline
                                        </Label>
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        CME Name*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          value={name}
                                          required={true}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Organiser's Name*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          // value={requestTitle}
                                          required={true}
                                          // onChange={(e) =>
                                          //   setRequestTitle(e.target.value)
                                          // }
                                        />
                                      </div>
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
                                          rows="5"
                                          placeholder="..."
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label>Start date & Time*</Label>
                                      <div className="col-md-10">
                                        <Input
                                          className={`form-control ${
                                            startDateTimeError
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          type="datetime-local"
                                          value={startDateTime}
                                          required
                                          onChange={handleStartDateTimeChange}
                                          id="start-datetime-local-input"
                                          style={{ paddingRight: "20px" }} // add padding to the right side
                                        />
                                        {startDateTimeError && (
                                          <div className="invalid-feedback">
                                            Invalid date selection
                                          </div>
                                        )}
                                      </div>
                                    </Col>
                                    <Col md={6}>
                                      <Label>End date & Time*</Label>
                                      <div className="col-md-10">
                                        <Input
                                          className={`form-control ${
                                            lastDateTimeError
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          type="datetime-local"
                                          value={lastDateTime}
                                          required
                                          onChange={handleLastDateTimeChange}
                                          id="end-datetime-local-input"
                                          style={{ paddingRight: "20px" }} // add padding to the right side
                                        />
                                        {lastDateTimeError && (
                                          <div className="invalid-feedback">
                                            Invalid date selection
                                          </div>
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Location*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          value={location}
                                          required={true}
                                          onChange={(e) =>
                                            setLocation(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <div className="row justify-content-center">
                                      <Col className="mb-3">
                                        <Label htmlFor="resume">
                                          Cover Image / Video*
                                        </Label>
                                        <Input
                                          type="file"
                                          className="form-control"
                                          id="resume"
                                          multiple
                                          onChange={(e) =>
                                            setCoverImg(e.target.files[0])
                                          }
                                        />
                                      </Col>
                                    </div>
                                    {/* <div className="table-responsive">
                                  <Table className="table mb-0">
                                    <thead>
                                      {preview.imgSrc?.map((image, index) => (
                                        <tr key={index}>
                                          <th>
                                            <img
                                              className="rounded avatar-lg"
                                              alt=""
                                              src={image}
                                            />
                                          </th>
                                        </tr>
                                      ))}
                                    </thead>
                                  </Table>
                                </div> */}
                                  </Row>
                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Sponsors
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          type="text"
                                          // value={requestTitle}
                                          required={true}
                                          // onChange={(e) =>
                                          //   setRequestTitle(e.target.value)
                                          // }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="form-check form-check-end">
                                      <Input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="defaultCheck2"
                                        defaultChecked
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="defaultCheck2"
                                      >
                                        Ask for Sponsorship
                                      </Label>
                                    </Col>
                                  </Row>
                                  <Row className="text-center">
                                    <Col>
                                      <div className="mb-2">
                                        {/* <button
                                          type="button"
                                          className="btn btn-primary waves-effect waves-light"
                                          onClick={saveCme}
                                          // onClick={() => {
                                          //   tog_backdrop();
                                          // }}
                                          // data-toggle="modal"
                                        >
                                          Next
                                        </button> */}
                                        <Link
                                          to={{
                                            pathname: "/summery-cme",
                                            state: {
                                              lastDateTime,
                                              startDateTime,
                                              name,
                                              location,
                                              description,
                                              isOnline,
                                              isOffline,
                                              coverImg,
                                            },
                                          }}
                                          className="btn btn-primary waves-effect waves-light"
                                        >
                                          Next
                                        </Link>
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
                                              Sponsorship
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
                                            <Form>
                                              <Row>
                                                <Col className="mb-3">
                                                  <label
                                                    htmlFor="example-text-input"
                                                    className="col-form-label"
                                                  >
                                                    URL*
                                                  </label>
                                                  <div>
                                                    <input
                                                      className="form-control"
                                                      type="url"
                                                      defaultValue="https://ads.google.com"
                                                    />
                                                  </div>
                                                </Col>
                                              </Row>
                                            </Form>
                                          </div>
                                          <div className="modal-footer">
                                            <Link
                                              to={"/summery-cme"}
                                              type="button"
                                              className="btn btn-primary"
                                            >
                                              Copy to clipboard
                                            </Link>
                                          </div>
                                        </Modal>
                                      </div>
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
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CMEList;
