import "./RequestDetail.css";
import React, { useEffect, useState } from "react";
import {
  Col,
  CardImg,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Table,
  Row,
  Container,
} from "reactstrap";
// import ListIcon from "@mui/icons-material/List";
import RatingTooltip from "react-rating-tooltip";
import Breadcrumb from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo1ezyfind.png";
import img3 from "../../assets/images/small/img-3.jpg";
function RequestDetail() {
  const [def, setdef] = useState("");
  const starStyle = {};
  return (
    <Container className="bg-white">
      <div className="request_details">
        <Breadcrumb title="WeDoc" breadcrumbItem="Home >>Request Details" />
        <h2>Your Business Product or Service</h2>
        <div className="request_1">
          <div className="req_content_left">
            <div className="req_11">
              <div className="request-123">
                {" "}
                <span>
                  {" "}
                  <i className="uil-list-ul"></i>
                </span>{" "}
                &nbsp; CATEGORY
              </div>
              <p className="req-text-cont">
                {" "}
                Product &#187; &#187;Automotive &#187; &#187;Vehile Sales{" "}
              </p>
            </div>
            <div className="req_11">
              <div className="request-123">
                {" "}
                <span>
                  {" "}
                  <i className="uil-card-atm"></i>
                </span>
                &nbsp; AMOUNT
              </div>

              <p className="req-text-cont"> R 100</p>
            </div>
            <div className="req_11">
              <div className="request-123">
                <span>
                  {" "}
                  <i className="uil-graph-bar"></i>
                </span>
                &nbsp; STATUS
              </div>
              <p className="req-text-cont"> Approved </p>
            </div>
            <div className="req_11">
              <div className="request-123">
                <span>
                  {" "}
                  <i className="uil-calender"></i>
                </span>
                &nbsp; DATES
              </div>
              <p className="req-text-cont">
                Start Date: 21-May-2015
                <br />
                Start Date: 21-May-2015
              </p>
            </div>
            <div className="req_11">
              <div className="request-123">
                <span>
                  {" "}
                  <i className="uil-map"></i>
                </span>
                ADDRESS
              </div>
              <p className="req-text-cont">
                190 Commissioner Street,
                <br />
                Gauteng, City of Johannesburg Metropolitan Municipality,
                <br />
                Johannesburg - 2001
                <br />
                112204900
              </p>
            </div>
          </div>
          <div className="req_right">
            <RatingTooltip
              className="rating_list_1"
              max={5}
              onChange={(rate) => {
                setdef(rate);
              }}
              ActiveComponent={
                <i
                  key={"active_1"}
                  className="mdi mdi-star text-primary"
                  style={starStyle}
                />
              }
              InActiveComponent={
                <i
                  key={"active_01"}
                  className="mdi mdi-star-outline text-muted "
                  style={starStyle}
                />
              }
            />
            <img src={img3} alt="" />
          </div>
        </div>
        <div className="request_12">
          <div className="request-123">
            <span>
              {" "}
              <i className="uil-pen"></i>
            </span>
            DECRIPTION
          </div>
          <p className="req-text-cont">
            Register as a business and add your specials to show up here. Obtain
            many more functionality to take advantage on this unique online
            offerings. Your Business Product or Service
          </p>
        </div>
      </div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>
                <i className="uil-plus-circle"></i>Follow up & Comment
              </h4>
              <hr />
              <Row>
                <Card>
                  <Row className="g-0 align-items-center">
                    <Col md={8}>
                      <CardBody>
                        <CardTitle className="h5">
                          {" "}
                          <img className="img__logo" src={logo} alt="" />
                          Krivahn Doss
                        </CardTitle>
                        <CardText>Added Customer on 06-Jan-2016</CardText>
                        <CardText className="button-content-reject">
                          <small className="text-muted">
                            Last updated 6 years ago
                          </small>
                          <div className="div_reject">
                            <button className="accept-button">
                              {" "}
                              <i className="uil-plus-circle"></i>Accept
                            </button>
                            <button className="reject-button">
                              {" "}
                              <i className="uil-plus-circle"></i>Reject
                            </button>
                          </div>
                        </CardText>
                        <input
                          type="text"
                          className="form-control chat-input rounded"
                          value=""
                          placeholder="Enter Message..."
                        />
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default RequestDetail;
