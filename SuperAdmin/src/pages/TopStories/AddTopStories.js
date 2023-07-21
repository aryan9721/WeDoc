import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
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

const AddTopStories = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedfile, setSelectedFile] = useState([]);

  const postStory = () => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem("jwt");
    console.log(localStorage.getItem("jwt"));
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    let data = {
      title,
      description,
      link,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/stories`, requestOptions).then(
      (result) => {
        result.json().then((resp) => {
          if (result.status === 200) {
            setShowSuccessPopup(true); // Show the success popup
            setTimeout(() => {
              setShowSuccessPopup(false); // Hide the success popup after 3 seconds
            }, 3000);
            // Other code...
          } else {
            alert("please login again");
          }
        });
      }
    );
  };

  useEffect(() => {
    if (showSuccessPopup) {
      setTimeout(() => {
        setShowSuccessPopup(false); // Hide the success popup after 3 seconds
      }, 2000);
    }
  }, [showSuccessPopup]);

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const [preview, setPreview] = useState({ imgSrc: null });
  const setSelectedFileformat = (file) => {
    setSelectedFile(file);
    const promiseArr = [];
    for (let i = 0; i < file.length; i++) {
      if (file.size > 20 * 1024 * 1024) {
        alert(`Image ${file.name} size cannot be more than 20mb.`);
        break;
      }
      promiseArr.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file[i]);
          reader.onload = async () => {
            resolve(reader.result);
          };
          reader.onerror = (e) => reject(e);
        })
      );
    }
    Promise.all(promiseArr).then((result) => {
      setPreview({
        ...preview,
        imgSrc: preview.imgSrc ? [...preview.imgSrc, ...result] : [...result],
      });
    });
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
                <Col lg={2}>{""}</Col>
                <Col lg={8}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink>Upload TopStories</NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        {showSuccessPopup && (
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: [
                                { translateX: "-50%" },
                                { translateY: "-50%" },
                              ],
                              backgroundColor: "#28a745",
                              color: "#fff",
                              padding: 10,
                              borderRadius: 4,
                              fontSize: 16,
                              fontWeight: "bold",
                              shadowColor: "#000",
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.2,
                              shadowRadius: 4,
                              elevation: 3,
                              zIndex: 9999,
                            }}
                          >
                            Story successfully uploaded
                          </div>
                        )}
                        <div className="content clearfix">
                          <div className="body">
                            <TabContent>
                              <TabPane>
                                <Form>
                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Story Title*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={title}
                                          onChange={(e) =>
                                            setTitle(e.target.value)
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
                                        <Label>Description / Body*</Label>

                                        <Input
                                          type="textarea"
                                          id="textarea"
                                          value={description}
                                          onChange={(e) =>
                                            setDescription(e.target.value)
                                          }
                                          maxLength="225"
                                          rows="5"
                                          placeholder="This Description has a limit of 400 chars."
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
                                        Video Link*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          type="url"
                                          value={link}
                                          onChange={(e) =>
                                            setLink(e.target.value)
                                          }
                                          defaultValue="https://ads.google.com"
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <div className="row justify-content-center">
                                      <Col className="mb-3">
                                        <Label htmlFor="resume">
                                          Cover Image
                                        </Label>
                                        <Input
                                          type="file"
                                          className="form-control"
                                          id="resume"
                                          multiple
                                          // onChange={(e) =>
                                          //   setSelectedFileformat(e.target.files)
                                          // }
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

                                  <Row className="text-center">
                                    <Col>
                                      <Button
                                        color="primary"
                                        // disabled={itemRequestLoading}
                                        onClick={() => postStory()}
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
                <Col lg={2}> </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddTopStories;
