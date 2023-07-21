import React, { useState } from "react";

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
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
const AddTopStories = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  //form Data
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
          if (result.status == 200) {
            window.open("/edit-top-stories", "_self");
          } else {
            alert("please login again");
          }
        });
      }
    );
  };

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
              <Breadcrumbs
                title="Upload TopStories"
                breadcrumbItem="Upload TopStories"
              />
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
                                          // placeholder="This Description has a limit of 400 chars."
                                        />

                                        <span className="badgecount badge badge-success">
                                          bfhewgfhewgfhjewfewhfewhf {textcount}{" "}
                                          / 400{" "}
                                        </span>
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

                                        <span className="badgecount badge badge-success">
                                          bfhewgfhewgfhjewfewhfewhf {textcount}{" "}
                                          / 400{" "}
                                        </span>
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
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default AddTopStories;
