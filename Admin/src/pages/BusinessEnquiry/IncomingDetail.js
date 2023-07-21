import "../../pages/Authentication/RequestDetail.css";
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
  Button,
} from "reactstrap";
// import ListIcon from "@mui/icons-material/List";
import RatingTooltip from "react-rating-tooltip";
import Breadcrumb from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo1ezyfind.png";
import img3 from "../../assets/images/small/img-5.jpg";
function IncomingDetail() {
  const [def, setdef] = useState("");
  const starStyle = {};
  return (
    <Container className="bg-white">
      <div className="request_details">
        <Breadcrumb title="WeDoc" breadcrumbItem="Home >>Incoming Details" />
        <h2>Testing My First Customer Enquiry</h2>
        <div className="request_1">
          <div className="req_content_left">
            <div className="req_11">
              <div className="request-123">
                {" "}
                <span>
                  {" "}
                  <i className="uil-list-ul"></i>
                </span>{" "}
                &nbsp; INDIVIDUAL
              </div>
              <p className="req-text-cont"> Jitendra bhargava </p>
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
                &nbsp;ENQUIRY DATE
              </div>
              <p className="req-text-cont">21-May-2015</p>
            </div>
            <div className="req_11">
              <div className="request-123">
                <span>
                  {" "}
                  <i className="uil-pen"></i>
                </span>
                DECRIPTION
              </div>
              <p className="req-text-cont">
                Register as a business and add your specials to show up here.
                Obtain many more functionality to take advantage on this unique
                online offerings. Your Business Product or Service
              </p>
            </div>
          </div>
          <div className="req_right">
            <div className="req__145">
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
            </div>
            <img src={img3} alt="" />
          </div>
        </div>
      </div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4>
                <i className="uil-plus-circle"></i> Comment
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
                        </CardText>
                      </CardBody>
                    </Col>
                  </Row>
                </Card>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <h4>
                        <i className="uil-comment-dots"></i>Leave A Comment
                      </h4>
                      <hr />
                      <Row>
                        <Col>
                          <div className="mb-3">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Write comment here..."
                            />
                          </div>
                        </Col>
                      </Row>
                      <Button color="primary" type="submit">
                        submit
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default IncomingDetail;
