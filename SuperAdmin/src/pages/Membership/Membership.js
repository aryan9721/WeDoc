import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Modal,
  Form,
  Button,
} from "reactstrap";
import setupanalytics from "../../assets/images/setup-analytics-amico.svg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Membership = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [name, setName] = useState([]);
  const [duration, setDuration] = useState([]);
  const [amount, setAmount] = useState([]);
  const [list, setList] = useState();
  const [membershipList, setMembershipList] = useState();
  const [association, setAssociation] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchAssociation, setSearchAssociation] = useState("");

  // for the new membership listing POST API
  function addMembership() {
    console.warn({
      duration,
      amount,
      name,
    });
    let data = {
      duration,
      amount,
      name,
    };
    fetch(`${REACT_APP_API_ENDPOINT}/membership/plan`, {
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
          // console.warn("resp", resp);
          // localStorage.setItem("isAddMembership", true);
          window.open("/membership", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  // for showing the different membership on cards GET API for cards
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

  // for showing list of doctors who has taken memberships GET API for list
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const jwt = localStorage.getItem("jwt");
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const getAssociation = (arr, emailId) => {
    console.log(emailId);
    let asso = (arr ?? []).find((_association) => _association._id === emailId);
    return asso && asso.name ? asso.name : "Default Name";
  };
  useEffect(() => {
    const url = new URL(`${REACT_APP_API_ENDPOINT}/doctor`);
    url.searchParams.append("name", searchName);
    url.searchParams.append("association", searchAssociation);

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => setList(result))
      .catch((error) => console.log("error", error));
  }, [searchName, searchAssociation]);

  // / For Deleting the mempership

  function deleteUser(_id) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("x-api-key", jwt);
    var raw = JSON.stringify({
      membershipId: _id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log(_id);
    fetch(`${REACT_APP_API_ENDPOINT}/membership`, requestOptions).then(
      (result) => {
        result.json().then((response) => {
          console.warn(response);
          window.open("/membership", "_self");
        });
      }
    );
  }

  // for updating the membership
  function updateMembership(_id, index) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name[index],
      duration: duration[index],
      amount: amount[index],
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

  // Association k dropdown  liye calling get api here
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

  function tog_backdrop1(index) {
    setmodal_backdrop1(!modal_backdrop1);
    removeBodyCss();
    setName(membershipList[index].name);
    setDuration(membershipList[index].duration);
    setAmount(membershipList[index].amount);
  }

  // function of madal starts from here
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
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Container fluid={true} className="p-3">
              <Header />

              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <Col md="10"> </Col>
                        <Col md="2">
                          <div className="mb-2">
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                tog_backdrop();
                              }}
                              data-toggle="modal"
                            >
                              <i className="dripicons-plus" /> Add New Plan
                            </button>
                            <Modal
                              isOpen={modal_backdrop}
                              toggle={() => {
                                tog_backdrop();
                              }}
                              scrollable={true}
                              id="staticBackdrop"
                            >
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="staticBackdropLabel"
                                >
                                  Create a new Membership plan
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={() => {
                                    setmodal_backdrop(false);
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
                                          required={true}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
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
                                        Duration of the Membership (Months)*
                                      </label>
                                      <div>
                                        <input
                                          className="form-control"
                                          type="number"
                                          value={duration}
                                          required={true}
                                          onChange={(e) =>
                                            setDuration(e.target.value)
                                          }
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
                                          required={true}
                                          onChange={(e) =>
                                            setAmount(e.target.value)
                                          }
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
                                  onClick={addMembership}
                                >
                                  Add
                                </button>
                              </div>
                            </Modal>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        {membershipList &&
                          membershipList.map((membership, index) => (
                            <Col key={index} xl={6}>
                              <Card className="bg-primary">
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={8}>
                                      <p className="text-white font-size-18">
                                        <b>
                                          {membership ? membership.name : null}
                                        </b>{" "}
                                      </p>
                                      <p className="text-white font-size-16">
                                        Membership for{" "}
                                        {membership
                                          ? membership.duration
                                          : null}{" "}
                                        months plan
                                      </p>
                                      <p className="text-white font-size-16">
                                        ₹{" "}
                                        {membership ? membership.amount : null}
                                      </p>
                                      <Row>
                                        <Col>
                                          <button
                                            type="button"
                                            className="btn btn-warning upgrade-4 waves-effect waves-light"
                                            onClick={() => {
                                              tog_backdrop1();
                                            }}
                                            data-toggle="modal"
                                          >
                                            Edit
                                          </button>
                                          <Modal
                                            isOpen={modal_backdrop1}
                                            toggle={() => {
                                              tog_backdrop1(index);
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
                                                        value={name[index]}
                                                        onChange={(e) => {
                                                          setName(
                                                            (prevState) => {
                                                              const updatedName =
                                                                [...prevState];
                                                              updatedName[
                                                                index
                                                              ] =
                                                                e.target.value;
                                                              return updatedName;
                                                            }
                                                          );
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
                                                      Duration of the
                                                      Membership*
                                                    </label>
                                                    <div>
                                                      <input
                                                        className="form-control"
                                                        type="number"
                                                        value={duration[index]}
                                                        onChange={(e) => {
                                                          setDuration(
                                                            (prevState) => {
                                                              const updatedDuration =
                                                                [...prevState];
                                                              updatedDuration[
                                                                index
                                                              ] =
                                                                e.target.value;
                                                              return updatedDuration;
                                                            }
                                                          );
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
                                                        value={amount[index]}
                                                        onChange={(e) => {
                                                          setAmount(
                                                            (prevState) => {
                                                              const updatedAmount =
                                                                [...prevState];
                                                              updatedAmount[
                                                                index
                                                              ] =
                                                                e.target.value;
                                                              return updatedAmount;
                                                            }
                                                          );
                                                        }}
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
                                                  updateMembership(
                                                    membership._id,
                                                    index
                                                  )
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
                        <Col lg={2} className="h5">
                          List of Members
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Name"
                              value={searchName}
                              onChange={(e) => setSearchName(e.target.value)}
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Association"
                              value={searchAssociation}
                              onChange={(e) =>
                                setSearchAssociation(e.target.value)
                              }
                            />
                          </div>
                        </Col>
                      </Row>

                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Doctor Name</th>
                              <th>Association Name</th>
                              <th>Buying Date</th>
                              <th>Expiry Date</th>
                              <th>Status</th>
                              <th>Membership</th>
                              {/* <th>Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {list &&
                              list
                                .filter((doctor) =>
                                  doctor.name
                                    .toLowerCase()
                                    .includes(searchName.toLowerCase())
                                )
                                .filter((doctor) =>
                                  getAssociation(
                                    association,
                                    doctor.association
                                  )
                                    .toLowerCase()
                                    .includes(searchAssociation.toLowerCase())
                                )
                                .map((index, id) => (
                                  <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td>{index ? index.name : null}</td>
                                    <td>
                                      {index
                                        ? getAssociation(
                                            association,
                                            index.association
                                          )
                                        : null}
                                    </td>
                                    <td>
                                      {index.plan
                                        ? new Date(
                                            index.plan.startDate
                                          ).toLocaleDateString("en-GB")
                                        : null}
                                    </td>

                                    <td>
                                      {index.plan
                                        ? new Date(
                                            index.plan.expiryDate
                                          ).toLocaleDateString("en-GB")
                                        : "-"}
                                    </td>

                                    <td className="text-success">
                                      {index.plan ? index.plan.status : null}
                                    </td>
                                    <td>
                                      {index.plan ? index.plan.name : null}
                                    </td>
                                    {/* <td>
                                      <Button
                                        color="danger"
                                        className="btn btn-primary waves-effect waves-light m-2"
                                        onClick={() =>
                                          deleteUser(index && index._id)
                                        }
                                      >
                                        Remove
                                      </Button>
                                    </td> */}
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

export default Membership;
