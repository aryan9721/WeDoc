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
  Button,
  Container,
} from "reactstrap";
// import ListIcon from "@mui/icons-material/List";
import RatingTooltip from "react-rating-tooltip";
import Breadcrumb from "../../components/Common/Breadcrumb";
import logo from "../../assets/images/logo1ezyfind.png";
import img3 from "../../assets/images/small/img-5.jpg";
function CatalogueDetail() {
  const [def, setdef] = useState("");
  const starStyle = {};
  return (
    <Container className="bg-white">
      <div className="request_details">
        <Breadcrumb title="WeDoc" breadcrumbItem="Home >>Catalogue Detail" />
        <h1>
          Extraordinary Wedding Venue
          <i className="uil-heart" />
        </h1>
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
                Services &#187; &#187;Entertainment{" "}
              </p>
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
                &nbsp; COMPANY Name
              </div>
              <p className="req-text-cont"> Zulu Nyala Game Lodges </p>
            </div>
            <div className="req_11">
              <div className="request-123">
                <span>
                  {" "}
                  <i className="uil-map"></i>
                </span>
                &nbsp; COMPANY LOCATION
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
          <div className="req_right ">
            <div className="content__123">
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
        <div className="request_1245">
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
        <div className="request_12">
          <div className="request-123">
            <span>
              {" "}
              <i className="uil-pen"></i>
            </span>
            WRITE REVIEW
          </div>
          <p className="req-text-cont">
            Give rating and write review about this catalogue. Your ratings will
            get published after Admin approves it.{" "}
          </p>
          <div className="request-123">
            <span>
              {" "}
              <i className="uil-pen"></i>
            </span>
            <span>Select Rating: &nbsp; &nbsp;</span>
            <span className="content_11">
              <RatingTooltip
                className="rating_list_2"
                max={5}
                onChange={(rate) => {
                  setdef(rate);
                }}
                ActiveComponent={
                  <i
                    key={"active_1"}
                    className="mdi mdi-star "
                    style={starStyle}
                  />
                }
                InActiveComponent={
                  <i
                    key={"active_01"}
                    className="mdi mdi-star-outline "
                    style={starStyle}
                  />
                }
              />
            </span>
            <input
              type="text"
              className="form-control chat-input rounded input_box"
              value=""
              placeholder="Enter Review..."
            />{" "}
            <Button>
              <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
              <i className="mdi mdi-send float-end"></i>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default CatalogueDetail;
