import React from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  Container,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import videocam from "../../assets/images/videocam.png";
const EventSummery = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const { state } = useLocation();
  const startDate = new Date(state.startDateTime);
  const lastDate = new Date(state.lastDateTime);

  const startDateString = startDate.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const lastDateString = lastDate.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
  console.log(state);
  function saveEvent() {
    const jwt = localStorage.getItem("jwt");
    console.log(localStorage.getItem("jwt"));
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", jwt);

    const data = state;
    var formdata = new FormData();
    formdata.append("image", data.coverImg, data.coverImg);
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("location", data.location);
    formdata.append("isOnline", data.isOnline);
    formdata.append("lastDateTime", data.lastDateTime);
    formdata.append("startDateTime", data.startDateTime);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    fetch(`${REACT_APP_API_ENDPOINT}/event`, requestOptions).then((result) => {
      result.json().then((resp) => {
        if (result.status == 200) {
          console.warn("resp", resp);
          localStorage.setItem("isEvent", true);
          window.open("/edit-events", "_self");
        } else {
          alert("please enter correct credentials");
        }
      });
    });
  }

  const imageUrl = URL.createObjectURL(state.coverImg);

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>

          <Col md={9}>
            <Container fluid={true}>
              <Header />
              <Row
                style={{
                  marginLeft: 10,
                }}
              >
                <h3>Add Event</h3>
              </Row>
              <Row>
                <Col md={2} xl={2}>
                  {" "}
                </Col>

                <Col md={10} xl={10}>
                  <Card className="p-3">
                    <CardTitle
                      style={{
                        fontSize: 22,
                        fontWeight: "500",
                        marginLeft: 10,
                      }}
                    >
                      Summery
                    </CardTitle>
                    <CardBody style={{ border: "1px solid gray" }}>
                      <Row>
                        <CardImg
                          className="img-fluid mb-2"
                          src={imageUrl}
                          style={{ height: "300px", objectFit: "contain" }}
                          alt="Card image cap"
                        />
                      </Row>
                      <hr />
                      <CardSubtitle className="mb-1">
                        <Row>
                          <Col md={11}>
                            {startDateString} - {lastDateString}
                          </Col>
                          <Col
                            md={1}
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: 20,
                              background: "rgba(75, 75, 75, 0.4)",
                              paddingTop: 8,
                              paddingRight: 2,
                            }}
                          >
                            <a
                              href="/events-list"
                              style={{
                                color: "black",
                              }}
                            >
                              <i className="dripicons-pencil"></i>
                            </a>
                          </Col>
                        </Row>
                      </CardSubtitle>

                      <CardSubtitle
                        style={{
                          fontSize: 18,
                          fontWeight: "400",
                        }}
                        className="mb-1"
                      >
                        {state.name}
                      </CardSubtitle>
                      <CardSubtitle className="mb-1">
                        Organised by
                        {state.description}
                      </CardSubtitle>
                      <CardSubtitle className="mb-1">
                        <i className="dripicons-location" /> {state.location}
                      </CardSubtitle>
                      <CardSubtitle className="mb-0">
                        <img src={videocam} width={18} height={15} />{" "}
                        {state.isOnline ? "online" : "offline"}
                      </CardSubtitle>
                    </CardBody>
                    <Row
                      style={{
                        justifyContent: "center",
                        marginTop: 15,
                      }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={saveEvent}
                        style={{ width: "100px", margin: "0 auto" }}
                      >
                        Post
                      </button>
                    </Row>
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

export default EventSummery;
