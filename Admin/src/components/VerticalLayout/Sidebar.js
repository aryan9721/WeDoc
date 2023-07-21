import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Progress,
  Row,
} from "reactstrap";
import SidebarContent from "./SidebarContent";
import logoSm from "../../assets/images/logo-sm.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light1.png";
import logoLight1 from "../../assets/images/ezyfind-logo-dark.png";
import "./Sidebar.css";
const Sidebar = (props) => {
  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark side-bar-1">
            <span className="logo-sm logo-side-1">
              <img src={logoLight} alt="" height="40" width="70" />
            </span>
            <span className="logo-lg side-logo-lg-1">
              <img
                src={logoLight1}
                alt=""
                height="100"
                width="110"
                padding-top="40"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm logo-side-1">
              <img src={logoLight} alt="" height="40" width="70" />
            </span>
            <span className="logo-lg">
              <img src={logoLight1} alt="" height="95" width="180" />
            </span>
          </Link>
        </div>
        <button
          onClick={() => {
            tToggle();
          }}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars"></i>
        </button>
        <Col>
          <Card>
            <CardBody>
              <div>
                <div>
                  <Progress color="primary" value={50}>
                    50%
                  </Progress>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <div data-simplebar className="h-100">
          <SidebarContent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
