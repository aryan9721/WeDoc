import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card } from "reactstrap";
import { withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import logo from "../../assets/images/WeDocLogo.png";

const ForgetPasswordPage = (props) => {
  const params = new URLSearchParams(window.location.search);
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [otp, setOtp] = useState("");

  function submitotp() {
    console.warn({
      hash: params.get("hash"),
      email: params.get("email"),
      otp,
    });
    let data = {
      hash: params.get("hash"),
      email: params.get("email"),
      otp,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/user/verifyOTP`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        if (result.status === 200) {
          console.warn("resp", resp);
          localStorage.setItem("jwt", resp["x-api-key"]);
          window.open("/dashboard", "_self");
        } else {
          alert("please enter correct otp");
        }
      });
    });
  }

  useEffect(() => {
    document.body.className = "authentication-bg";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <div className="container-fluid">
      <Row className="justify-content-center mt-5 mb-3">
        <Col lg={6}>
          <div className="text-center">
            <img
              src={logo}
              alt=""
              className="img-fluid"
              style={{ maxWidth: "30%" }} // Adjust the maxWidth value as per your requirement
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={5} md={8}>
          <Card>
            <CardBody className="p-4">
              <div className="text-center mt-2">
                <h5 className="text-primary">Enter OTP</h5>
                <p className="text-muted">Enter OTP with We Doc.</p>
              </div>
              <div className="p-2 mt-4">
                <AvForm>
                  <div className="mb-3">
                    <AvField
                      name="otp"
                      label="OTP"
                      className="form-control"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      type="text"
                      required
                    />
                  </div>
                  <Row className="row mb-0">
                    <Col className="col-12 text-center">
                      <button
                        className="btn btn-primary w-md waves-effect waves-light"
                        type="button"
                        onClick={submitotp}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
                </AvForm>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ForgetPasswordPage.propTypes = {
  // PropTypes here
};

export default withRouter(ForgetPasswordPage);
