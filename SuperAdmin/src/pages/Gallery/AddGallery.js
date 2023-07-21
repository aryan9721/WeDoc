import React, { useState, useEffect } from "react";
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
  TabContent,
  TabPane,
} from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const AddGallery = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [eventName, setEventName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [images, setImages] = useState([]);
  const [gallery, setGallery] = useState();
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

  function requestDataSubmit() {
    const { REACT_APP_API_ENDPOINT } = process.env;
    const jwt = localStorage.getItem("jwt");
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);

    if (image && image.size > MAX_IMAGE_SIZE) {
      alert("Please try a smaller size image");
      return;
    }

    if (video && video.size > MAX_VIDEO_SIZE) {
      alert("Please try a smaller size video");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", image, image ? image.name : "");
    formdata.append("video", video, video ? video.name : "");

    // Append the images array directly to FormData
    if (!Array.isArray(images)) {
      alert("Invalid images data");
      return;
    }

    images.forEach((img, index) => {
      formdata.append(`images[${index}]`, img, img.name);
    });

    formdata.append("event", eventName);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/gallery`, requestOptions)
      .then((result) => {
        result.json().then((resp) => {
          if (result.status === 200) {
            console.warn("resp", resp);
            localStorage.setItem("isGallery", true);
            window.open("/edit-gallery", "_self");
          } else {
            alert("Please try again or login again");
          }
        });
      })
      .catch((error) => console.log("error", error));
  }

  // Get event in the list
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
      .then((result) => setGallery(result))
      .catch((error) => console.log("error", error));
  }, []);

  const [preview, setPreview] = useState({ imgSrc: null });

  const handleImagesChange = (e) => {
    const filesArray = Array.from(e.target.files); // Convert files object to array
    setImages(filesArray);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };
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
                <Col lg={2}></Col>
                <Col lg={8}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink>Create Gallery</NavLink>
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
                                          {gallery &&
                                            gallery.map((event, id) => (
                                              <option
                                                key={id}
                                                value={event._id}
                                              >
                                                {event.name}
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
                                          <Label for="image">Cover Image</Label>
                                          <Input
                                            type="file"
                                            className="form-control"
                                            id="image"
                                            multiple
                                            onChange={(e) => {
                                              setPreview({
                                                imgSrc: URL.createObjectURL(
                                                  e.target.files[0]
                                                ),
                                              });
                                              setImage(e.target.files[0]);
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
                                        <label htmlFor="image">
                                          Upload Images*
                                        </label>
                                        <Input
                                          type="file"
                                          className="form-control"
                                          id="image" // Update the id to "image"
                                          multiple
                                          onChange={handleImagesChange}
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
                                          onChange={handleVideoChange}
                                        />
                                      </Col>
                                    </div>
                                  </Row>
                                  <Row className="text-center">
                                    <Col>
                                      <Button
                                        color="primary"
                                        // disabled={itemRequestLoading}
                                        onClick={() => requestDataSubmit()}
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
              </Row>
            </Container>
          </Col>
          <Col lg={2}></Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddGallery;
