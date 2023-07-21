import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Label,
  Container,
  Modal,
  Form,
} from "reactstrap";

//Import Calander
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import moment from "moment";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const EditEvents = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [events, setEvents] = useState();
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [modalBackdrop, setModalBackdrop] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventId, setEventId] = useState("");
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [startDateTime, setStartDateTime] = useState("");
  const [lastDateTime, setLastDateTime] = useState("");
  const [startDateTimeError, setStartDateTimeError] = useState(false);
  const [lastDateTimeError, setLastDateTimeError] = useState(false);

  // For GET the event list
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/event`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEvents(result);
        // Map events to FullCalendar compatible format
        const formattedEvents = result.map((event) => {
          return {
            title: event.name,
            start: event.startDateTime,
            end: event.lastDateTime,
          };
        });
        setFormattedEvents(formattedEvents);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // For Update the event list (PUT)
  function changeEvent(_id) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      lastDateTime: lastDateTime,
      startDateTime: startDateTime,
      location: location,
      description: description,
      isOnline: isOnline,
      eventId: _id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/event`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.open("/edit-events", "_self");
  }

  // For Deleting the events

  function deleteEvent(_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", jwt);
    var raw = JSON.stringify({
      eventId: _id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(_id);
    fetch(`${REACT_APP_API_ENDPOINT}/event`, requestOptions).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        window.open("/edit-events", "_self");
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

  function togBackdrop(eventId) {
    setModalBackdrop((prevBackdrop) => ({
      ...prevBackdrop,
      [eventId]: !prevBackdrop[eventId],
    }));
    removeBodyCss();
  }

  function tog_backdrop1() {
    setmodal_backdrop1(!modal_backdrop1);
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
                <h3>Edit Event</h3>
              </Row>
              <Row>
                <Col
                  mg={8}
                  xl={8}
                  style={{
                    marginLeft: 0,
                  }}
                >
                  <Row>
                    {events &&
                      events
                        .filter((event) =>
                          event.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((event, id) => (
                          <Col key={id} mg={6} xl={4}>
                            <Card
                              style={{
                                borderRadius: 15,
                              }}
                            >
                              <CardBody>
                                <CardTitle className="h4 mt-0">
                                  <div>
                                    <img
                                      src={avatar3}
                                      className="rounded-circle avatar-sm"
                                      alt=""
                                    />
                                    <img
                                      src={avatar4}
                                      className="rounded-circle avatar-sm"
                                      alt=""
                                    />
                                    <img
                                      src={avatar5}
                                      className="rounded-circle avatar-sm"
                                      alt=""
                                    />
                                  </div>
                                </CardTitle>
                                <CardSubtitle className="h5 mt-3">
                                  {event ? event.name : null}
                                </CardSubtitle>
                                <CardSubtitle
                                  style={{
                                    marginTop: 1,
                                  }}
                                >
                                  {event ? event.location : null}
                                </CardSubtitle>

                                <CardSubtitle className="mt-3">
                                  {event
                                    ? moment(event.startDateTime).format(
                                        "MMM DD, YYYY hh:mm A"
                                      )
                                    : null}{" "}
                                  -{" "}
                                  {event
                                    ? moment(event.lastDateTime).format(
                                        "MMM DD, YYYY hh:mm A"
                                      )
                                    : null}{" "}
                                </CardSubtitle>
                                <br />
                                <Row
                                  style={{
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Col md={6}>
                                    <Button
                                      color="primary"
                                      className="btn btn-primary waves-effect waves-light m-2"
                                      onClick={() => {
                                        setLastDateTime(event.lastDateTime);
                                        setStartDateTime(event.startDateTime);
                                        setName(event.name);
                                        setLocation(event.location);
                                        setDescription(event.description);
                                        setIsOnline(event.isOnline);
                                        setEventId(event._id);
                                        togBackdrop(event._id);
                                      }}
                                      data-toggle="modal"
                                      style={{ width: "70px" }}
                                    >
                                      Edit
                                    </Button>
                                    <Modal
                                      isOpen={modalBackdrop[event._id]} // Use the state variable to control the modal visibility
                                      toggle={() => togBackdrop(event._id)}
                                      scrollable={true}
                                      id="staticBackdrop"
                                    >
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="staticBackdropLabel"
                                        >
                                          Edit Events
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={() => {
                                            togBackdrop(event._id);
                                          }}
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
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
                                                  // value={isOffline}
                                                  // onChange={(e) =>
                                                  //   setIsOffline(e.target.value)
                                                  // }
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
                                                Event Name*
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
                                                    setDescription(
                                                      e.target.value
                                                    )
                                                  }
                                                  maxLength="225"
                                                  rows="5"
                                                  placeholder="This Description has a limit of 400 chars."
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
                                                  onChange={
                                                    handleStartDateTimeChange
                                                  }
                                                  id="start-datetime-local-input"
                                                  style={{
                                                    paddingRight: "20px",
                                                  }} // add padding to the right side
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
                                                  onChange={
                                                    handleLastDateTimeChange
                                                  }
                                                  id="end-datetime-local-input"
                                                  style={{
                                                    paddingRight: "20px",
                                                  }} // add padding to the right side
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
                                                  Cover Image / Video
                                                </Label>
                                                <Input
                                                  type="file"
                                                  className="form-control"
                                                  id="resume"
                                                  multiple
                                                  // onChange={(e) =>
                                                  //   setCoverImg(e.target.files[0])
                                                  // }
                                                />
                                              </Col>
                                            </div>
                                          </Row>
                                        </Form>
                                      </div>
                                      <div className="modal-footer">
                                        <Button
                                          color="primary"
                                          className="btn btn-primary"
                                          onClick={() =>
                                            changeEvent(event && event._id)
                                          }
                                        >
                                          Update
                                        </Button>
                                      </div>
                                    </Modal>
                                  </Col>
                                  <Col md={6}>
                                    <Button
                                      color="primary"
                                      className="btn btn-primary waves-effect waves-light m-2"
                                      onClick={() =>
                                        deleteEvent(event && event._id)
                                      }
                                      style={{ width: "70px" }}
                                    >
                                      Delete
                                    </Button>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                  </Row>
                </Col>
                <Col mg={4} xl={4}>
                  <Col md="12">
                    <div className="form-inline">
                      <div className="search-box ml-2">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="orm-control bg-light border-light rounded"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />

                          <i className="mdi mdi-magnify search-icon"></i>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" className="mt-2">
                    <Card
                      style={{
                        borderRadius: 20,
                      }}
                    >
                      <CardBody>
                        <FullCalendar
                          plugins={[dayGridPlugin, interactionPlugin]}
                          initialView="dayGridMonth"
                          events={formattedEvents && formattedEvents} // Pass the formatted events to FullCalendar
                          slotDuration={"00:15:00"}
                          handleWindowResize={true}
                          themeSystem="bootstrap"
                          // editable={true}
                          // droppable={true}
                          // selectable={true}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default EditEvents;
