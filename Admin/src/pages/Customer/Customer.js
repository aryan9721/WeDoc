import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { mstCrmCustomers, REGISTER_USER } from "../../services/graphql";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";
import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { apiError } from "../../store/actions";

const Customer = (props) => {
  const { history } = props;
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const [loading, setLoading] = useState(false);

  const [customerList, setCustomerList] = useState([]);

  const [
    getCustomerList,
    { loading: getCustomerListLoading, data: getCustomerListData },
  ] = useLazyQuery(mstCrmCustomers);
  const [
    onRegisterUser,
    { loading: createLoading, data: createdUserData, error: createUserError },
  ] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (getCustomerListData && getCustomerListData.mstCrmCustomers) {
      console.log(getCustomerListData.mstCrmCustomers.data);
      setCustomerList(getCustomerListData.mstCrmCustomers.data || []);
    }
  }, [getCustomerListData]);
  const registerUserSuccessful = (data) => {
    if (data.success === true) {
      props.registerUser(data.result, props.history);
    } else {
      props.apiError(createdUserData.registerUser.message, props.history);
    }
  };

  useEffect(() => {
    if (createLoading) {
      setLoading(true);
    }
    if (createdUserData && createdUserData.registerUser) {
      registerUserSuccessful(createdUserData.registerUser);
    }
    if (createUserError) {
      apiError(createUserError, props.history);
    }
  }, [createLoading, createdUserData, createUserError]);
  // handleValidSubmit

  useEffect(() => {
    getCustomerList({
      variables: {
        page: 1,
        size: 10,
      },
    });
  }, [getCustomerList]);

  const [customerData, setCustomerData] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.firstName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.firstName);
        setUserProfileData(obj);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        props.resetProfileFlag();
      }, 3000);
    }
    
    if (localStorage.getItem("addCustomerData")){
      const obj = JSON.parse(localStorage.getItem("addCustomerData"));
      setCustomerData(obj) 
    }

    if (localStorage.getItem("editCustomerData")){
      const obj = JSON.parse(localStorage.getItem("editCustomerData"));
      setCustomerData(obj) 
    }

  }, [props.success, props]);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }
  const rowData = [
    {
      Edit: (
        <Link to="/editcustomer">
          <i className="uil-edit"></i>
        </Link>
      ),
      View: (
        <Link to="/viewcustomer">
          <i className="uil-eye"></i>
        </Link>
      ),
      customer: "Jitendra Bhargava",
      contact: "766662478",
      email: "	jitendra@ajwebs.com",
      user: "	false",
    },
    {
      Edit: (
        <Link to="/editcustomer">
          <i className="uil-edit"></i>
        </Link>
      ),
      View: (
        <Link to="/viewcustomer">
          <i className="uil-eye"></i>
        </Link>
      ),
      customer: "Paul Peter",
      contact: "074123458",
      email: "	paul@soci.com",
      user: "false",
    },
    {
      Edit: (
        <Link to="/editcustomer">
          <i className="uil-edit"></i>
        </Link>
      ),
      View: (
        <Link to="/viewcustomer">
          <i className="uil-eye"></i>
        </Link>
      ),
      customer: "Junior Technical Author",
      contact: "San Francisco",
      email: "66",
      user: "$86",
    },
    {
      Edit: (
        <Link to="/editcustomer">
          <i className="uil-edit"></i>
        </Link>
      ),
      View: (
        <Link to="/viewcustomer">
          <i className="uil-eye"></i>
        </Link>
      ),
      customer: "Senior Javascript Developer",
      contact: "Edinburgh",
      email: "22",
      user: "$433",
    },
  ];
  const makeDataCustomerList = (customerList) => {
    let finalList = [];
    customerList.forEach((datum) => {
      if (datum.title !== null) {
        finalList.push({
          Edit: (
            <Link to={{
              pathname: '/editcustomer',
              search: '',
              state: { customerID: datum.userId}
            }}>
              <i className="uil-edit"></i>
            </Link>
          ),
          View: (
            <Link to="/viewcustomer">
              <i className="uil-eye"></i>
            </Link>
          ),

          customer: datum.firstName + " " + datum.lastName,
          contact: datum.contactNo,
          email: datum.email,
          user: datum.companyName,
        });
      }
    });
    return _.uniqBy(finalList, "email");
  };

  let CustomCustomerList =
    customerList.length === 0 ? rowData : makeDataCustomerList(customerList);

  const data = {
    columns: [
      {
        label: "Edit",
        field: "Edit",
        sort: "asc",
        width: 150,
      },
      {
        label: "View",
        field: "View",
        sort: "asc",
        width: 150,
      },
      {
        label: "Customer Name",
        field: "customer",
        sort: "asc",
        width: 270,
      },
      {
        label: "Contact Number",
        field: "contact",
        sort: "asc",
        width: 200,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "Is Ezyfind User",
        field: "user",
        sort: "asc",
        width: 100,
      },
    ],
    rows: CustomCustomerList,
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="EzyFind" breadcrumbItem="Home > CRM > Customer" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <Media className="d-flex">
                    <Media body className="flex-1 align-self-center">
                      <div className="text-muted">
                        <h5>Manage Customer</h5>
                        {/* <p className="mb-1">{mobile}</p>
                        <p className="mb-1">{email}</p> */}
                      </div>
                    </Media>
                    <div>
                      <Link to="/addcustomer" className="btn btn-danger mx-5">
                        <i className="uil-plus"></i>
                        Add New Customers
                      </Link>
                    </div>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">CUSTOMER LIST</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v);
                }}
              >
                {/* <div className="form-group mt-4">
                  <AvField
                    name="email"
                    label="Email"
                    value={userProfileData.email}
                    className="form-control"
                    placeholder="Enter Your Email"
                    type="email"
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div> */}

                {/* <div className="form-group mt-4">
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
                        <InputAdornment position="start">+27</InputAdornment>
                      ),
                    }}
                    required
                  />
                  <AvField name="idx" value={idx} type="hidden" />
                </div> */}
              </AvForm>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

Customer.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(Customer)
);
