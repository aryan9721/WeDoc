import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Modal,
  CardTitle,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import { Button } from "reactstrap";
import * as XLSX from "xlsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import QRCode from "qrcode.react";

const Doctors = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  // const { REACT_APPPOINT } = process.env;
  const REACT_APPPOINT = "http://wedoc.in/admin";
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [associationName, setAssociationName] = useState("");
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [demail, setdEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [yoe, setYoe] = useState("");
  const [successfulOT, setSuccessfulOT] = useState("");
  const [patientRecovered, setPatientRecovered] = useState("");
  const [certificatesAchieved, setCertificatesAchieved] = useState("");
  const [association, setAssociation] = useState();
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");

  // add doctor in the list POST API
  function addDoctor() {
    console.warn({
      association,
      degree,
      name,
      contact,
      demail,
      designation,
      yoe,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
    });
    console.log(association);
    if (association && association._id) {
      let data = {
        association: association._id,
        degree,
        name,
        contact,
        email: demail,
        designation,
        yoe,
        successfulOT,
        patientRecovered,
        certificatesAchieved,
      };

      fetch(`${REACT_APP_API_ENDPOINT}/doctor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((result) => {
        console.warn("result", result);
        result.json().then((resp) => {
          if (result.status == 200) {
            console.warn("resp", resp);
            localStorage.setItem("isDoctor", true);
            window.open("/doctors", "_self");
          } else {
            alert("please enter correct credentials");
          }
        });
      });
    } else {
      console.log("association not found");
    }
  }

  // Get doctor in the list
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
    if (email) {
      fetch(
        `${REACT_APP_API_ENDPOINT}/president/association?email=${email}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setAssociation(result))
        .catch((error) => console.log("error", error));
    }
  }, [email]);

  useEffect(() => {
    if (association && association._id) {
      fetch(
        `${REACT_APP_API_ENDPOINT}/association/doctors?association=${association._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setDoctor(result))
        .catch((error) => console.log("error", error));
    }
  }, [association]);

  // Delete doctor from the list
  function deleteDoctor(_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      doctorId: _id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(_id);
    fetch(`${REACT_APP_API_ENDPOINT}/doctor`, requestOptions).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        window.open("/doctors", "_self");
      });
    });
  }

  // Association k dropdown  liye calling get api here
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  // chaning of profile k liye useeffect lagate hai
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/user/profile`, {
      method: "GET",
      headers: { "x-api-key": jwt },
    })
      .then((response) => response.json())
      .then((result) => {
        setEmail(result.email);
      })
      .catch((error) => console.log("error", error));
  }, [jwt]);

  useEffect(() => {
    console.log(association);
  }, [association]);

  // Adding doctor's in bulk from excel
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = jsonData[0];
      const parsedData = jsonData
        .slice(1)
        .map((row) =>
          headers.reduce(
            (obj, header, index) => ({ ...obj, [header]: row[index] }),
            {}
          )
        );
      console.log("pd", parsedData);
      // Validate the parsed data
      const requiredFields = ["name", "email"];
      const hasRequiredFields = parsedData.every((obj) =>
        requiredFields.every((field) => obj.hasOwnProperty(field))
      );

      if (hasRequiredFields) {
        const doctorsData = parsedData.map((obj) => ({
          degree: obj.degree,
          name: obj.name,
          contact: obj.contact,
          email: obj.email,
          designation: obj.designation,
          yoe: obj.yoe,
          successfulOT: obj.successfulOT,
          patientRecovered: obj.patientRecovered,
          certificatesAchieved: obj.certificatesAchieved,
          association: association._id,
        }));
        setDoctors(doctorsData);
      } else {
        console.error("Parsed data is missing required fields");
        // Display an error message to the user
      }
    };

    reader.onerror = (e) => {
      console.error("File could not be read! Code " + e.target.error.code);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleUploadDoctors = () => {
    if (doctors && doctors.length === 0) {
      console.error("No doctors data to upload");
      // Display an error message to the user
      return;
    }
    console.log("data", doctors);
    doctors.forEach((element) => {
      console.log("adding", element);
      fetch(`${REACT_APP_API_ENDPOINT}/doctor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);

          // Handle success or display any error messages
        })
        .catch((error) => {
          console.error(error);
          // Handle error or display any error messages
        });
    });
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = doctor.slice(indexOfFirstItem, indexOfLastItem);
  const [membership, setMemebership] = useState("null");
  console.log(REACT_APPPOINT);
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/membership/plan`, {
      method: "GET",
      headers: { "x-api-key": jwt },
    })
      .then((response) => response.json())
      .then((result) => {
        setMemebership(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [doctor]);
  const getMembershipName = (id) => {
    console.log(id);
    const foundObject = membership.find((obj) => obj._id === id);

    if (foundObject) {
      return foundObject.name;
    }

    return "No Membership";
  };
  const renderPageNumbers = () => {
    const pageNumbers = Math.ceil(doctor.length / itemsPerPage);

    return (
      <div className="pagination">
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  console.log(doctor);
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
                      <CardTitle className="h4">Doctors</CardTitle>
                      <Row>
                        <Col lg={2} className="mb-2">
                          <Button id="caret" color="primary">
                            Total No. of Doctors <br />
                            <h4>{doctor && doctor.length}</h4>
                          </Button>{" "}
                        </Col>
                        <Col lg={4}>
                          <input
                            className="form-control"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            placeholder="Search by name"
                          />
                        </Col>
                        <Col lg={2}>
                          <div>
                            <input
                              type="file"
                              accept=".xlsx, .xls"
                              onChange={handleFileUpload}
                            />
                            <Button
                              color="primary"
                              onClick={handleUploadDoctors}
                            >
                              Upload Doctors
                            </Button>
                          </div>
                        </Col>

                        <Col md={2} className="d-flex justify-content-end">
                          <div className="mt-1">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                tog_backdrop();
                              }}
                              data-toggle="modal"
                            >
                              <i className="dripicons-plus" /> Add Doctor
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
                                  Add a new doctor
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
                                        Degree
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="text"
                                          value={degree}
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
                                        Email*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="email"
                                          value={demail}
                                          required={true}
                                          onChange={(e) =>
                                            setdEmail(e.target.value)
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
                                        Year of experience
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={yoe}
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
                                        SuccessfulOT
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={successfulOT}
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
                                        PatientRecovered
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={patientRecovered}
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
                                        CertificatesAchieved
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
                                  onClick={addDoctor}
                                >
                                  Done
                                </button>
                              </div>
                            </Modal>
                          </div>
                        </Col>
                        {association && REACT_APPPOINT && association ? (
                          <Col lg={2} className="mb-2">
                            <QRCode
                              value={
                                REACT_APPPOINT +
                                "/add-doctor?aid=" +
                                association._id
                              }
                            />
                          </Col>
                        ) : null}
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Profile Photo</th>
                              <th>Doctor Name</th>
                              <th>Degree</th>
                              <th>Designation</th>
                              <th>SuccessfulOT</th>
                              <th>Contact No.</th>
                              <th>Membership</th>
                              <th>Membership status</th>
                              <th>QR Code</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {doctor &&
                              doctor
                                .filter((doctor) =>
                                  doctor.name
                                    .toLowerCase()
                                    .includes(searchName.toLowerCase())
                                )
                                .slice(
                                  (currentPage - 1) * itemsPerPage,
                                  currentPage * itemsPerPage
                                )
                                .map((index, id) => (
                                  <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </td>
                                    <td> {index ? index.name : null}</td>
                                    <td>{index ? index.degree : null}</td>
                                    <td>{index ? index.designation : null}</td>
                                    <td>
                                      {index ? index.successfulOT : null}+
                                    </td>
                                    <td>{index ? index.contact : null}</td>
                                    <td className="text-dark">
                                      {index.plan.name}
                                    </td>
                                    <td className="text-success"> Running</td>
                                    <td>
                                      <QRCode value={JSON.stringify(index)} />
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        className="btn btn-danger waves-effect waves-light"
                                        onClick={() =>
                                          deleteDoctor(index && index._id)
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
                      <div className="pagination">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                        >
                          Previous Page
                        </button>
                        {renderPageNumbers()}
                        <button
                          onClick={goToNextPage}
                          disabled={
                            currentPage ===
                            Math.ceil(doctor.length / itemsPerPage)
                          }
                        >
                          Next Page
                        </button>
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

export default Doctors;
