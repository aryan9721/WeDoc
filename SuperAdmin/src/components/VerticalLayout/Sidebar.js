import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarContent from "./SidebarContent";
import logoLight from "../../assets/images/logo-light1.png";
import logoLight1 from "../../assets/images/ezyfind-logo-dark.png";
import "./Sidebar.css";

const Sidebar = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <React.Fragment>
      <div className={`vertical-menu ${sidebarOpen ? "sidebar-enable" : ""}`}>
        <div className="navbar-brand-box">
          <Link
            to="/dashboard"
            className="logo logo-dark side-bar-1"
            style={{ marginLeft: "20px" }}
          >
            <span className="logo-sm logo-side-1">
              <img src={logoLight} alt="" height="40" width="70" />
            </span>
            <span className="logo-lg side-logo-lg-1">
              <img
                src={logoLight1}
                alt=""
                height="100"
                width="100"
                style={{ paddingTop: "1px" }}
              />
            </span>
          </Link>

          <Link to="/dashboard" className="logo logo-light">
            <span className="logo-sm logo-side-1">
              <img src={logoLight} alt="" height="40" width="70" />
            </span>
            <span className="logo-lg">
              <img src={logoLight1} alt="" height="95" width="180" />
            </span>
          </Link>
        </div>
        <button
          onClick={toggleSidebar}
          type="button"
          className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
        >
          <i className="fa fa-fw fa-bars"></i>
        </button>

        <div className="h-100 d-flex flex-column mt-4">
          <SidebarContent />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
