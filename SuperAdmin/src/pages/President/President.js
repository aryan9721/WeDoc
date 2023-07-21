import React, { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  CardTitle,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import {
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
} from "reactstrap";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import QRCode from "qrcode.react";

const President = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [drp_danger1, setDrp_danger1] = useState(false);
  const [president, setPresident] = useState([]);
  const [association, setAssociation] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchAssociation, setSearchAssociation] = useState("");
  const [filteredPresident, setFilteredPresident] = useState([]);
  const [profile, setProfile] = useState();
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
  useEffect(() => {
    const fetchPresident = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_ENDPOINT}/president`, {
          method: "GET",
          headers: {
            "x-api-key": localStorage.getItem("jwt"),
          },
        });
        const result = await response.json();
        setPresident(result);
        setFilteredPresident(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchPresident();
  }, []);

  const getAssociation = (arr, emailId) => {
    let asso = arr.find((_association) => _association.emailId === emailId);
    return asso && asso.name ? asso.name : "Default Name";
  };

  useEffect(() => {
    const fetchAssociation = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_ENDPOINT}/association`, {
          method: "GET",
          headers: {
            "x-api-key": localStorage.getItem("jwt"),
          },
        });
        const result = await response.json();
        setAssociation(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAssociation();
  }, []);

  useEffect(() => {
    const filteredResults = president.filter((item) => {
      const nameMatch =
        searchName.trim() === "" ||
        item.name.toLowerCase().includes(searchName.toLowerCase());
      const emailMatch =
        searchEmail.trim() === "" ||
        item.email.toLowerCase().includes(searchEmail.toLowerCase());
      const associationMatch =
        searchAssociation.trim() === "" ||
        getAssociation(association, item.email)
          .toLowerCase()
          .includes(searchAssociation.toLowerCase());
      return nameMatch && emailMatch && associationMatch;
    });

    setFilteredPresident(filteredResults);
  }, [searchName, searchEmail, searchAssociation, president, association]);

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
                      <CardTitle style={{ fontSize: 18 }}>President</CardTitle>
                      <Row>
                        <Col lg={3} md={3} className="mb-2">
                          <Button id="caret" color="primary">
                            Total No. of President <br />
                            <h4>{filteredPresident.length}</h4>
                          </Button>{" "}
                        </Col>
                        <Col lg={3} md={3}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Search by Name"
                              value={searchName}
                              onChange={(e) => setSearchName(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={3} md={3}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Search by Email"
                              value={searchEmail}
                              onChange={(e) => setSearchEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={3} md={3}>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              placeholder="Search by Association"
                              value={searchAssociation}
                              onChange={(e) =>
                                setSearchAssociation(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Profile Photo</th>
                              <th>President Name</th>
                              <th>Association Name</th>
                              <th>President Email</th>
                              <th>QR Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPresident.map((index, id) => (
                              <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>
                                  <img
                                    src={getUserByEmail(index.email) && getUserByEmail(index.email).profileImage ? `http://170.187.254.215:4000/${getUserByEmail(index.email).profileImage}` : avatar4}
                                    className="rounded avatar-md"
                                    alt=""
                                  />
                                </td>
                                <td>{index ? index.name : null}</td>
                                <td>
                                  {index
                                    ? getAssociation(association, index.email)
                                    : null}
                                </td>
                                <td>{index ? index.email : null}</td>
                                <td><QRCode value={JSON.stringify(index)} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default President;
