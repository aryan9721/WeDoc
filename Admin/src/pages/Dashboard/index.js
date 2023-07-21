import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Table,
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import BGAnimation from "../../assets/images/BGAnimation.png";
import Gallerybg from "../../assets/images/Gallerybg.png";
import Eventbg from "../../assets/images/Eventbg.png";
import CMEbg from "../../assets/images/CMEbg.png";
import Careerbg from "../../assets/images/Careerbg.png";
//Import Components
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
//Import Image
import setupanalytics from "../../assets/images/setup-analytics-amico.svg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Dashboard = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [event, setEvent] = useState();
  const [cme, setCme] = useState();
  const [doctor, setDoctor] = useState();
  const [gallery, setGallery] = useState();
  const [career, setCareer] = useState();
  const [name, setName] = useState("");
  const [association, setAssociation] = useState();
  const [doctorList, setDoctorList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formattedEvents, setFormattedEvents] = useState([]);
  const doctorsPerPage = 5;
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

  const fetchDoctors = () => {
    // Your API fetch logic here
    // Replace this with your actual API endpoint
    const apiUrl = `${REACT_APP_API_ENDPOINT}/doctor`;
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => setDoctorList(data))
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctorList.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Association k numbers k liye get api here
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

  /// For GET the event list(Events Number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/event`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEvent(result);
        // Map events to FullCalendar compatible format
        const formattedEvents = result.map((event) => {
          return {
            title: event.name,
            start: event.startDateTime,
            end: event.lastDateTime,
          };
        });
        setFormattedEvents(formattedEvents);
      })
      .catch((error) => console.log("error", error));
  }, []);

  // For GET list of the CME (CME Number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/cme`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCme(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the Gallery list(Gallery number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/gallery`, requestOptions)
      .then((response) => response.json())
      .then((result) => setGallery(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the Career list(Career number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/career`, requestOptions)
      .then((response) => response.json())
      .then((result) => setCareer(result))
      .catch((error) => console.log("error", error));
  }, []);

  // for Opening of modal
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
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
            <div
              style={{
                backgroundImage: `url(${BGAnimation})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
              }}
            >
              <Container fluid={true} className="p-3">
                <Header />

                <Row
                  style={{
                    marginLeft: 10,
                  }}
                >
                  <h3>Dashboard</h3>
                </Row>
                <Row className="p-3">
                  {/* {mainBusinessUser === true && } */}
                  {/* <MiniWidget reports={salesReport1} /> */}
                  <Col lg={3}>
                    <Card
                      body
                      style={{
                        borderRadius: 10,
                        height: 142,
                        backgroundImage: `url(${Eventbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderWidth: 1,
                        borderColor: "#67B8F7",
                        shadowColor: "#6CB8F1",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                        shadowOpacity: 16,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      <h4>Events</h4>
                      <h5>{event && event.length}</h5>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      body
                      style={{
                        borderRadius: 10,
                        height: 142,
                        backgroundImage: `url(${Gallerybg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderWidth: 1,
                        borderColor: "#67B8F7",
                        shadowColor: "#6CB8F1",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                        shadowOpacity: 16,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      <h4>Gallery</h4>
                      <h5>{gallery && gallery.length}</h5>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      body
                      style={{
                        borderRadius: 10,
                        height: 142,
                        backgroundImage: `url(${Careerbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderWidth: 1,
                        borderColor: "#67B8F7",
                        shadowColor: "#6CB8F1",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                        shadowOpacity: 16,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      <h4>Careers</h4>
                      <h5>{career && career.length}</h5>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card
                      body
                      style={{
                        borderRadius: 10,
                        height: 142,
                        backgroundImage: `url(${CMEbg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderWidth: 1,
                        borderColor: "#67B8F7",
                        shadowColor: "#6CB8F1",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                        shadowOpacity: 16,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      <h4>CME</h4>
                      <h5>{cme && cme.length}</h5>
                    </Card>
                  </Col>
                </Row>
                <Row className="p-3">
                  <Col xl={8}>
                    <Card style={{ borderRadius: 20 }}>
                      <CardBody>
                        <Row>
                          <Col lg={4} className="h4">
                            Doctor's List
                          </Col>
                        </Row>
                        <div className="table-responsive">
                          <Table className="table table-bordered border-dark mb-0 text-center">
                            <thead>
                              <tr>
                                <th>Sr.No</th>
                                <th>Profile Photo</th>
                                <th>Doctor Name</th>
                                <th>Degree</th>
                                <th>Contact No.</th>
                                <th>Email</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentDoctors &&
                                currentDoctors.map((doctor, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      {indexOfFirstDoctor + index + 1}
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
                                    <td>{doctor ? doctor.name : null}</td>
                                    <td>{doctor ? doctor.degree : null}</td>
                                    <td>{doctor ? doctor.contact : null}</td>
                                    <td>{doctor ? doctor.email : null}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                          <div className="d-flex justify-content-center mt-3">
                            <Pagination className="pagination">
                              <PaginationItem disabled={currentPage === 1}>
                                <PaginationLink
                                  previous
                                  onClick={() => paginate(currentPage - 1)}
                                />
                              </PaginationItem>
                              {Array.from(
                                Array(
                                  Math.ceil(doctorList.length / doctorsPerPage)
                                ),
                                (item, index) => (
                                  <PaginationItem
                                    active={index + 1 === currentPage}
                                    key={index}
                                  >
                                    <PaginationLink
                                      onClick={() => paginate(index + 1)}
                                    >
                                      {index + 1}
                                    </PaginationLink>
                                  </PaginationItem>
                                )
                              )}
                              <PaginationItem
                                disabled={
                                  currentPage ===
                                  Math.ceil(doctorList.length / doctorsPerPage)
                                }
                              >
                                <PaginationLink
                                  next
                                  onClick={() => paginate(currentPage + 1)}
                                />
                              </PaginationItem>
                            </Pagination>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  {/* calender yaha se start hai  */}
                  <Col lg={4}>
                    <Row>
                      <Card
                        className="responsive-card"
                        style={{
                          borderRadius: 20,
                        }}
                      >
                        <CardBody>
                          <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={formattedEvents && formattedEvents} // Pass the formatted events to FullCalendar
                            slotDuration={"00:15:00"}
                            handleWindowResize={true}
                            themeSystem="bootstrap"
                            // editable={true}
                            // droppable={true}
                            // selectable={true}
                          />
                        </CardBody>
                      </Card>
                    </Row>
                    <Row className="justify-content-center mt-4">
                      <Col xl={12} className="d-flex justify-content-center">
                        <Card
                          className="bg-primary"
                          style={{
                            borderRadius: 20,
                            textAlign: "center",
                            margin: "0 10px",
                            padding: "10px",
                          }}
                        >
                          <h5 className="text-light mb-0">
                            Total number of onboard Doctors
                          </h5>
                          <h5 className="text-light">
                            {doctorList && doctorList.length}
                          </h5>
                        </Card>
                      </Col>
                    </Row>
                    <Row className="justify-content-center mt-4">
                      <Col xl={12} className="d-flex justify-content-center">
                        <Card
                          className="bg-primary"
                          style={{
                            borderRadius: 20,
                            textAlign: "center",
                            margin: "0 10px",
                            padding: "10px",
                          }}
                        >
                          <h4 className="text-light mb-0">
                            Number of Associations
                          </h4>
                          <h5 className="text-light">
                            {association && association.length}
                          </h5>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
