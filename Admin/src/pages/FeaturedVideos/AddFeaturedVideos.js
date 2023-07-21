import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  NavItem,
  NavLink,
  Row,
  Button,
  CardTitle,
} from "reactstrap";
import Dropzone from "react-dropzone";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import { Link } from "react-router-dom";
const AddFeaturedVideos = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  //form Data

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [selectedFiles, setselectedFiles] = useState([]);
  // Adding Video from here 'POST API'
  function addVideo() {
    console.warn({
      description,
      title,
      company,
      file,
      coverImage,
    });
    let data = {
      description,
      title,
      company,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/video`, {
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
          // console.warn("resp", resp);
          // localStorage.setItem("isVideo", true);
          window.open("/edit-featured-videos", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  function handleCoverImageChange(event) {
    event.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setCoverImage(event.target.files[0]);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
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

              <Card>
                <CardBody>
                  <Breadcrumbs
                    title="Add Featured Videos"
                    breadcrumbItem="Add Featured Videos"
                  />
                  <Form>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="productname">Title*</Label>
                          <Input
                            type="text"
                            id="productname"
                            name="productname"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            placeholder="Enter title"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="manufacturername">Company*</Label>
                          <Input
                            type="text"
                            id="manufacturername"
                            name="manufacturername"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="form-control"
                            placeholder="Enter company name"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="productdesc">Description*</Label>
                          <textarea
                            className="form-control"
                            id="productdesc"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            required
                          ></textarea>
                          <div className="text-right">
                            <span>{textcount}/500</span>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label htmlFor="productimage">Video*</Label>
                          <Input
                            type="file"
                            id="productimage"
                            name="productimage"
                            onChange={handleFileChange}
                            className="form-control"
                            accept="video/*"
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-12">
                        <Card>
                          <CardBody>
                            <Form>
                              <Label htmlFor="productimage">Cover Image*</Label>
                              <Dropzone
                                onDrop={(acceptedFiles) => {
                                  handleCoverImageChange(acceptedFiles);
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div className="dropzone">
                                    <div
                                      className="dz-message needsclick"
                                      {...getRootProps()}
                                    >
                                      <input {...getInputProps()} />
                                      <div className="mb-3">
                                        <i className="display-4 text-muted uil uil-cloud-upload" />
                                      </div>
                                      <h4>
                                        Drop files here or click to upload.
                                      </h4>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                              <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                              >
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col className="col-auto">
                                            <img
                                              data-dz-thumbnail=""
                                              height="80"
                                              className="avatar-sm rounded bg-light"
                                              alt={f.name}
                                              src={f.preview}
                                            />
                                          </Col>
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  );
                                })}
                              </div>
                            </Form>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>

                    <Row
                      style={{
                        marginTop: 5,
                      }}
                    >
                      <Col md={12}>
                        <FormGroup className="text-center">
                          <Button
                            type="button"
                            color="primary"
                            onClick={addVideo}
                          >
                            Save
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddFeaturedVideos;
