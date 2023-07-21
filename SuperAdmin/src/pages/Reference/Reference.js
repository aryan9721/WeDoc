import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Container } from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Reference = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [reference, setReference] = useState([]);
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/references`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setReference(result);
        setSearchResults(result); // Set the initial search results to all references
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => {setUser(result);
      console.log('user',result)})
      .catch((error) => console.log("error", error));
  }, []);

  const getNameOfUser = (id) => {
    console.log(users.length, id);
    let u = users.find((u) => u._id === id);
    return u && u.name ? u.name : "Nitesh";
  };

  useEffect(() => {
    const filteredResults = reference.filter((item) => {
      const name = item.name || "";
      const reason = item.reason || "";
      const referredTo = item.referredTo || "";
      const referredFrom = item.referredFrom || "";
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referredTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        referredFrom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setSearchResults(filteredResults);
    setCurrentPage(1);
  }, [searchTerm, reference]);

  const mapUserwithId = (id) => {
    console.log(users.length, id);
    let u = users.find((u) => u._id === id);
    return;
  };
  mapUserwithId(reference[0]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    searchTerm !== ""
      ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
      : reference.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
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
              <Row style={{ marginLeft: 10 }}>
                <h3>Reference</h3>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Patient Name</th>
                              <th>Contact No.</th>
                              <th>Reason</th>
                              <th>Referred To</th>
                              <th>Referred From</th>
                              <th>Date of reference</th>
                              <th>Time of reference</th>
                            </tr>
                          </thead>

                          <tbody>
                            {searchTerm !== ""
                              ? searchResults.map((reference, id) => (
                                  <tr key={id}>
                                    <th scope="row">
                                      {(currentPage - 1) * itemsPerPage +
                                        id +
                                        1}
                                    </th>
                                    <td>{reference ? reference.name : null}</td>
                                    <td>
                                      {reference ? reference.contact : null}
                                    </td>
                                    <td>
                                      {reference ? reference.reason : null}
                                    </td>
                                    <td>
                                      {reference
                                        ? getNameOfUser(reference.referredTo)
                                        : null}
                                    </td>

                                    <td>
                                      {reference
                                        ? getNameOfUser(reference.referredFrom)
                                        : null}
                                    </td>
                                    <td>
                                      {reference
                                        ? new Date(
                                            reference.referenceDateTime
                                          ).toLocaleDateString("en-GB")
                                        : null}
                                    </td>

                                    <td>
                                      {reference
                                        ? new Date(
                                            reference.referenceDateTime
                                          ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                            hour12: true,
                                          })
                                        : null}
                                    </td>
                                  </tr>
                                ))
                              : currentItems.map((reference, id) => (
                                  <tr key={id}>
                                    <th scope="row">
                                      {(currentPage - 1) * itemsPerPage +
                                        id +
                                        1}
                                    </th>
                                    <td>{reference ? reference.name : null}</td>
                                    <td>
                                      {reference ? reference.contact : null}
                                    </td>
                                    <td>
                                      {reference ? reference.reason : null}
                                    </td>
                                    <td>
                                      {reference
                                        ? getNameOfUser(reference.referredTo)
                                        : null}
                                    </td>

                                    <td>
                                      {reference
                                        ? getNameOfUser(reference.referredFrom)
                                        : null}
                                    </td>
                                    <td>
                                      {reference
                                        ? new Date(
                                            reference.referenceDateTime
                                          ).toLocaleDateString("en-GB")
                                        : null}
                                    </td>

                                    <td>
                                      {reference
                                        ? new Date(
                                            reference.referenceDateTime
                                          ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                            hour12: true,
                                          })
                                        : null}
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
export default Reference;
