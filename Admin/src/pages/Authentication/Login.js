import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Input,
  Label,
  Container,
  CardBody,
  Card,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import logo from "../../assets/images/WeDocLogo.png";
import logolight from "../../assets/images/WeDocLogo.png";

const Login = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  console.log(REACT_APP_API_ENDPOINT);
  const [email, setEmail] = useState("");
  function signinUser() {
    console.warn({
      email,
    });
    let data = {
      email,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/user/login`, {
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
          localStorage.setItem("isauthUser", true);
          window.open(
            `/forgot-password?hash=${resp["hash"]}&email=${resp["email"]}`,
            "_self"
          );
        } else {
          alert("please enter correct email");
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
                <h5 className="text-primary">Welcome Back!</h5>
                <p className="text-muted">Sign in to continue to WeDoc.</p>
              </div>
              <div className="p-2 mt-4">
                <AvForm className="form-horizontal">
                  <div className="mb-3">
                    <AvField
                      name="email"
                      label="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="form-control"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  </div>
                  <div className="mt-3 d-grid">
                    <button
                      className="btn btn-primary btn-block waves-effect waves-light"
                      type="submit"
                      onClick={() => signinUser()}
                    >
                      Log In
                    </button>
                  </div>
                </AvForm>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Login.propTypes = {
  // PropTypes here
};

export default Login;
