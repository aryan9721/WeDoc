import React, { useState, useEffect } from "react";
import { Table, Row, Col, Card, CardBody, Container, Modal } from "reactstrap";
import Form from "react-bootstrap/Form";
import { Button, ButtonDropdown, CardTitle } from "reactstrap";
import InputAdornment from "@material-ui/core/InputAdornment";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import { read } from "xlsx/dist/xlsx.full.min.js";
import * as XLSX from "xlsx";
import QRCode from "qrcode.react";

const Specialists = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [specialist, setSpecialist] = useState();
  const [associationName, setAssociationName] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [yoe, setYoe] = useState("");
  const [successfulOT, setSuccessfulOT] = useState("");
  const [patientRecovered, setPatientRecovered] = useState("");
  const [certificatesAchieved, setCertificatesAchieved] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [city, setCity] = useState("");
  const [association, setAssociation] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profile, setProfile] = useState();
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
    if (!profile) return {};
    console.log(profile);
    let u = profile.find((u) => u.email === email);
    return u;
  };
  // add Specialist in the list POST API
  function addSpecialist() {
    console.warn({
      associationName,
      degree,
      name,
      contact,
      email,
      designation,
      yoe,
      speciality,
      city,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
    });
    let data = {
      associationName,
      degree,
      name,
      contact,
      email,
      designation,
      yoe,
      speciality,
      city,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/specialist`, {
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
          localStorage.setItem("isSpecialist", true);
          window.open("/Specialists", "_self");
          setSearchQuery(""); // Clear the search query
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  // Get Specialists in the list
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(
      `${REACT_APP_API_ENDPOINT}/specialist?searchQuery=${searchQuery}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSearchResults(result))
      .catch((error) => console.log("error", error));
  }, [searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults
    ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((specialist && specialist.length) / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchQuery("");
  };

  const handlePreviousClick = () => {
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleNextClick = () => {
    setCurrentPage(1);
    setSearchQuery("");
  };

  // Delete Specialist from the list
  function deleteSpecialist(_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      specialistId: _id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(_id);
    fetch(`${REACT_APP_API_ENDPOINT}/specialist`, requestOptions).then(
      (result) => {
        result.json().then((response) => {
          console.warn(response);
          window.open("/specialists", "_self");
        });
      }
    );
  }

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/specialist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setSpecialist(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // Upload specialists in bulk
  function uploadSpecialists(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const specialists = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Create an array to store the bulk data
      const bulkData = [];

      // Loop through each row in the specialists array and create an object for each specialist
      for (let i = 1; i < specialists.length; i++) {
        const [
          name,
          degree,
          contact,
          email,
          designation,
          yoe,
          successfulOT,
          patientRecovered,
          certificatesAchieved,
          speciality,
          city,
          associationName,
        ] = specialists[i];
        const specialistData = {
          name,
          degree,
          contact,
          email,
          designation,
          yoe,
          successfulOT,
          patientRecovered,
          certificatesAchieved,
          speciality,
          city,
          associationName,
        };

        bulkData.push(specialistData);
      }
      console.log("bulk", bulkData);
      bulkData.forEach((data) => {
        fetch(`${REACT_APP_API_ENDPOINT}/specialist`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((result) => {
            console.log(result);
            result.json().then((resp) => {
              if (result.status === 200) {
                console.warn("resp", resp);
                localStorage.setItem("isSpecialist", true);
                window.open("/Specialists", "_self");
                setSearchQuery(""); // Clear the search query
              } else {
                alert("Please enter correct credentials");
              }
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
      // Send the bulk data to the API
    };

    // Read the Excel file as an array buffer
    reader.readAsArrayBuffer(file);
  }

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
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
              <Row>
                <Col md={12}>
                  <Card>
                    <CardBody>
                      <CardTitle className="h4">Specialists</CardTitle>
                      <Row>
                        <Col lg={2} className="mb-2">
                          <Button id="caret" color="primary">
                            Total No. of Specialists <br />
                            <h4>
                              {searchResults && searchResults.length
                                ? searchResults.length
                                : 0}
                            </h4>
                          </Button>{" "}
                        </Col>
                        <Col lg={2}>
                          <input
                            className="form-control"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                          />
                        </Col>
                        <Col lg={2}></Col>

                        <Col md={2}>
                          <div className="mt-1">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                tog_backdrop1();
                              }}
                              data-toggle="modal"
                            >
                              <i className="dripicons-plus" /> Add Specialist
                            </button>
                            <input
                              type="file"
                              accept=".xlsx, .xls"
                              onChange={(e) =>
                                uploadSpecialists(e.target.files[0])
                              }
                            />
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
                                  Add a new Specialist
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
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Name*
                                      </label>
                                      <div>
                                        <input
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
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Contact No.*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={contact}
                                          required={true}
                                          onChange={(e) =>
                                            setContact(e.target.value)
                                          }
                                          InputProps={{
                                            startAdornment: (
                                              <InputAdornment position="start">
                                                +91
                                              </InputAdornment>
                                            ),
                                          }}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        Degree*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={degree}
                                          required={true}
                                          onChange={(e) =>
                                            setDegree(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        Speciality*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={speciality}
                                          required={true}
                                          onChange={(e) =>
                                            setSpeciality(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        City*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={city}
                                          required={true}
                                          onChange={(e) =>
                                            setCity(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        Email*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="email"
                                          value={email}
                                          required={true}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        Designation*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={designation}
                                          required={true}
                                          onChange={(e) =>
                                            setDesignation(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        Year of experience*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={yoe}
                                          required={true}
                                          onChange={(e) =>
                                            setYoe(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        SuccessfulOT*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={successfulOT}
                                          required={true}
                                          onChange={(e) =>
                                            setSuccessfulOT(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        PatientRecovered*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={patientRecovered}
                                          required={true}
                                          onChange={(e) =>
                                            setPatientRecovered(e.target.value)
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-1">
                                      <label
                                        htmlFor="example-text-input"
                                        className="col-md-2 col-form-label"
                                      >
                                        CertificatesAchieved*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={certificatesAchieved}
                                          required={true}
                                          onChange={(e) =>
                                            setCertificatesAchieved(
                                              e.target.value
                                            )
                                          }
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                </Form>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={addSpecialist}
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
                              <th>Specialist Name</th>
                              <th>Degree</th>
                              <th>Designation</th>
                              <th>SuccessfulOT</th>
                              <th>Contact No.</th>
                              <th>Speciality</th>
                              <th>City</th>
                              <th>QR Code</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems &&
                              currentItems.map((index, id) => (
                                <tr key={id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage +
                                      (id + 1)}
                                  </th>

                                  <td>
                                    <img
                                      src={
                                        getUserByEmail(index.email) &&
                                        getUserByEmail(index.email).profileImage
                                          ? `http://170.187.254.215:4000/${
                                              getUserByEmail(index.email)
                                                .profileImage
                                            }`
                                          : avatar4
                                      }
                                      className="rounded avatar-md"
                                      alt=""
                                    />
                                  </td>
                                  <td> {index ? index.name : null}</td>
                                  <td>{index ? index.degree : null}</td>
                                  <td>{index ? index.designation : null}</td>
                                  <td>{index ? index.successfulOT : null}+</td>
                                  <td>{index ? index.contact : null}</td>
                                  <td>{index ? index.speciality : null}</td>
                                  <td>{index ? index.city : null}</td>
                                  <td>
                                    <QRCode value={JSON.stringify(index)} />
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      className="btn btn-danger waves-effect waves-light"
                                      onClick={() =>
                                        deleteSpecialist(index && index._id)
                                      }
                                    >
                                      Remove
                                    </Button>{" "}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="d-flex justify-content-center">
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                onClick={handlePreviousClick}
                              >
                                Previous
                              </a>
                            </li>
                            {pageNumbers.map((pageNumber) => (
                              <li
                                key={pageNumber}
                                className={`page-item ${
                                  pageNumber === currentPage ? "active" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  onClick={() =>
                                    handlePaginationClick(pageNumber)
                                  }
                                >
                                  {pageNumber}
                                </a>
                              </li>
                            ))}
                            <li
                              className={`page-item ${
                                currentPage === pageNumbers.length
                                  ? "disabled"
                                  : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                onClick={handleNextClick}
                              >
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
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

export default Specialists;
