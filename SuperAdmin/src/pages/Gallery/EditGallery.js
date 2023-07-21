import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Label,
  Form,
  Modal,
  Container,
  Button,
} from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
//Import Calander
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
// import images
import { Link } from "react-router-dom";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";

const EditGallery = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [preview, setPreview] = useState({ imgSrc: null });
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState();
  const [eventName, setEventName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // For GET the Gallery list
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
    fetch(`${REACT_APP_API_ENDPOINT}/gallery`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Add images and videos properties to each gallery item
        const formattedGallery = result.map((item) => ({
          ...item,
          images: [], // Initially set as an empty array
          videos: [], // Initially set as an empty array
        }));
        setGallery(formattedGallery);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the event name
  var myHeaders = new Headers();
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

  // For Deleting the Gallery

  function deleteGallery(_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", jwt);
    var raw = JSON.stringify({
      galleryId: _id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(_id);
    fetch(`${REACT_APP_API_ENDPOINT}/gallery`, requestOptions).then(
      (result) => {
        result.json().then((response) => {
          console.warn(response);
          window.open("/edit-gallery", "_self");
        });
      }
    );
  }

  // For Update the gallery list (PUT)
  function changeGallery(_id) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    // Find the gallery item with the specified _id
    const updatedGalleryItem = gallery.find((item) => item._id === _id);

    var raw = JSON.stringify({
      eventName: eventName,
      images: images, // Set the updated images here
      videos: video ? [video] : [], // Set the updated video here
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/gallery`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        // Update the images and videos properties of the gallery item
        updatedGalleryItem.images = images; // Set the updated images here as well
        updatedGalleryItem.videos = video ? [video] : []; // Set the updated video here as well

        // Update the gallery state with the modified gallery item
        setGallery([...gallery]);
      })
      .catch((error) => console.log("error", error));

    window.open("/edit-gallery", "_self");
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
                <h3>Edit Gallery</h3>
              </Row>
              <Row>
                <Col mg={6} xl={8}>
                  <Row>
                    {gallery &&
                      gallery.map((index, id) => {
                        const event =
                          events &&
                          events.find((event) => event._id === index.event);
                        // Apply search filter
                        if (
                          searchQuery &&
                          event &&
                          !event.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        ) {
                          return null;
                        }
                        return (
                          <Col md={6} xl={4} key={id}>
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
                                  {event && event.name}
                                </CardSubtitle>

                                <CardSubtitle
                                  style={{
                                    marginTop: 1,
                                  }}
                                >
                                  {events &&
                                    events.find(
                                      (event) => event._id === index.event
                                    )?.location}
                                </CardSubtitle>

                                <CardSubtitle className="mt-3">
                                  <Link
                                    to="#"
                                    className="card-link text-dark float-md-start"
                                  >
                                    {index.videos.length}{" "}
                                    {index.videos.length === 1
                                      ? "Video"
                                      : "Videos"}
                                  </Link>
                                </CardSubtitle>
                                <CardSubtitle className="mt-3">
                                  <Link
                                    to="#"
                                    className="card-link text-dark float-md-end"
                                  >
                                    {index.images.length}{" "}
                                    {index.images.length === 1
                                      ? "Photo"
                                      : "Photos"}
                                  </Link>
                                </CardSubtitle>

                                <br />
                                <Row>
                                  <Col md={6}>
                                    <Button
                                      color="primary"
                                      className="btn btn-primary waves-effect waves-light m-2"
                                      onClick={() => {
                                        tog_backdrop1();
                                      }}
                                      data-toggle="modal"
                                      style={{ width: "70px" }}
                                    >
                                      Edit
                                    </Button>
                                    <Modal
                                      isOpen={modal_backdrop1}
                                      toggle={() => {
                                        tog_backdrop1();
                                      }}
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
                                            setmodal_backdrop1(false);
                                          }}
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <Form>
                                          <Row>
                                            <Col>
                                              <div className="mb-3">
                                                <Label>Event Name*</Label>
                                                <Input
                                                  type="select"
                                                  value={eventName}
                                                  required
                                                  onChange={(e) =>
                                                    setEventName(e.target.value)
                                                  }
                                                >
                                                  <option value="">
                                                    Select an event
                                                  </option>
                                                  {events &&
                                                    events.map((index, id) => (
                                                      <option key={id}>
                                                        {index
                                                          ? index.name
                                                          : null}
                                                      </option>
                                                    ))}
                                                </Input>
                                              </div>
                                            </Col>
                                          </Row>
                                          {/* cover image  */}
                                          <Row>
                                            <div className="row justify-content-center">
                                              <Col className="mb-3">
                                                <div className="form-group">
                                                  <Label for="image">
                                                    Cover Image
                                                  </Label>
                                                  <Input
                                                    type="file"
                                                    className="form-control"
                                                    id="image"
                                                    multiple
                                                    onChange={(e) => {
                                                      setPreview({
                                                        imgSrc:
                                                          URL.createObjectURL(
                                                            e.target.files[0]
                                                          ),
                                                      });
                                                      setImage(
                                                        e.target.files[0]
                                                      );
                                                    }}
                                                  />
                                                  {preview.imgSrc && (
                                                    <img
                                                      src={preview.imgSrc}
                                                      alt="preview"
                                                      className="mt-3"
                                                      height="150px"
                                                    />
                                                  )}
                                                </div>
                                              </Col>
                                            </div>
                                          </Row>
                                          {/* images */}
                                          <Row>
                                            <div className="row justify-content-center">
                                              <Col className="mb-3">
                                                <label htmlFor="resume">
                                                  Upload Images*
                                                </label>
                                                <Input
                                                  type="file"
                                                  className="form-control"
                                                  id="resume"
                                                  multiple
                                                  onChange={(e) =>
                                                    setImages(e.target.files)
                                                  }
                                                />
                                              </Col>
                                            </div>
                                          </Row>
                                          {/* video */}
                                          <Row>
                                            <div className="row justify-content-center">
                                              <Col className="mb-3">
                                                <label htmlFor="resume">
                                                  Upload Video*
                                                </label>
                                                <Input
                                                  type="file"
                                                  className="form-control"
                                                  id="video"
                                                  onChange={(e) =>
                                                    setVideo(e.target.files[0])
                                                  }
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
                                            changeGallery(index && index._id)
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
                                        deleteGallery(index && index._id)
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
                        );
                      })}
                  </Row>
                </Col>
                <Col mg={6} xl={4}>
                  <Col md="12">
                    <div className="form-inline">
                      <div className="search-box ml-2">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="orm-control bg-light border-light rounded"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                          // events={events}
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
export default EditGallery;
