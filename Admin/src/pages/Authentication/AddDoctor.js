import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './AddDoctor.css'
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
import InputAdornment from "@material-ui/core/InputAdornment";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const AddDoctor = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [degree, setDegree] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [demail, setdEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [yoe, setYoe] = useState("");
  const [successfulOT, setSuccessfulOT] = useState("");
  const [patientRecovered, setPatientRecovered] = useState("");
  const [certificatesAchieved, setCertificatesAchieved] = useState("");
  const [association, setAssociation] = useState();
  // const { associationid } = useParams();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const BACKEND_URL = "http://170.187.254.215:4000";

  const [plan, setplan] = React.useState([]);
  const fetch_plan = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    let res = await fetch(`${BACKEND_URL}/api/membership/plan`, requestOptions);
    let response = await res.json();
    console.log(response);
    setplan(response);
  };
  useEffect(() => {
    fetch_plan();
  }, []);
  const params = new URLSearchParams(window.location.search);
  const associationid = params.get("aid");
  const imageUris = [
    "https://images.unsplash.com/photo-1674069698493-c2868c7115e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674076342844-4eb2eba04dd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674064299395-e1472219eaf3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674100429730-df12f845ff26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MjN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1673993386955-45fc437f5de9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mzd8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    "https://images.unsplash.com/photo-1674108015366-95f4dbf94d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    // ...
  ];
  const getImageForPlan = (index) => {
    return { uri: imageUris[index] };
  };
  function getDateAfterMonths(startDate, months) {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + months);
    return date;
  }
  function addDoctor(plan) {
    console.warn({
      associationid,
      degree,
      name,
      contact,
      demail,
      designation,
      yoe,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
    });

    // const { associationid } = useParams();
    console.log(associationid);
    let data = {
      association: associationid,
      degree,
      name,
      contact,
      email: demail,
      designation,
      yoe,
      successfulOT,
      patientRecovered,
      certificatesAchieved,
      plan: {
        id: plan._id,
        name: plan.name,
        startDate: new Date(),
        expiryDate: getDateAfterMonths(new Date(), plan.duration),
        status: 'running'
      }
    };
    console.log('data',data)
    fetch(`${REACT_APP_API_ENDPOINT}/doctor`, {
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
          alert("Doctor added successfully!");
          console.warn("resp", resp);
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }
  const handleUpdate = (id) => {
    // console.log(`${BACKEND_URL}/api/doctor/updateMembershipPlan`, id, apiKey);
    var myHeaders = new Headers();
    // myHeaders.append("x-api-key", apiKey);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${BACKEND_URL}/api/doctor/updateMembershipPlan`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  function handlePayNow(plan) {
    console.log(plan);
    addDoctor(plan);
    // handleUpdate(plan);
  }
  return (
    <div
      style={{
        width: "50%",
        justifyItems: 'center',
        display: "grid",
        minWidth: 320,
      }}
    >
      <Form>
        <Row>
          <Col className="mb-1">
            <label htmlFor="example-text-input" className="col-form-label">
              Name*
            </label>
            <div>
              <input
                className="form-control"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mb-1">
            <label htmlFor="example-text-input" className="col-form-label">
              Contact No.*
            </label>
            <div>
              <input
                className="form-control"
                type="number"
                value={contact}
                required={true}
                onChange={(e) => setContact(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Degree
            </label>
            <div>
              <input
                className="form-control"
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Email*
            </label>
            <div>
              <input
                className="form-control"
                type="email"
                value={demail}
                required={true}
                onChange={(e) => setdEmail(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Designation*
            </label>
            <div>
              <input
                className="form-control"
                type="text"
                value={designation}
                required={true}
                onChange={(e) => setDesignation(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              Year of experience
            </label>
            <div>
              <input
                className="form-control"
                type="number"
                value={yoe}
                onChange={(e) => setYoe(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              SuccessfulOT
            </label>
            <div>
              <input
                className="form-control"
                type="number"
                value={successfulOT}
                onChange={(e) => setSuccessfulOT(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              PatientRecovered
            </label>
            <div>
              <input
                className="form-control"
                type="number"
                value={patientRecovered}
                onChange={(e) => setPatientRecovered(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="mb-1">
            <label
              htmlFor="example-text-input"
              className="col-md-2 col-form-label"
            >
              CertificatesAchieved
            </label>
            <div>
              <input
                className="form-control"
                type="number"
                value={certificatesAchieved}
                required={true}
                onChange={(e) => setCertificatesAchieved(e.target.value)}
              />
            </div>
          </Col>
        </Row>
      </Form>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
        <ModalBody>
        {plan.map((plan, id) => (
        <div
          key={id}
          // onClick={() => handlePayNow(plan)}
          className="welcome"
        >
          <div style={{ margin: 10 }}>
            <div style={{ borderRadius: 11.78 }}>
              <div style={{ overflow: "hidden" }}>
                <img
                  src={imageUris[0]}
                  alt="Plan Image"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: 11.78,
                  }}
                />
                {/* {top-left1} */}
                {/* <p className="text4">{plan.name}</p> */}
                {/* top-left2 */}
                {/* <p className="text5">Association fees for 12 Months</p> */}
                {/* top-right */}
                {/* <p className="text">Upto{"\n"} 25% off </p> */}
                {/* bottom-left */}
                <p
                  // className="text1"
                  style={{
                    fontSize: 24,
                    color: "black",
                  }}
                >
                  ₹ {plan.amount ? plan.amount : 1000}
                </p>
                {/* <div className="text2"> */}
                  <button
                    className="pay-button"
                    onClick={() => handlePayNow(plan)}
                  >
                    Pay Now
                  </button>
                {/* </div> */}

                {/* bottom-right */}
                {/* <p
                className="text3"
                  style={{
                    fontSize: 15,
                    color: "red",
                  }}
                >
                  Membership Expired in {"\n"}{" "}
                  {plan.duration ? plan.duration : 1} months
                </p> */}
              </div>
            </div>
          </div>
          <div>
            <p className="welcome"> </p>
          </div>
          <div>
            <p className="welcome"> </p>
          </div>
          <div>
            <p className="welcome"> </p>
          </div>
          <div>
            <p className="welcome"> </p>
          </div>
        </div>
      ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close Modal
          </Button>
        </ModalFooter>
      </Modal>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={toggleModal}>
          Done
        </button>
      </div>
    </div>
  );
};

AddDoctor.propTypes = {
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
})(AddDoctor);
