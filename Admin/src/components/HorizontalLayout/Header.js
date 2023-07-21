import React, { useState } from "react";
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logo from "../../assets/images/logo-sm.png";
import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight1 from "../../assets/images/logo-light1.png"

//i18n
import { withTranslation } from "react-i18next";

const Header = props => {
  const [isSearch, setSearch] = useState(false);
  
  return (
    <React.Fragment>
      <div className="navbar-header">
        <div className="d-flex">
          <div className="navbar-brand-box">
            <Link to="/" className="logo logo-dark">
              <span className="logo-sm">
                <img src={logoLight1} alt="" height="40" width="70"/>
              </span>
              <span className="logo-lg">
                <img src={logoLight1} alt="" height="40" width="250"/>
              </span>
            </Link>

            <Link to="/" className="logo logo-light">
              <span className="logo-sm">
                <img src={logoLight1} alt="" height="40" width="70"/>
              </span>
              <span className="logo-lg">
                <img src={logoLight1} alt="" height="40" width="250"/>
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
            data-toggle="collapse"
            onClick={() => {
              props.toggleLeftmenu(!props.leftMenu);
            }}
            data-target="#topnav-menu-content"
          >
            <i className="fa fa-fw fa-bars" />
          </button>

          <form className="app-search d-none d-lg-block">
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
              />
              <span className="uil-search"></span>
            </div>
          </form>
        </div>

        <div className="d-flex">
          <div className="dropdown d-inline-block d-lg-none ms-2">
            <button
              type="button"
              className="btn header-item noti-icon waves-effect"
              id="page-header-search-dropdown"
              onClick={() => setSearch(!isSearch)}
            >
              <i className="uil-search"></i>
            </button>
            <div
              className={
                isSearch
                  ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                  : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
              }
              aria-labelledby="page-header-search-dropdown"
            >
              <form className="p-3">
                <div className="form-group m-0">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={props.t("Search") + "..."}
                      aria-label="Recipient's username"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <Link to="/ecommerce-cart" className="btn header-item noti-icon waves-effect mt-2">
              <i className="uil-shopping-cart-alt"></i>
              <span className="badge bg-danger rounded-pill">5</span>
            </Link>
            

          <NotificationDropdown />

          <ProfileMenu />

          <div className="dropdown d-inline-block">
            <button
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              type="button"
              className="btn header-item noti-icon right-bar-toggle waves-effect"
            >
              <i className="uil-cog"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func
};

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return { layoutType, showRightSidebar, leftMenu };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(Header));
