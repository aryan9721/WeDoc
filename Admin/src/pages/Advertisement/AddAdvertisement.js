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
  TabContent,
  TabPane,
} from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const AddAdvertisement = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const [selectedfile, setSelectedFile] = useState([]);

  function requestDataSubmit() {
    console.warn({
      description,
      link,
    });
    let data = {
      description,
      link,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/advertisment`, {
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
          console.warn("resp", resp);
          localStorage.setItem("isAdvertisement", true);
          window.open("/edit-advertisement", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

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
                title="Upload Advertisement"
                breadcrumbItem="Upload Advertisement"
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

                                        <span className="badgecount badge badge-success">
                                          bfhewgfhewgfhjewfewhfewhf {textcount}{" "}
                                          / 400{" "}
                                        </span>
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
    </React.Fragment>
  );
};

export default AddAdvertisement;
