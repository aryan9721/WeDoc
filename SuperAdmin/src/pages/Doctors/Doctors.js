import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  CardTitle,
} from "reactstrap";

import avatar4 from "../../assets/images/users/avatar-4.jpg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import QRCode from "qrcode.react";

const Doctors = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [doctor, setDoctor] = useState();
  const [association, setAssociation] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getAssociation = (arr, emailId) => {
    if (!arr) return "Default Name";
    console.log(emailId);
    let asso = arr.find((_association) => _association._id === emailId);
    return asso && asso.name ? asso.name : "Default Name";
  };
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
    fetch(
      `${REACT_APP_API_ENDPOINT}/doctor?searchQuery=${searchQuery}`,
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
    i <= Math.ceil((doctor && doctor.length) / itemsPerPage);
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
  const [profile, setProfile] = useState();
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
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/association`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAssociation(result))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/doctor`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDoctor(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

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
                      <CardTitle className="h3">Doctors</CardTitle>

                      <Row>
                        <Col lg={2} className="mb-2">
                          <Button id="caret" color="primary">
                            Total No. of Doctors <br />
                            <h4>
                              {searchResults && searchResults.length
                                ? searchResults.length
                                : 0}
                            </h4>
                          </Button>
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
                              <th>Designation</th>
                              <th>SuccessfulOT</th>
                              <th>Contact No.</th>
                              <th>Membership</th>
                              <th>Status</th>
                              <th>QR Code</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems &&
                              currentItems.map((doctor, id) => (
                                <tr key={id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage +
                                      (id + 1)}
                                  </th>

                                  <td>
                                    <img
                                      src={
                                        getUserByEmail(doctor.email) &&
                                        getUserByEmail(doctor.email)
                                          .profileImage
                                          ? `http://170.187.254.215:4000/${
                                              getUserByEmail(doctor.email)
                                                .profileImage
                                            }`
                                          : avatar4
                                      }
                                      className="rounded avatar-md"
                                      alt=""
                                    />
                                  </td>
                                  <td> {doctor ? doctor.name : null}</td>
                                  <td>{doctor ? doctor.degree : null}</td>
                                  <td>
                                    {doctor
                                      ? getAssociation(
                                          association,
                                          doctor.association
                                        )
                                      : null}
                                  </td>
                                  <td>{doctor ? doctor.designation : null}</td>
                                  <td>
                                    {doctor ? doctor.successfulOT : null}+
                                  </td>
                                  <td>{doctor ? doctor.contact : null}</td>

                                  <td>
                                    {doctor.plan ? doctor.plan.name : null}
                                  </td>
                                  <td>
                                    {doctor.plan ? doctor.plan.status : null}
                                  </td>
                                  <td>
                                    <QRCode value={JSON.stringify(doctor)} />
                                  </td>
                                  <td>
                                    <Button
                                      color="danger"
                                      className="btn btn-danger waves-effect waves-light"
                                      onClick={() =>
                                        deleteDoctor(doctor && doctor._id)
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

export default Doctors;
