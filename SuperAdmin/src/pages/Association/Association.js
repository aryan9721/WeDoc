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
  CardTitle,
  ButtonDropdown,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
const Association = () => {
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  // Pagination state
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  //form Data
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [drp_danger1, setDrp_danger1] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [president, setPresident] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [description, setDescription] = useState("");
  const [doctor, setDoctor] = useState();
  const [selectedfile, setSelectedFile] = useState([]);
  const [association, setAssociation] = useState();
  // Search state
  const [searchPresident, setSearchPresident] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filteredAssociations, setFilteredAssociations] = useState([]);
  const [profile, setProfile] = useState();
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  myHeaders.append("x-api-key", jwt);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProfile(result))
      .catch((error) => console.log("error", error));
  }, []);
  const getUserByEmail = (email) => {
    if(!profile)return {};
    console.log(profile);
    let u = profile.find((u) => u.email === email);
    return u;
  }
  // POST association api here
  const addAssociation = () => {
    console.warn({
      president,
      emailId,
      name,
      contact,
      city,
      description,
    });
    let data = {
      president,
      emailId,
      name,
      contact,
      city,
      description,
    };
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      fetch(`${REACT_APP_API_ENDPOINT}/association`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
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
    }, 3000);
  };

  // Doctors GET api for showing list(number of doctors)
  var myHeaders = new Headers();
  
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
      .then((result) => {
        setAssociation(result);
        // Updated filtering logic
        const filtered = result?.filter((item) => {
          const nameMatch = item.name
            ?.toLowerCase()
            .includes(searchName.toLowerCase());
          const associationMatch = item.president
            ?.toLowerCase()
            .includes(searchPresident.toLowerCase());
          return nameMatch && associationMatch; // Use && operator to filter by both name and association
        });

        setFilteredAssociations(filtered);
      })
      .catch((error) => console.log("error", error));
  }, [searchPresident, searchName]);
  // Pagination functions
  const indexOfLastItem = startIndex + itemsPerPage;
  const indexOfFirstItem = startIndex;
  const currentItems = filteredAssociations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setStartIndex((pageNumber - 1) * itemsPerPage);
    setCurrentPage(pageNumber);
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

              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h3">Associations</CardTitle>
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
                        <Col md={4}>
                          <div className="search-input">
                            <input
                              type="text"
                              value={searchPresident}
                              onChange={(e) =>
                                setSearchPresident(e.target.value)
                              }
                              placeholder="Search by President Name"
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                        </Col>
                        <Col md={2}>
                          <div className="search-input">
                            <input
                              type="text"
                              value={searchName}
                              onChange={(e) => setSearchName(e.target.value)}
                              placeholder="Search by Association Name"
                              style={{
                                width: "100%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
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
                                        Contact No.
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
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        City*
                                      </Label>
                                      <div>
                                        <Input
                                          className="form-control"
                                          name="city"
                                          onChange={(e) =>
                                            setCity(e.target.value)
                                          }
                                          value={city}
                                          type="text"
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
                                        President Email*
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
                              {showConfirmation && (
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 999,
                                  }}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      width: 300,
                                      height: 100,
                                      backgroundColor: "white",
                                      borderWidth: 1,
                                      borderColor: "#ccc",
                                      borderRadius: 4,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      textAlign: "center",
                                    }}
                                  >
                                    Email sent to the president.
                                  </div>
                                </div>
                              )}
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
                              <th>President Name</th>
                              <th>President Email</th>
                              <th>Association Name</th>
                              <th>Contact No.</th>
                              <th>City</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems &&
                              currentItems.map((index, id) => (
                                <tr key={id}>
                                  <th scope="row">{startIndex + id + 1}</th>
                                  <td>
                                    <img
                                      src={getUserByEmail(index.emailId) && getUserByEmail(index.emailId).profileImage ? `http://170.187.254.215:4000/${getUserByEmail(index.emailId).profileImage}` : avatar4}

                                      className="rounded avatar-md"
                                      alt=""
                                    />
                                  </td>
                                  <td> {index ? index.president : null}</td>
                                  <td>{index ? index.emailId : null}</td>
                                  <td>{index ? index.name : null}</td>
                                  <td>{index ? index.contact : null}</td>
                                  <td>{index ? index.city : null}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Pagination */}
                      <div className="pagination-container">
                        {" "}
                        {/* Add a parent container */}
                        <Pagination className="pagination justify-content-center mt-4">
                          {" "}
                          {/* Apply the 'justify-content-center' class */}
                          <PaginationItem disabled={currentPage === 1}>
                            <PaginationLink
                              previous
                              onClick={() => paginate(currentPage - 1)}
                            />
                          </PaginationItem>
                          {Array.from(
                            {
                              length: Math.ceil(
                                filteredAssociations.length / itemsPerPage
                              ),
                            },
                            (_, i) => (
                              <PaginationItem
                                active={i + 1 === currentPage}
                                key={i}
                              >
                                <PaginationLink onClick={() => paginate(i + 1)}>
                                  {i + 1}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem
                            disabled={
                              currentPage ===
                              Math.ceil(
                                filteredAssociations.length / itemsPerPage
                              )
                            }
                          >
                            <PaginationLink
                              next
                              onClick={() => paginate(currentPage + 1)}
                            />
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Association;
