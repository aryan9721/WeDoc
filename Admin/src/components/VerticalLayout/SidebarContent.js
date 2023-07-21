import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";
import jwt from "jsonwebtoken";

// //Import Scrollbar
import SimpleBar from "simplebar-react";
import { isEmpty, map } from "lodash";
// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import Slider from "react-rangeslider";

const SidebarContent = (props) => {
  const ref = useRef();
  const [def, setdef] = useState(15);

  return (
    <React.Fragment>
      <SimpleBar
        style={{ maxHeight: "100%" }}
        ref={ref}
        className="sidebar-menu-scroll"
      >
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="uil-home-alt"></i>
                <span className="badge rounded-pill bg-primary float-end">
                  New
                </span>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className="uil-calender"></i>
                <span>{props.t("Event")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/events-list">{props.t("Add Event")}</Link>
                </li>
                <li>
                  <Link to="/edit-events">{props.t("Edit Event")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#" className="has-arrow waves-effect">
                <i className="uil-plus"></i>
                <span>{props.t("CME")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/cme-list">{props.t("Add CME")}</Link>
                </li>
                <li>
                  <Link to="/edit-cme">{props.t("Edit CME")}</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-image-resize-square"></i>
                <span>{props.t("Gallery")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/add-gallery">{props.t("Add Gallery")}</Link>
                </li>
                <li>
                  <Link to="/edit-gallery">{props.t("Edit Gallery")}</Link>
                </li>
              </ul>
            </li>

            {/* <li>
                <Link to="/career" className="waves-effect">
                  <i className="uil-edit"></i>
                  <span>{props.t("Career")}</span>
                </Link>
              </li> */}

            {/* <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="uil-camera"></i>
                  <span>{props.t("Featured Videos")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/add-featured-videos">
                      {props.t("Upload Videos")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-featured-videos">
                      {props.t("Edit Videos")}
                    </Link>
                  </li>
                </ul>
              </li> */}

            {/* <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="uil-fire"></i>
                  <span>{props.t("Top Stories")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/add-top-stories">
                      {props.t("Upload Stories")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-top-stories">
                      {props.t("Edit Stories")}
                    </Link>
                  </li>
                </ul>
              </li> */}

            <Row>
              {/* {mainBusinessUser === true && ( */}
              <li>
                <Link to="/trending" className="waves-effect">
                  <i className="uil-pen"></i>
                  <span>{props.t("Trending")}</span>
                </Link>
              </li>
              {/* )} */}
            </Row>

            {/* <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="uil-telegram"></i>
                  <span>{props.t("Advertisement")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/add-advertisement">
                      {props.t("Upload Advertisement")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/edit-advertisement">
                      {props.t("Edit Advertisement")}
                    </Link>
                  </li>
                </ul>
              </li> */}

            {/* <li>
                <Link to="/reference" className="waves-effect">
                  <i className="uil-user-check"></i>
                  <span>{props.t("Reference")}</span>
                </Link>
              </li> */}

            <li>
              <Link to="/membership" className="waves-effect">
                <i className="uil-cloud-bookmark"></i>
                <span>{props.t("Membership")}</span>
              </Link>
            </li>
            <li>
              <Link to="/doctors" className="waves-effect">
                <i className="uil-book-medical"></i>
                <span>{props.t("Doctors")}</span>
              </Link>
            </li>

            <li>
              <Link to="/feedback" className="waves-effect">
                <i className="uil-feedback"></i>
                <span>{props.t("Feedback")}</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/association" className="waves-effect">
                <i className="uil-layer-group"></i>
                <span>{props.t("Association")}</span>
              </Link>
            </li> */}

            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/calendar" className=" waves-effect">
                    <i className="uil-calender"></i>
                    <span>{props.t("Calendar")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <li>
              <Link to="/chat" className="waves-effect">
                <i className="uil-comments-alt"></i>
                <span className="badge rounded-pill bg-warning float-end">
                  {props.t("New")}
                </span>
                <span>{props.t("Chat")}</span>
              </Link>
            </li> */}

            <li>
              {/* <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-store"></i>
                <span>{props.t("Ecommerce")}</span>
              </Link> */}
              <ul className="sub-menu">
                {/* <li>
                  <Link to="/ecommerce-products">{props.t("Products")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/myproduct">{props.t("My Product ")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-orders">{props.t("Orders")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-customers">{props.t("Customers")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-cart">{props.t("Cart")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-checkout">{props.t("Checkout")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-shops">{props.t("Shops")}</Link>
                </li> */}
                {/* <li>
                  <Link to="/ecommerce-add-product">
                    {props.t("Add Product")}
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/lead" className="waves-effect">
                    <i className="uil-cell"></i>
                    <span>{props.t("Leads")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/businessenquiry" className="waves-effect">
                    <i className="uil-comment-message"></i>
                    <span>{props.t("Business Enquiry")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/#" className="has-arrow waves-effect">
                    <i className="uil-envelope"></i>
                    <span>{props.t("Email")}</span>
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/email-inbox">{props.t("Inbox")}</Link>
                    </li>
                    <li>
                      <Link to="/email-read">{props.t("Read Email")} </Link>
                    </li>
                  </ul>
                </li>
              )}
            </Row> */}

            {/* <li>
              <Link to="/special" className="waves-effect">
                <i className="uil-medal"></i>
                <span>{props.t("View Specials")}</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/catalogue" className="waves-effect">
                <i className="uil-layer-group"></i>
                <span>{props.t("View eCatalogues")}</span>
              </Link>
            </li> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/reviews" className="waves-effect">
                    <i className="uil-favorite"></i>
                    <span>{props.t("Rating & Reviews")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-book-alt"></i>
                <span>{props.t("Contacts")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/contacts-grid">{props.t("User Grid")}</Link>
                </li>
                <li>
                  <Link to="/contacts-list">{props.t("User List")}</Link>
                </li>
                <li>
                  <Link to="/contacts-profile">{props.t("Profile")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li className="menu-title">Activities</li>
            <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/companyProfile" className="waves-effect">
                    <i className="uil-user-square"></i>
                    <span>{props.t("Company Profile")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/myspecial" className="waves-effect">
                    <i className="uil-no-entry"></i>
                    <span>{props.t("My Special")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/myecatalogue" className="waves-effect">
                    <i className="uil-book-open"></i>
                    <span>{props.t("My eCatalogues")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <li>
              <Link to="/myrequest" className="waves-effect">
                <i className="uil-edit"></i>
                <span>{props.t("My Request")}</span>
              </Link>
            </li> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/incomingbusinessenquiry" className="waves-effect">
                    <i className="uil-comment-alt-message"></i>
                    <span>{props.t("Incoming Customer Enquiry")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <li>
              <Link to="/myfavourite" className="waves-effect">
                <i className="uil-heart-alt"></i>
                <span>{props.t("My Favourite")}</span>
              </Link>
            </li>

            <li>
              <Link to="/myreviews" className="waves-effect">
                <i className="uil-thumbs-up"></i>
                <span>{props.t("My Ratings & Reviews")}</span>
              </Link>
            </li> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li className="menu-title">{props.t("CRM")}</li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/customer" className="waves-effect">
                    <i className="uil-users-alt"></i>
                    <span>{props.t("Customer")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/inventory" className="waves-effect">
                    <i className="uil-vector-square"></i>
                    <span>{props.t("Inventory")}</span>
                  </Link>
                </li>
              )}
            </Row> */}

            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/quotes" className="waves-effect">
                    <i className="uil-telegram-alt"></i>
                    <span>{props.t("Quotes")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            {/* <Row>
              {mainBusinessUser === true && (
                <li>
                  <Link to="/settingpage" className="waves-effect">
                    <i className="uil-cog"></i>
                    <span>{props.t("SettingPage")}</span>
                  </Link>
                </li>
              )}
            </Row> */}
            <br />
            <br />
            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-flask"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-session-timeout">
                    {props.t("Session Timeout")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-sweet-alert">{props.t("Sweet-Alert")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
                <li>
                  <Link to="/ui-notifications">{props.t("Notifications")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="uil-shutter-alt"></i>
                <span className="badge rounded-pill bg-info float-end">6</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/basic-elements">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-xeditable">{props.t("Form Xeditable")}</Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-list-ul"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Table")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Table")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
                <li>
                  <Link to="/tables-editable">{props.t("Editable Table")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-chart"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/apex-charts">{props.t("Apex")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartjs")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-streering"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-unicons">{props.t("Unicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-location-point"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-leaflet">{props.t("Leaflet Maps")}</Link>
                </li>
              </ul>
            </li> */}

            {/* <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-share-alt"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
