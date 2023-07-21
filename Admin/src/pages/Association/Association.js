import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Row,
  Button,
  Modal,
  Input,
  Label,
  ButtonDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import InputAdornment from "@material-ui/core/InputAdornment";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
const Association = () => {
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  //form Data
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [drp_danger1, setDrp_danger1] = useState(false);
  const [president, setPresident] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [description, setDescription] = useState("");
  const [doctor, setDoctor] = useState();
  const [selectedfile, setSelectedFile] = useState([]);
  const [association, setAssociation] = useState();
  const addAssociation = () => {
    console.warn({
      president,
      emailId,
      name,
      contact,
      description,
    });
    let data = {
      president,
      emailId,
      name,
      contact,
      description,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/association`, {
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
          localStorage.setItem("isAssociation", true);
          window.open("/association", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  };

  // Doctors GET api for showing list
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
    fetch(`${REACT_APP_API_ENDPOINT}/doctor`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDoctor(result))
      .catch((error) => console.log("error", error));
  }, []);

  // Association Get api here
  var myHeaders = new Headers();

  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/association`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAssociation(result))
      .catch((error) => console.log("error", error));
  }, []);

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

  const handleInputChange = (e) => {
    setDescription(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
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
              <Breadcrumbs title="Doctors" breadcrumbItem="Doctors" />
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      {/* <CardTitle className="h4">Doctors</CardTitle> */}
                      <Row>
                        <Col lg={2} className="mb-2">
                          <Button id="caret" color="primary">
                            <h4>{association && association.length}</h4>{" "}
                            Associations
                          </Button>{" "}
                        </Col>
                        <Col lg={2}>
                          <Button id="caret" color="primary">
                            <h4>{doctor && doctor.length}</h4> Doctors
                          </Button>{" "}
                        </Col>
                        <Col lg={4}></Col>

                        <Col md={2}>
                          <div className="btn-group me-1 mb-2">
                            <ButtonDropdown
                              isOpen={drp_danger1}
                              toggle={() => setDrp_danger1(!drp_danger1)}
                            >
                              <Button id="caret" color="primary">
                                Associations
                              </Button>
                              <DropdownToggle
                                caret
                                color="primary"
                                className="dropdown-toggle-split"
                              >
                                <i className="mdi mdi-chevron-down" />
                              </DropdownToggle>
                              <DropdownMenu>
                                {association &&
                                  association.map((index, id) => (
                                    <DropdownItem key={id}>
                                      {index ? index.name : null}
                                    </DropdownItem>
                                  ))}
                              </DropdownMenu>
                            </ButtonDropdown>
                          </div>{" "}
                        </Col>
                        <Col md="2">
                          <div className="mt-1">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                tog_backdrop();
                              }}
                              data-toggle="modal"
                            >
                              <i className="dripicons-plus" /> Add Association
                            </button>
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
                                  Add an association
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
                                    <Col className="mb-1">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Association Name*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          name="name"
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          value={name}
                                          type="text"
                                          required
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="description-input"
                                        className="col-form-label"
                                      >
                                        Description*
                                      </Label>
                                      <div>
                                        <textarea
                                          className="form-control"
                                          name="description"
                                          onChange={handleInputChange}
                                          value={description}
                                          required
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
                                      />
                                    </Col>

                                    <div className="table-responsive">
                                      {/* <Table className="table mb-0">
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
                                  </Table> */}
                                    </div>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        President Name*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          name="name"
                                          onChange={(e) =>
                                            setPresident(e.target.value)
                                          }
                                          value={president}
                                          type="text"
                                          required
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Contact No.*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          name="contact"
                                          onChange={(e) =>
                                            setContact(e.target.value)
                                          }
                                          value={contact}
                                          type="number"
                                          required
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <Label
                                        htmlFor="email-input"
                                        className="col-form-label"
                                      >
                                        Email*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          name="email"
                                          onChange={(e) =>
                                            setEmailId(e.target.value)
                                          }
                                          value={emailId}
                                          type="email"
                                          required
                                        />
                                        {emailId !== "" &&
                                          !/^\S+@\S+\.\S+$/.test(emailId) && (
                                            <div className="invalid-feedback">
                                              Please enter a valid email address
                                              in the format name@example.com
                                            </div>
                                          )}
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={addAssociation}
                                >
                                  Done
                                </button>
                              </div>
                            </Modal>
                          </div>
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Profile Photo</th>
                              <th>Doctor Name</th>
                              <th>Degree</th>
                              <th>Association Name</th>
                              <th>Contact No.</th>
                              <th>Membership</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {association &&
                              association.map((index, id) => (
                                <tr key={id}>
                                  <th scope="row">{id + 1}</th>
                                  <td>
                                    <img
                                      src={avatar4}
                                      className="rounded avatar-md"
                                      alt=""
                                    />
                                  </td>
                                  <td> {index ? index.president : null}</td>
                                  <td>{index ? index.degree : null}</td>
                                  <td>{index ? index.name : null}</td>
                                  <td>{index ? index.contact : null}</td>
                                  <td className="text-success">Running</td>
                                  <td>
                                    <Button
                                      color="danger"
                                      className="btn btn-danger waves-effect waves-light"
                                      // onClick={() => deleteDoctor(index._id)}
                                    >
                                      Remove
                                    </Button>{" "}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardBody>
                  </Card>

                  <Row>
                    <Col sm="6">
                      <div>
                        <p className="mb-sm-0">
                          {/* can see on the ecommerce page */}
                          {/* Page {productsData.currentPage} of {productsData.totalPages} */}
                          Page 1 of 97
                        </p>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="float-sm-end">
                        <Pagination className="pagination pagination-rounded mb-sm-0">
                          <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Association;
