import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, Alert, Container, CardBody, Card } from "reactstrap";

// Redux
import { withRouter, Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// import images
import logo from "../../assets/images/WeDocLogo.png";
import logolight from "../../assets/images/WeDocLogo.png";

const ForgetPasswordPage = (props) => {
  const params = new URLSearchParams(window.location.search);
  // console.log(window.location.search);
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
      // console.warn("result", result);
      result.json().then((resp) => {
        if (result.status == 200) {
          console.warn("resp", resp);
          localStorage.setItem("jwt", resp["x-api-key"]);
          // localStorage.removeItem("refresh-token", JSON.stringify({
          //   login:true,
          //   token:resp.token
          // }))
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
    <Container>
      <Row className="justify-content-center">
        <Col lg={6}>
          <div className="text-center">
            <img
              src={logo}
              alt=""
              style={{ height: "auto", maxWidth: "30%" }}
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
    </Container>
  );
};

export default ForgetPasswordPage;
