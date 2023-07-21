import React, { useState, useEffect } from "react";
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

const MyProfile = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [profile, setProfile] = useState({});
  const [president, setPresident] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [successfulOT, setSuccessfulOT] = useState("");
  const [yoe, setYoe] = useState("");
  const [patientRecovered, setPatientRecovered] = useState("");
  const [certificatesAchieved, setCertificatesAchieved] = useState("");
  const [blood_group, setBlood_group] = useState("");
  const [selectedfile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState({ imgSrc: null });

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    fetch(
      `${REACT_APP_API_ENDPOINT}/user/profile`,
      {
        method: "GET",
        headers: { "x-api-key": jwt },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        setPresident(result.president);
        setName(result.name);
        setDesignation(result.designation);
        setEmail(result.email);
        setContact(result.contact);
        setLocation(result.location);
        setCountry(result.country);
        setState(result.state);
        setCity(result.city);
        setDob(result.dob);
        setSuccessfulOT(result.successfulOT);
        setYoe(result.yoe);
        setPatientRecovered(result.patientRecovered);
        setCertificatesAchieved(result.certificatesAchieved);
        setBlood_group(result.blood_group);
      })
      .catch((error) => console.log("error", error));
  }, [jwt]);

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("president", president);
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("location", location);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("dob", dob);
    formData.append("successfulOT", successfulOT);
    formData.append("yoe", yoe);
    formData.append("patientRecovered", patientRecovered);
    formData.append("certificatesAchieved", certificatesAchieved);
    formData.append("blood_group", blood_group);
    if (selectedfile.length > 0) {
      for (let i = 0; i < selectedfile.length; i++) {
        formData.append("files", selectedfile[i]);
      }
    }

    fetch(
      `${REACT_APP_API_ENDPOINT}/user/profile`,
      {
        method: "PUT",
        headers: {
          "x-api-key": jwt,
        },
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        setName(result.name);
        setDesignation(result.designation);
        email(result.email);
        setContact(result.contact);
        setLocation(result.location);
        setCountry(result.country);
        setState(result.state);
        setCity(result.city);
        setDob(result.dob);
        setSuccessfulOT(result.successfulOT);
        setYoe(result.yoe);
        setPatientRecovered(result.patientRecovered);
        setCertificatesAchieved(result.certificatesAchieved);
        setBlood_group(result.blood_group);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const setSelectedFileformat = (file) => {
    setSelectedFile(file);
    const promiseArr = [];
    for (let i = 0; i < file.length; i++) {
      if (file[i].size > 20 * 1024 * 1024) {
        alert(`Image ${file[i].name} size cannot be more than 20mb.`);
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
            <Container fluid={true}>
              <Header />
              <Row>
                <Col lg={2}></Col>
                <Col lg={8}>
                  <Card
                    style={{
                      backgroundColor: "rgba(103, 184, 247, 0.3)",
                      blurRadius: 225,
                    }}
                  >
                    <CardBody>
                      <div className="wizard clearfix">
                        <div className="steps clearfix">
                          <ul>
                            <NavItem>
                              <NavLink className="h5">
                                Edit your profile
                              </NavLink>
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
                                        President Name*
                                      </Label>

                                      <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Association Name*
                                      </Label>

                                      <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={president}
                                        onChange={(e) =>
                                          setPresident(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Designation*
                                      </Label>
                                      <div>
                                        <Input
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
                                    <Col className="mb-3">
                                      <Label
                                        htmlFor="example-text-input"
                                        className="col-form-label"
                                      >
                                        Email Id*
                                      </Label>

                                      <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label for="contact">SuccessfulOT*</Label>
                                      <Input
                                        type="number"
                                        name="successfulOT"
                                        id="successfulOT"
                                        placeholder="SuccessfulOT done"
                                        value={successfulOT}
                                        onChange={(e) =>
                                          setSuccessfulOT(e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Label for="location">
                                        Years of experience*
                                      </Label>
                                      <Input
                                        type="number"
                                        name="yoe"
                                        id="yoe"
                                        placeholder="Years of experience you have ..."
                                        value={yoe}
                                        onChange={(e) => setYoe(e.target.value)}
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label for="contact">
                                        Patients Recovered*
                                      </Label>
                                      <Input
                                        type="number"
                                        name="patientsRecovered"
                                        id="patientsRecovered"
                                        placeholder="Patients Recovered so far..."
                                        value={patientRecovered}
                                        onChange={(e) =>
                                          setPatientRecovered(e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Label for="location">
                                        Certificates Achieved
                                      </Label>
                                      <Input
                                        type="number"
                                        name="certificatesAchieved"
                                        id="certificatesAchieved"
                                        placeholder="Certificates Achieved so far..."
                                        value={certificatesAchieved}
                                        onChange={(e) =>
                                          setCertificatesAchieved(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label for="contact">Contact</Label>
                                      <Input
                                        type="tel"
                                        name="contact"
                                        id="contact"
                                        placeholder="Enter your contact number"
                                        value={contact}
                                        onChange={(e) =>
                                          setContact(e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Label for="location">Location</Label>
                                      <Input
                                        type="text"
                                        name="location"
                                        id="location"
                                        placeholder="Enter your Location"
                                        value={location}
                                        onChange={(e) =>
                                          setLocation(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label for="contact">Country</Label>
                                      <Input
                                        type="text"
                                        name="country"
                                        id="country"
                                        placeholder="Enter your Country"
                                        value={country}
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Label for="location">State</Label>
                                      <Input
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Enter your State"
                                        value={state}
                                        onChange={(e) =>
                                          setState(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={12}>
                                      <Label for="location">City</Label>
                                      <Input
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Enter your city"
                                        value={city}
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col md={6}>
                                      <Label for="dob">Date of Birth</Label>
                                      <Input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        placeholder="Enter your DOB"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                      />
                                    </Col>
                                    <Col md={6}>
                                      <Label for="blood_group">
                                        Blood Group
                                      </Label>
                                      <Input
                                        type="select"
                                        name="blood_group"
                                        id="blood_group"
                                        placeholder="Enter your blood group"
                                        value={blood_group}
                                        onChange={(e) =>
                                          setBlood_group(e.target.value)
                                        }
                                      >
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                      </Input>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <div className="row justify-content-center">
                                      <Col className="mb-3">
                                        <Label htmlFor="resume">
                                          Profile Photo
                                        </Label>
                                        <Input
                                          type="file"
                                          className="form-control"
                                          id="resume"
                                          multiple
                                          onChange={(e) =>
                                            setSelectedFileformat(
                                              e.target.files
                                            )
                                          }
                                        />
                                      </Col>
                                    </div>
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
                                        onClick={updateProfile}
                                        className="btn btn-primary waves-effect waves-light"
                                      >
                                        Save
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
                <Col lg={2}></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default MyProfile;
