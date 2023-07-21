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

const Trending = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [activeTab, setactiveTab] = useState(1);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedfile, setSelectedFile] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const addTrending = () => {
    // add trending from here
    console.warn({
      description,
      link,
    });
    let data = {
      description,
      link,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/trending`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        if (result.status === 200) {
          setShowSuccessPopup(true);
          setTimeout(() => {
            setShowSuccessPopup(false);
          }, 3000);
          // console.warn("resp", resp);
          // localStorage.setItem("isTrending", true);
          window.open("/trending", "_self");
        } else {
          alert("please enter all the details");
        }
      });
    });
  };

  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
      }
    }
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
                <Col md={2}></Col>
                <Col md={8}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink>Upload Trending video</NavLink>
                            </NavItem>
                          </ul>
                        </div>
                        <div className="content clearfix">
                          <div className="body">
                            <TabContent>
                              <TabPane>
                                <Form>
                                  <Row>
                                    <Col className="mb-3">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Video Link*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="url"
                                          value={link}
                                          onChange={(e) =>
                                            setLink(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <div className="mb-3">
                                        <Label>Description*</Label>

                                        <Input
                                          className="form-control"
                                          type="text"
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
                                      <Label htmlFor="resume">
                                        Cover Image
                                      </Label>
                                      <Input
                                        type="file"
                                        className="form-control"
                                        id="resume"
                                        multiple
                                        onChange={(e) =>
                                          setSelectedFileformat(e.target.files)
                                        }
                                      />
                                    </Col>

                                    <div className="table-responsive">
                                      <Table className="table mb-0">
                                        <thead>
                                          {preview.imgSrc?.map(
                                            (image, index) => (
                                              <tr key={index}>
                                                <th>
                                                  <img
                                                    className="rounded avatar-lg"
                                                    alt=""
                                                    src={image}
                                                  />
                                                </th>
                                              </tr>
                                            )
                                          )}
                                        </thead>
                                      </Table>
                                    </div>
                                  </Row>

                                  <Row className="text-center">
                                    <Col>
                                      <Button
                                        color="primary"
                                        onClick={() => addTrending()}
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
                <Col md={2}></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
      {showSuccessPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
            padding: 10,
            paddingHorizontal: 20,
            backgroundColor: "green",
            color: "white",
            borderRadius: 5,
            zIndex: 9999,
            width: 200, // Increase the width as per your requirement
            height: 100, // Increase the height as per your requirement
          }}
        >
          Success! Trending video posted.
        </div>
      )}
    </React.Fragment>
  );
};

export default Trending;
