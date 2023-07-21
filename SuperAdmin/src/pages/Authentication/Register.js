import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// action
import {
  registerUser,
  apiError,
  registerUserFailed,
  registerUserSuccessful,
} from "../../store/actions";

// Redux
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Register = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [successfulOT, setSuccessfulOT] = useState("");
  const [yoe, setYoe] = useState("");
  const [patientRecovered, setPatientRecovered] = useState("");
  const [certificatesAchieved, setCertificatesAchieved] = useState("");

  function saveUser() {
    console.warn({
      email,
      location,
      name,
      designation,
      successfulOT,
      yoe,
      patientRecovered,
      certificatesAchieved,
    });
    let data = {
      email,
      location,
      name,
      designation,
      successfulOT,
      yoe,
      patientRecovered,
      certificatesAchieved,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/user/register`, {
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
          localStorage.setItem("isauthUser", true);
          window.open("/login", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  useEffect(() => {
    props.apiError("");
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <Row
      style={{
        backgroundColor: "white",
      }}
    >
      <Container fluid={true} className="p-3">
        <Row className="align-items-center justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card>
              <CardBody className="p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Register Account</h5>
                  <p className="text-muted">Get your free WeDoc account now.</p>
                </div>
                <div className="p-2 mt-4">
                  <AvForm className="form-horizontal">
                    <div className="mb-3">
                      <AvField
                        name="name"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        required
                        placeholder="Enter name"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        id="email"
                        name="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        id="location"
                        name="location"
                        label="Location"
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                        className="form-control"
                        placeholder="Enter location"
                        type="text"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <AvField
                        name="designation"
                        label="Designation"
                        onChange={(e) => setDesignation(e.target.value)}
                        value={designation}
                        type="text"
                        required
                        placeholder="Enter designation"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="successfulOT"
                        label="SuccessfulOT"
                        type="number"
                        onChange={(e) => setSuccessfulOT(e.target.value)}
                        value={successfulOT}
                        required
                        placeholder="Enter successfulOT"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="yoe"
                        label="Years of experience"
                        type="number"
                        onChange={(e) => setYoe(e.target.value)}
                        value={yoe}
                        required
                        placeholder="Enter yoe"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="patientRecovered"
                        label="Patients Recovered"
                        type="number"
                        onChange={(e) => setPatientRecovered(e.target.value)}
                        value={patientRecovered}
                        required
                        placeholder="Enter patientRecovered"
                      />
                    </div>
                    <div className="mb-3">
                      <AvField
                        name="certificatesAchieved"
                        label="Certificates Achieved"
                        type="number"
                        onChange={(e) =>
                          setCertificatesAchieved(e.target.value)
                        }
                        value={certificatesAchieved}
                        required
                        placeholder="Enter certificatesAchieved"
                      />
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="auth-terms-condition-check"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="auth-terms-condition-check"
                      >
                        I accept{" "}
                        <Link to="/terms-condition" className="text-dark">
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                    <div className="mt-3 text-center">
                      <button
                        className="btn btn-primary w-sm waves-effect waves-light"
                        type="button"
                        onClick={saveUser}
                      >
                        Register
                      </button>
                    </div>
                  </AvForm>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Row>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { user, registrationError, loading } = state.Account;
  return { user, registrationError, loading };
};

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register);
