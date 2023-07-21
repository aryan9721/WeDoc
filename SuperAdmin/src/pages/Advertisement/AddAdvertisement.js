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

const AddAdvertisement = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [activeTab, setactiveTab] = useState(1);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedfile, setSelectedFile] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const requestDataSubmit = () => {
    var myHeaders = new Headers();
    const jwt = localStorage.getItem("jwt");
    console.log(localStorage.getItem("jwt"));
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    let data = {
      description,
      link,
    };

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/advertisment`, requestOptions).then(
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
                <Col lg={2}>{""}</Col>
                <Col lg={8}>
                  <Card>
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink>Upload an Advertisement</NavLink>
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
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Link*
                                      </Label>
                                      <div>
                                        <Input
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
                                        <Label>
                                          Content of the advertisement*
                                        </Label>

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
                                      <Label htmlFor="resume">
                                        Cover Image / Logo of the company*
                                      </Label>
                                      <Input
                                        type="file"
                                        className="form-control"
                                        id="resume"
                                        // multiple
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
                <Col lg={2}>{""}</Col>
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
          Success! Advertisement posted.
        </div>
      )}
    </React.Fragment>
  );
};

export default AddAdvertisement;
