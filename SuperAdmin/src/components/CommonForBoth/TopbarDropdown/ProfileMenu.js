import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

// users
import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const ProfileMenu = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState();

  // Get api for the user
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
    fetch(`${REACT_APP_API_ENDPOINT}/user/profile`, requestOptions)
      .then((response) => response.json())
      .then((result) => setProfile(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            // src={PRODUCT_IMAGE_URL + userProfileImage}
            src={profile && profile.profileImage ? `http://170.187.254.215:4000/${profile.profileImage}` : avatar4}
            alt="User image"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            {profile ? profile.name : null}
          </span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/my-profile">
            {" "}
            <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
            {props.t("View Profile")}{" "}
          </DropdownItem>

          <div className="dropdown-divider" />
          <Link to="/logout" className="dropdown-item">
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
