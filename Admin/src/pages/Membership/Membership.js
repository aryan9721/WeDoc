import React, { useState, useEffect } from "react";
import { Row, Col, Card, CardBody, Container, Modal, Form } from "reactstrap";
import { Button, ButtonDropdown } from "reactstrap";
import setupanalytics from "../../assets/images/setup-analytics-amico.svg";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";

const Membership = () => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [modal_backdrop1, setmodal_backdrop1] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState();
  const [amount, setAmount] = useState("");
  const [list, setList] = useState();
  const [membershipList, setMembershipList] = useState();
  const [association, setAssociation] = useState();
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // for the new membership_plan listing POST API
  function addMembershipPlan() {
    console.warn({
      name,
      duration,
      amount,
      association,
    });
    if (association && association._id) {
      let data = {
        name,
        duration,
        amount,
        association: association._id,
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
            console.warn("resp", resp);
            localStorage.setItem("isAddMembership", true);
            window.open("/membership", "_self");
          } else {
            alert("please enter correct credentials");
          }
        });
      });
    } else {
      // Handle the case when association is null
      alert("Association is null or doesn't have an _id property");
    }
  }

  // GET membership_plans list (cards showing)
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
    if (association && association._id) {
      fetch(
        `${REACT_APP_API_ENDPOINT}/association/membership_plan?association=${association._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setMembershipList(result))
        .catch((error) => console.log("error", error));
    }
  }, [association]);

  // for showing list of doctors who has taken memberships GET API for list
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const getAssociation = (arr, emailId) => {
    console.log(emailId);
    if (Array.isArray(arr)) {
      let asso = arr.find(
        (_association) => _association.association === emailId
      );
      return asso && asso.name ? asso.name : "Default Name";
    }
    return "Default Name";
  };

  useEffect(() => {
    if (association && association._id) {
      fetch(
        `${REACT_APP_API_ENDPOINT}/association/doctors?association=${association._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          // Filter the list based on the search query
          const filteredList = result.filter((member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          console.log("docs", filteredList);
          setList(filteredList);
        })
        .catch((error) => console.log("error", error));
    }
  }, [association, searchQuery]);

  useEffect(() => {
    if (email) {
      fetch(
        `${REACT_APP_API_ENDPOINT}/president/association?email=${email}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setAssociation(result))
        .catch((error) => console.log("error", error));
    }
  }, [email]);

  // chaning of profile k liye useeffect lagate hai
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/user/profile`, {
      method: "GET",
      headers: { "x-api-key": jwt },
    })
      .then((response) => response.json())
      .then((result) => {
        setEmail(result.email);
      })
      .catch((error) => console.log("error", error));
  }, [jwt]);
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
  const [membership, setMemebership] = useState("null");
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/membership/plan`, {
      method: "GET",
      headers: { "x-api-key": jwt },
    })
      .then((response) => response.json())
      .then((result) => {
        setMemebership(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, [list]);
  const getMembershipName = (id) => {
    console.log(id);
    const foundObject = membership.find((obj) => obj._id === id);

    if (foundObject) {
      return foundObject.name;
    }

    return "No Membership";
  };
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
                        <Col md="10" className="h4">
                          Mempership{" "}
                        </Col>
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
                                  onClick={addMembershipPlan}
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
                          membershipList.map((index, id) => (
                            <Col key={id} xl={6}>
                              <Card className="bg-primary">
                                <CardBody>
                                  <Row className="align-items-center">
                                    <Col sm={8}>
                                      <p className="text-white font-size-18">
                                        <b>{index ? index.name : null}</b>{" "}
                                      </p>
                                      <p className="text-white font-size-16">
                                        Membership for{" "}
                                        {index ? index.duration : null} months
                                        plan
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
                                                          setName(
                                                            e.target.value
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
                                                        value={duration}
                                                        onChange={(e) => {
                                                          setDuration(
                                                            e.target.value
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
                                                        value={amount}
                                                        onChange={(e) => {
                                                          setAmount(
                                                            e.target.value
                                                          );
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
                        <Col lg={2} className="h5">
                          List of Members
                        </Col>
                        <Col lg={4} className="mb-4">
                          <input
                            className="form-control"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by doctor's name"
                          />
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <table className="table table-bordered border-dark mb-0 text-center">
                          <thead>
                            <tr>
                              <th>Sr.No</th>
                              <th>Doctor Name</th>
                              {/* <th>Association Name</th> */}
                              <th>Buying Date</th>
                              <th>Expiry Date</th>
                              <th>Status</th>
                              <th>Plan</th>
                              {/* <th>Action</th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {list &&
                              list.map((index, id) => (
                                <tr key={id}>
                                  <th scope="row">{id + 1}</th>
                                  <td>{index ? index.name : null}</td>
                                  {/* <td>
                                    {index
                                      ? getAssociation(
                                          association,
                                          index.association
                                        )
                                      : null}
                                  </td> */}
                                  <td>
                                    {index.plan
                                      ? new Date(
                                          index.plan.startDate
                                        ).toLocaleDateString("en-GB")
                                      : null}
                                  </td>

                                  <td>
                                    {index.plan.expiryDate
                                      ? new Date(
                                          index.plan.expiryDate
                                        ).toLocaleDateString("en-GB")
                                      : "-"}
                                  </td>

                                  <td className="text-success">
                                    {index ? index.plan.status : null}
                                  </td>
                                  <td>{index ? index.plan.name : null}</td>
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
