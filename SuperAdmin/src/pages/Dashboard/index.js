import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  Table,
  Modal,
  CardTitle,
} from "reactstrap";
import Form from "react-bootstrap/Form";
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
  const [membershipList, setMembershipList] = useState();
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [event, setEvent] = useState();
  const [cme, setCme] = useState();
  const [doctor, setDoctor] = useState();
  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(10);
  const [gallery, setGallery] = useState();
  const [career, setCareer] = useState();
  const [featuredVideos, setFeaturedVideos] = useState();
  const [trending, setTrending] = useState();
  const [advertisement, setAdvertisement] = useState();
  const [topStories, setTopStories] = useState();
  const [name, setName] = useState("");
  const [association, setAssociation] = useState();
  const [duration, setDuration] = useState();
  const [amount, setAmount] = useState("");
  const [reference, setReferencer] = useState([]);
  const [users, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [formattedEvents, setFormattedEvents] = useState([]);

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => setUser(result))
      .catch((error) => console.log("error", error));
  }, []);
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
    fetch(`${REACT_APP_API_ENDPOINT}/doctor`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }
        return response.json();
      })
      .then((result) => setDoctor(result))
      .catch((error) => console.log("error", error));
  }, []);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = doctor
    ? doctor.slice(indexOfFirstItem1, indexOfLastItem1)
    : [];

  const pageNumbers1 = [];
  for (let i = 1; i <= Math.ceil(reference.length / itemsPerPage1); i++) {
    pageNumbers1.push(i);
  }

  const handlePaginationClick1 = (pageNumber1) => {
    setCurrentPage1(pageNumber1);
  };

  const handlePreviousClick1 = () => {
    setCurrentPage1(currentPage1 - 1);
  };

  const handleNextClick1 = () => {
    setCurrentPage1(currentPage1 + 1);
  };

  // For GET the event list(Events Number)
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
  const getNameOfUser = (id) => {
    console.log(users.length, id);
    let u = users.find((u) => u._id === id);
    return u && u.name ? u.name : "Nitesh";
  };
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

  // For GET the Featured videos list(videos number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/video`, requestOptions)
      .then((response) => response.json())
      .then((result) => setFeaturedVideos(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the Trending list(Trending number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/trending`, requestOptions)
      .then((response) => response.json())
      .then((result) => setTrending(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the Advertisement list(Advertisement number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/advertisment`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAdvertisement(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For GET the Top stories list(Top stories number)
  var myHeaders = new Headers();
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/stories`, requestOptions)
      .then((response) => response.json())
      .then((result) => setTopStories(result))
      .catch((error) => console.log("error", error));
  }, []);

  // For showing the membership cards GET API
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(localStorage.getItem("jwt"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/membership/plan`, requestOptions)
      .then((response) => response.json())
      .then((result) => setMembershipList(result))
      .catch((error) => console.log("error", error));
  }, []);

  // for updating the membership
  function updateMembership(_id) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      duration: duration,
      amount: amount,
      id: _id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${REACT_APP_API_ENDPOINT}/membership/plan`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.open("/membership", "_self");
  }

  // For GET the association(associations number)
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

  // For getting the list of references
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/references`, requestOptions)
      .then((response) => response.json())
      .then((result) => setReferencer(result))
      .catch((error) => console.log("error", error));
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reference.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(reference.length / itemsPerPage); i++) {
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
                  <Col lg={3} md={6}>
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
                  <Col lg={3} md={6}>
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
                  <Col lg={3} md={6}>
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
                  <Col lg={3} md={6}>
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
                  <Col xs={12} sm={6} md={6} lg={2}>
                    <Card
                      body
                      className="responsive-card"
                      style={{
                        borderRadius: 10,
                        height: 142,
                        width: 170,
                        backgroundColor: "transparent",
                        background:
                          "linear-gradient(90deg, #A475EB -6.01%, #5528FF 131.22%)",
                        shadowColor: "#6B3EFA",
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      <h5>Featured Videos</h5>
                      <h6>{featuredVideos && featuredVideos.length}</h6>
                    </Card>
                  </Col>

                  <Col xs={12} sm={6} md={6} lg={2}>
                    <Card
                      body
                      className="responsive-card"
                      style={{
                        borderRadius: 10,
                        height: 142,
                        width: 170,
                        backgroundColor: "transparent",
                        shadowColor: "#317AF6",
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 14,
                        elevation: 10,
                        background:
                          "linear-gradient(90deg, #45C3F3 -0.05%, #2C68F6 122.09%)",
                      }}
                    >
                      <h5>Trending</h5>
                      <h6>{trending && trending.length}</h6>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={2}>
                    <Card
                      body
                      className="responsive-card"
                      style={{
                        borderRadius: 10,
                        height: 142,
                        width: 170,
                        backgroundColor: "transparent",
                        shadowColor: "#11B3C9",
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        elevation: 10,
                        background:
                          "linear-gradient(90deg, #39DEC6 0%, #0CADC9 106.62%)",
                      }}
                    >
                      <h5>Advertisement</h5>
                      <h6>{advertisement && advertisement.length}</h6>
                    </Card>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={2}>
                    <Card
                      body
                      className="responsive-card"
                      style={{
                        borderRadius: 10,
                        height: 142,
                        width: 170,
                        backgroundColor: "transparent",
                        shadowColor: "#F9904B",
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 10,
                        elevation: 10,
                        background:
                          "linear-gradient(90deg, #FEB230 0%, #F88D4D 106.62%)",
                      }}
                    >
                      <h5>Top stories</h5>
                      <h6>{topStories && topStories.length}</h6>
                    </Card>
                  </Col>

                  <Col lg={4} md={12} sm={12} xs={12}>
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
                  </Col>
                </Row>

                <Row className="p-3">
                  <Col xl={8}>
                    <Card style={{ borderRadius: 20 }}>
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <CardTitle className="h4">Doctor's List"</CardTitle>
                        </div>
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
                              {currentItems1.map((index, id) => (
                                <tr key={id}>
                                  <th scope="row">
                                    {(currentPage1 - 1) * itemsPerPage1 +
                                      id +
                                      1}
                                  </th>
                                  <td>
                                    <img
                                      src={
                                        getUserByEmail(
                                          index ? index.email : null
                                        ) &&
                                        getUserByEmail(
                                          index ? index.email : null
                                        ).profileImage
                                          ? `http://170.187.254.215:4000/${
                                              getUserByEmail(
                                                index ? index.email : null
                                              ).profileImage
                                            }`
                                          : avatar4
                                      }
                                      className="rounded avatar-md"
                                      alt=""
                                    />
                                  </td>

                                  <td> {index ? index.name : null}</td>
                                  <td>{index ? index.degree : null}</td>
                                  <td>{index ? index.contact : null}</td>
                                  <td>{index ? index.email : null}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>

                        <div className="d-flex justify-content-center">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination">
                              <li
                                className={`page-item ${
                                  currentPage1 === 1 ? "disabled" : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  onClick={handlePreviousClick1}
                                >
                                  Previous
                                </a>
                              </li>
                              {pageNumbers1.map((pageNumber1) => (
                                <li
                                  key={pageNumber1}
                                  className={`page-item ${
                                    pageNumber1 === currentPage1 ? "active" : ""
                                  }`}
                                >
                                  <a
                                    className="page-link"
                                    onClick={() =>
                                      handlePaginationClick1(pageNumber1)
                                    }
                                  >
                                    {pageNumber1}
                                  </a>
                                </li>
                              ))}
                              <li
                                className={`page-item ${
                                  currentPage1 === pageNumbers1.length
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <a
                                  className="page-link"
                                  onClick={handleNextClick1}
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

                  <Col xl={4}>
                    <Card
                      className="bg-primary"
                      style={{
                        borderRadius: 20,
                      }}
                    >
                      <CardBody>
                        <Row className="align-items-center">
                          <Col>
                            <h4 className="text-light">
                              Total number of onboard Doctors
                            </h4>
                            <h5 className="text-light">
                              {doctor && doctor.length}
                            </h5>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Card
                      className="bg-primary"
                      style={{
                        borderRadius: 20,
                      }}
                    >
                      <CardBody>
                        <Row className="align-items-center">
                          <Col>
                            <h4 className="text-light">
                              Number of Associations
                            </h4>
                            <h5 className="text-light">
                              {association && association.length}
                            </h5>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="p-3">
                  {membershipList &&
                    membershipList.map((index, id) => (
                      <Col key={id} xl={6}>
                        <Card
                          className="bg-primary"
                          style={{
                            borderRadius: 20,
                          }}
                        >
                          <CardBody>
                            <Row className="align-items-center">
                              <Col sm={8}>
                                <p className="text-white font-size-18">
                                  <b>{index ? index.name : null}</b>{" "}
                                </p>
                                <p className="text-white font-size-16">
                                  Membership for {index ? index.duration : null}{" "}
                                  months plan
                                </p>
                                <p className="text-white font-size-16">
                                  ₹ {index ? index.amount : null}
                                </p>
                                <Row>
                                  <Col>
                                    <button
                                      type="button"
                                      className="btn btn-warning upgrade-4 waves-effect waves-light"
                                      onClick={() => {
                                        setName(event.name);
                                        setDuration(event.duration);
                                        setAmount(event.amount);
                                        tog_backdrop1();
                                      }}
                                      data-toggle="modal"
                                    >
                                      Edit
                                    </button>
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
                                          Edit Membership plan
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
                                                Membership Name*
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="text"
                                                  value={name}
                                                  onChange={(e) => {
                                                    setName(e.target.value);
                                                  }}
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
                                                Duration of the Membership*
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="number"
                                                  value={duration}
                                                  onChange={(e) => {
                                                    setDuration(e.target.value);
                                                  }}
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
                                                Enter Amount (₹)*
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="number"
                                                  value={amount}
                                                  onChange={(e) => {
                                                    setAmount(e.target.value);
                                                  }}
                                                  // placeholder="2,000"
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
                                          onClick={() =>
                                            updateMembership(index._id)
                                          }
                                        >
                                          Update
                                        </button>
                                      </div>
                                    </Modal>
                                  </Col>
                                </Row>
                              </Col>

                              <Col sm={4}>
                                <div className="mt-4 mt-sm-0">
                                  <img
                                    src={setupanalytics}
                                    className="img-fluid"
                                    alt=""
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                </Row>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        <CardTitle className="h4">Reference</CardTitle>
                        <Row>
                          <Col lg={10}></Col>
                          <Col lg={2}></Col>
                        </Row>
                        <div className="table-responsive">
                          <table className="table table-bordered border-dark mb-0 text-center">
                            <thead>
                              <tr>
                                <th>Sr.No</th>
                                <th>Patient Name</th>
                                <th>Contact No.</th>
                                <th>Reason</th>
                                <th>Refered To</th>
                                <th>Refered From</th>
                                <th>Date of reference</th>
                                <th>Time of reference</th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentItems.map((reference, id) => (
                                <tr key={id}>
                                  <th scope="row">
                                    {(currentPage - 1) * itemsPerPage + id + 1}
                                  </th>
                                  <td>{reference ? reference.name : null}</td>
                                  <td>
                                    {reference ? reference.contact : null}
                                  </td>
                                  <td>{reference ? reference.reason : null}</td>
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
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
