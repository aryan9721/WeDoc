import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import jwt from "jsonwebtoken";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  CardTitle,
  CardText,
  Media,
  Modal,
  Button,
  Table,
  NavLink,
  NavItem,
  Nav,
  TabContent,
  TabPane,
  FormGroup,
  Label,
} from "reactstrap";
import { isEmpty, map } from "lodash";
// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";
import avatar from "../../assets/images/small/img-4.jpg";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import classnames from "classnames";
// actions
import {
  editProfile,
  resetProfileFlag,
  profileError,
  profileSuccess,
} from "../../store/actions";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  CANCEL_BUSINESS_PACKAGE,
  PAUSE_BUSINESS_PACKAGE,
  UNPAUSE_BUSINESS_PACKAGE,
  getMstPackageList,
  getUser,
  upgradeBusinessPackage,
  mstCompany,
} from "../../services/graphql";
import { PRODUCT_IMAGE_URL } from "../../common/config";
const UserProfile = (props) => {
  const [email, setemail] = useState("");
  const [userProfileImage, setuserProfileImage] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const [modal_scroll, setmodal_scroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mainBusinessUser, setMainBusinessUser] = useState(false);
  const [packageData, setPackageDetailData] = useState({});
  const [packageList, setPackageList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [mstCompanyData, setMstCompanyData] = useState(null);
  
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [fetchGetUser, { data: getUserData }] = useLazyQuery(getUser);
  const [fetchPackageDetail, { data: packageDetailData }] =
    useLazyQuery(getMstPackageList);
  const [companyProfileDetails, setCompanyProfileDetails] = useState({});
  const [fetchPackageList, { data: packageListData }] =
    useLazyQuery(getMstPackageList);
  const [abhi, setAbhi] = useState("");

  const data = {
    rows: companyProfileDetails,
  };
  const rowData = [
    {
      logoPath: "CompanyLogo/1/869630311_08-05-2015_12_27_1.png",
    },
  ];
  useEffect(() => {
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);

    if (Object.values(decodeJwt)[4] === "Main Business User") {
      setMainBusinessUser(true);
    }
    fetchGetUser();
    fetchPackageList({
      variables: {
        packageIds: null,
        status: true,
      },
    });
  }, [fetchGetUser, fetchPackageList]);
  const [fetchMstCompany, { data: fetchMstCompanyData }] =
  useLazyQuery(mstCompany);
  const [
    pauseSubscription,
    {
      loading: pauseSubscriptionLoading,
      data: pauseSubscriptionData,
      error: pauseSubscriptionError,
    },
  ] = useMutation(PAUSE_BUSINESS_PACKAGE);

  const [
    unPauseSubscription,
    {
      loading: unPauseSubscriptionLoading,
      data: unPauseSubscriptionData,
      error: unPauseSubscriptionError,
    },
  ] = useMutation(UNPAUSE_BUSINESS_PACKAGE);

  const [
    cancelSubscription,
    {
      loading: cancelSubscriptionLoading,
      data: cancelSubscriptionData,
      error: cancelSubscriptionError,
    },
  ] = useMutation(CANCEL_BUSINESS_PACKAGE);

  const [
    updateBusnessPackage,
    {
      loading: updatePackageLoading,
      data: updatePackageData,
      error: updatePackageError,
    },
  ] = useMutation(upgradeBusinessPackage);

  useEffect(() => {
    if (cancelSubscriptionLoading) {
      setLoading(true);
    }
    if (
      cancelSubscriptionData &&
      cancelSubscriptionData.cancleBusinessPackage
    ) {
      if (cancelSubscriptionData.cancleBusinessPackage.success === false)
        setErrorMsg(cancelSubscriptionData.cancleBusinessPackage.message);
    }
    if (cancelSubscriptionError) {
      profileError(cancelSubscriptionError);
    }
  }, [
    cancelSubscriptionLoading,
    cancelSubscriptionData,
    cancelSubscriptionError,
  ]);

  useEffect(() => {
    if (unPauseSubscriptionLoading) {
      setLoading(true);
    }
    if (
      unPauseSubscriptionData &&
      unPauseSubscriptionData.unPauseBusinessPackage
    ) {
      if (unPauseSubscriptionData.unPauseBusinessPackage.success === true) {
        setSubscriptionStatus(false);
        profileSuccess(
          pauseSubscriptionData.pauseBusinessPackage,
          props.history
        );
      } else {
        setErrorMsg(unPauseSubscriptionData.unPauseBusinessPackage.message);
      }
    }
    if (unPauseSubscriptionError) {
      //profileError(cancelSubscriptionError, props.history)
    }
  }, [
    unPauseSubscriptionLoading,
    unPauseSubscriptionData,
    unPauseSubscriptionError,
  ]);

  useEffect(() => {
    if (pauseSubscriptionLoading) {
      setLoading(true);
    }
    if (pauseSubscriptionData && pauseSubscriptionData.pauseBusinessPackage) {
      if (pauseSubscriptionData.pauseBusinessPackage.success === true) {
        setSubscriptionStatus(true);
        profileSuccess(
          pauseSubscriptionData.pauseBusinessPackage,
          props.history
        );
      } else {
        setErrorMsg(pauseSubscriptionData.pauseBusinessPackage.message);
      }
    }
    if (pauseSubscriptionError) {
      profileError(cancelSubscriptionError, props.history);
    }
  }, [pauseSubscriptionLoading, pauseSubscriptionData, pauseSubscriptionError]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setuserProfileImage(obj.userProfileImage);
        setname(obj.firstName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setuserProfileImage(obj.userProfileImage);
        setname(obj.firstName);
        setUserProfileData(obj);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        props.resetProfileFlag();
      }, 3000);
    }
  }, [props.success, props]);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }

  function tog_scroll() {
    setmodal_scroll(!modal_scroll);
    removeBodyCss();
  }
  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
    }
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  useEffect(() => {
    if (getUserData && getUserData.getUser) {
      setUserDetails(getUserData.getUser.result);
      if (getUserData.getUser.result) {
        fetchPackageDetail({
          variables: {
            packageId: Number(getUserData.getUser.result.packageID),
            status: true,
          },
        });
        fetchMstCompany({
          variables: {
            id: Number(getUserData.getUser.result.companyId),
          },
        })
      }
    }
  }, [getUserData, fetchPackageDetail]);

  useEffect(() => {
    if (fetchMstCompanyData && fetchMstCompanyData.mstCompany) {
      setMstCompanyData(
        fetchMstCompanyData.mstCompany
      );
      if(fetchMstCompanyData.mstCompany.companyStatus.statusName !== 'Paused'){
        setSubscriptionStatus(false);
      }
      
    }
  }, [fetchMstCompanyData]);

  useEffect(() => {
    if (packageDetailData && packageDetailData.getMstPackageList) {
      setPackageDetailData(packageDetailData.getMstPackageList.result);
    }
  }, [packageDetailData]);

  useEffect(() => {
    if (packageListData && packageListData.getMstPackageList) {
      setPackageList(packageListData.getMstPackageList.result);
    }
  }, [packageListData]);

  const updatePackageByUser = (packageId) => {
    updateBusnessPackage({
      variables: {
        userDto: {
          packageID: Number(packageId),
          domainUrl: "0",
          discount: 5,
        },
      },
    });
  };

  useEffect(() => {
    if (updatePackageLoading) {
      setLoading(true);
    }
    if (updatePackageData && updatePackageData.upgradeBusinessPackage) {
      if (updatePackageData.upgradeBusinessPackage.success === true) {
        window.location.assign(updatePackageData.upgradeBusinessPackage.result.paymentUrl);
      }
    }
    if (updatePackageError) {
      // profileError(cancelSubscriptionError, props.history);
    }
  }, [updatePackageError, updatePackageData, updatePackageLoading]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="WeDoc" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {errorMsg !== null && <Alert color="danger">{errorMsg}</Alert>}
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <Media className="d-flex">
                    <div className="ms-3">
                      <img
                        src={
                          userProfileData.userProfileImage === null
                            ? avatar
                            : PRODUCT_IMAGE_URL+userProfileData.userProfileImage
                        }
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <Media body className="flex-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{mobile}</p>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </Media>

                    <Col xl={4} md={6}>
                      <div className="mx-5 my-4">
                        <h5>
                          {packageData.length > 0
                            ? packageData[0].packageName
                            : "Free Plan"}
                        </h5>
                      </div>
                      {userDetails &&
                        userDetails.packageID !== null &&
                        userDetails.packageID > 1 &&
                        mainBusinessUser === true && (
                          <div className="mx-5 my-4">
                            <button
                              type="button"
                              className="btn btn-warning upgrade-4 waves-effect waves-light"
                              onClick={() => {
                                tog_scroll();
                              }}
                              data-toggle="modal"
                            >
                              Upgrade
                            </button>
                          </div>
                        )}
                      <Modal
                        size="xl"
                        isOpen={modal_scroll}
                        toggle={() => {
                          tog_scroll();
                        }}
                        scrollable={true}
                      >
                        <div className="modal-header services" id="services">
                          {/* <h5 className="modal-title mt-0">
                            Select Subscription Plan
                          </h5> */}
                          <h2>SELECT SUBSCRIPTION PLAN</h2>
                          <button
                            type="button"
                            onClick={() => setmodal_scroll(false)}
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        {/* <h5 className="bg-soft-dark mx-3">
                          1 MONTH&#160; &#124;
                        </h5>
                        <h5 className="bg-danger mx-3">
                          3 MONTHS (5% OFF)&#160; &#124;
                        </h5>
                        <h5 className="bg-soft-dark mx-3">
                          6 MONTHS (10% OFF)&#160; &#124;
                        </h5>
                        <h5 className="bg-danger mx-3">
                          9 MONTHS (15% OFF)&#160; &#124;
                        </h5> */}
                        <Row>
                          <Col>
                            <div className="table-respons">
                              <Table className="tabled mb-0">
                                <thead>
                                  <tr>
                                    <th className="month-1">1 MONTH</th>
                                    <th className="month-3">3 MONTH (5%OFF)</th>
                                    <th className="month-6">
                                      6 MONTH (10%OFF)
                                    </th>
                                    <th className="month-9">
                                      9 MONTH (15%OFF)
                                    </th>
                                  </tr>
                                </thead>
                              </Table>
                            </div>
                          </Col>
                        </Row>
                        <div className="modal-body bid_nim">
                          {packageList &&
                            packageList.map((item, index) => (
                              <Row key={index + item.packageName}>
                                <Col>
                                  <Card className="wrapper_22">
                                    <div className="services__wrapper">
                                      <div className="services__card">
                                        <div className="corporate">
                                          {item.packageName}
                                        </div>
                                        <div className="income">
                                          <p className="income-1">
                                            R {item.fifteenOFF}.00
                                          </p>
                                          <p>
                                            <h3 className="text-light">
                                              R{item.fifteenDiscount}.00
                                            </h3>
                                          </p>
                                          <p className="p3">PER MONTH</p>
                                        </div>
                                        <div className="service-feature">
                                          <p>2 HRS TIME DELAY</p>
                                          <p>UNLIMITED USERS</p>
                                          <p>UNLIMITED CATEGORY</p>
                                          <p>300 REQUESTS</p>
                                          <p>50 SPECIAL</p>
                                          <p>50 E-FLYERS</p>
                                          <p>UNLIMITED SALESLEAD</p>
                                          <p>100 KEYWORDS</p>
                                          <p>CRM</p>
                                          <p>PAYFAST INTEGRATION</p>
                                        </div>
                                        <div className="services__btn">
                                          <button>
                                            {" "}
                                            <Link
                                              to="#"
                                              onClick={() =>
                                                updatePackageByUser(
                                                  item.packageID
                                                )
                                              }
                                              // className="services__btn"
                                            >
                                              Subscribe
                                            </Link>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                </Col>
                                <Col>
                                  <Card></Card>
                                </Col>
                              </Row>
                            ))}
                        </div>
                      </Modal>
                    </Col>
                    {mainBusinessUser === true &&
                      userDetails &&
                      userDetails.packageID < 4 && (
                        <div className="text-center mt-3 ms-auto">
                          {mstCompanyData && mstCompanyData.companyStatus.statusName === 'Paused' ? (
                            <Button
                            onClick={() => unPauseSubscription()}
                            className="mx-2"
                            type="submit"
                            color="dark"
                          >
                            UnPause
                          </Button>
                            
                          ) : (
                            <Button
                              onClick={() => pauseSubscription()}
                              className="mx-2"
                              type="submit"
                              color="dark"
                            >
                              Pause
                            </Button>
                          )}

                          <Button
                            onClick={() => cancelSubscription()}
                            type="submit"
                            color="danger"
                          >
                            Cancel Subscription
                          </Button>
                        </div>
                      )}
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Personal Information</h4>
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "5",
                        })}
                        onClick={() => {
                          toggleCustomJustified("5");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-home"></i>
                        </span>
                        <span className="d-none d-sm-block">General</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "6",
                        })}
                        onClick={() => {
                          toggleCustomJustified("6");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-user"></i>
                        </span>
                        <span className="d-none d-sm-block">PHOTO</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "7",
                        })}
                        onClick={() => {
                          toggleCustomJustified("7");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-envelope"></i>
                        </span>
                        <span className="d-none d-sm-block">VERIFICATION</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "8",
                        })}
                        onClick={() => {
                          toggleCustomJustified("8");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">SECURITY</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTabJustify}>
                    <TabPane tabId="5" className="p-3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                  handleValidSubmit(e, v);
                                }}
                              >
                                <div className="form-group">
                                  <AvField
                                    name="firstname"
                                    label="First Name"
                                    value={userProfileData.firstName}
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    type="text"
                                    required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>
                                <div className="form-group mt-4">
                                  <AvField
                                    name="email"
                                    label="Email"
                                    value={userProfileData.email}
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    type="email"
                                    required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    name="mobile"
                                    label="Mobile"
                                    type="tel"
                                    error={isError}
                                    value={mobile}
                                    className="form-control"
                                    placeholder="Enter Mobile Number"
                                    onChange={(e) => {
                                      setmobile(e.target.value);
                                      if (e.target.value.length > 10) {
                                        setIsError(true);
                                      }
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          +27
                                        </InputAdornment>
                                      ),
                                    }}
                                    required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    name="birthDate"
                                    type="date"
                                    label="Birth Date"
                                    class="form-control"
                                    placeholder="Enter Your Birthdate"
                                    // value={this.state.birthDate}
                                    //        onChange={this.handleChange}

                                    required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4 radio-buttons">
                                  Male
                                  <input
                                    id="male"
                                    value="male"
                                    name="gender"
                                    type="radio"
                                    checked={
                                      userProfileData.vGender === "Female"
                                        ? false
                                        : true
                                    }
                                    //onChange={this.handleChange}
                                  />
                                  &nbsp;&nbsp;&nbsp; Female
                                  <input
                                    id="female"
                                    value="female"
                                    name="gender"
                                    type="radio"
                                    checked={
                                      userProfileData.vGender === "Female"
                                        ? true
                                        : false
                                    }
                                    //onChange={this.handleChange}
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    name="Street Address"
                                    label="Street Address"
                                    value={userProfileData.streetAddress}
                                    class="form-control"
                                    placeholder="Street Address"
                                    type="text"
                                    // required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    name="City"
                                    label="City"
                                    value={userProfileData.cityName}
                                    class="form-control"
                                    placeholder="City"
                                    type="text"
                                    // required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    name="Province"
                                    label="Province"
                                    value={userProfileData.provinceName}
                                    class="form-control"
                                    placeholder="Province"
                                    type="text"
                                    // required
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    type="text"
                                    name="Suburb"
                                    label="Suburb"
                                    class="form-control"
                                    value={userProfileData.suburbName}
                                    placeholder="Suburb"
                                    type="text"
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="form-group mt-4">
                                  <AvField
                                    type="text"
                                    name="Zip Code"
                                    label="Zip Code"
                                    class="form-control"
                                    value={userProfileData.zipCode}
                                    placeholder="Zip Code"
                                    type="text"
                                  />
                                  <AvField
                                    name="idx"
                                    value={idx}
                                    type="hidden"
                                  />
                                </div>

                                <div className="text-center mt-4">
                                  <Button type="submit" color="danger">
                                    Update Profile
                                  </Button>
                                </div>
                              </AvForm>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="6" className="p-3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <AvForm className="needs-validation">
                                <h4>
                                  <i className="uil-bag-alt"></i>Upload Profile
                                  Picture
                                </h4>
                                <hr />

                                <Row>
                                  <Col md="4">
                                    <div>
                                      <img
                                        src={
                                          userProfileData.userProfileImage ===
                                          null
                                            ? avatar
                                            : userProfileData.userProfileImageavatar
                                        }
                                        alt=""
                                        className="avatar-md  img-thumbnail"
                                      />
                                    </div>
                                  </Col>
                                  <Col md="8">
                                    <FormGroup className="mb-3">
                                      <Label>Change Profile Image</Label>
                                      <div className="col-md-10">
                                        <input
                                          className="form-control"
                                          type="file"
                                        />
                                      </div>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </AvForm>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="8" className="p-3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                  handleValidSubmit(e, v);
                                }}
                              >
                                <div className="form-group">
                                  <AvField
                                    name="2016"
                                    label="Enter Security Pin"
                                    value=""
                                    className="form-control"
                                    placeholder="2016"
                                    type="text"
                                    required
                                  />
                                  <AvField
                                    name="2016"
                                    value="2016"
                                    type="hidden"
                                  />
                                </div>

                                <div className="text-center mt-4">
                                  <Button type="submit" color="danger">
                                    Save
                                  </Button>
                                </div>
                              </AvForm>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="7" className="p-3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <div className="div_1">
                                <h4> Verify Mobile and Email</h4>
                                <div className="container__127">
                                  <div className="cont__1 info">
                                    <span className="spam_1 info">
                                      MOBILE VERIFICATION
                                    </span>
                                  </div>

                                  <div className="div_content">
                                    You have already Verified your Mobile Number
                                  </div>
                                </div>
                                <div className="container__127">
                                  <div className="cont__1">
                                    <span className="spam_1">
                                      EMAIL VERIFICATION
                                    </span>
                                  </div>

                                  <div className="div_content">
                                    You have already Verified your EMAIL
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
);
