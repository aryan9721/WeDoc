import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Form, Input, Button, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { getPrdShoppingCart } from "../../services/graphql";

// Import menuDropdown
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logoLight1 from "../../assets/images/logo-light1.png";
//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
const Header = (props) => {
  const [search, setsearch] = useState(false);
  const [productList, setProductList] = useState([]);
  const [getCartDetails, { data: getCartData }] =
    useLazyQuery(getPrdShoppingCart);

  const count = localStorage.getItem("cartCount");
  useEffect(() => {
    getCartDetails({
      variables: {
        page: 1,
        size: 2,
      },
    });
  }, [getCartDetails]);

  useEffect(() => {
    if (getCartData && getCartData.getPrdShoppingCart) {
      setProductList(
        getCartData.getPrdShoppingCart.result.prdShoppingCartDto || []
      );
      const data =
        getCartData.getPrdShoppingCart.result.prdShoppingCartDto || [];
      localStorage.setItem("cartCount", JSON.stringify(data.length));
    }
  }, [getCartData]);

  function tToggle() {
    var body = document.body;
    body.classList.toggle("vertical-collpsed");
    body.classList.toggle("sidebar-enable");
  }
  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoLight1} alt="" height="40" width="70" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight1} alt="" height="40" width="250" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLight1} alt="" height="40" width="70" />
                </span>
                <span className="logo-lg">
                  <img src={logoLight1} alt="" height="40" width="250" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
              id="vertical-menu-btn"
            >
              <i className="fa fa-fw fa-bars" />
            </button>
          </div>

          <div className="d-flex">
            {/* <NotificationDropdown /> */}
            <ProfileMenu />
            <div
              onClick={() => {
                props.showRightSidebarAction(!props.showRightSidebar);
              }}
              className="dropdown d-inline-block"
            >
              {/* <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
                <i className="uil-cog"></i>
              </button> */}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
