import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Container, Row, Col, Card, Alert, CardBody, Media } from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";

// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { apiError } from "../../store/actions";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { mstCrmInventorys, REGISTER_USER } from "../../services/graphql";

const Inventory = (props) => {
  const [companyId, setCompanyId] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState(1);
  const [inventoryId, setInventoryId] = useState("");
  const [inventoryTypeId, setInventoryTypeId] = useState("");
  const [officeDescription, setOfficeDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [inventoryList, setInventoryList] = useState([]);

  const [
    getInventoryList,
    { loading: getInventoryListLoading, data: getInventoryListData },
  ] = useLazyQuery(mstCrmInventorys);
  const [
    onRegisterUser,
    { loading: createLoading, data: createdUserData, error: createUserError },
  ] = useMutation(REGISTER_USER);

  useEffect(() => {
    if (getInventoryListData && getInventoryListData.mstCrmInventorys) {
      console.log(getInventoryListData.mstCrmInventorys.data);
      setInventoryList(getInventoryListData.mstCrmInventorys.data || []);
    }
  }, [getInventoryListData]);
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

  useEffect(() => {
    getInventoryList({
      variables: {
        page: 1,
        size: 10,
      },
    });
  }, [getInventoryList]);

  const [inventoryData, setInventoryData] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setInventoryName(obj.inventoryName);
        setInventoryId(obj.inventoryId);
        setInventoryTypeId(obj.inventoryTypeId);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setInventoryName(obj.inventoryName);
        setUserProfileData(obj);
        setInventoryId(obj.inventoryId);
        setInventoryTypeId(obj.inventoryTypeId);
      }
      setTimeout(() => {
        props.resetProfileFlag();
      }, 3000);
    }

    if (localStorage.getItem("addInventoryData")) {
      const obj = JSON.parse(localStorage.getItem("addInventoryData"));
      setInventoryData(obj);
    }

    if (localStorage.getItem("editInventoryData")) {
      const obj = JSON.parse(localStorage.getItem("editInventoryData"));
      setInventoryData(obj);
    }
  }, [props.success, props]);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }

  const rowData = [
    {
      edit: (
        <Link to="/editinventory">
          <i className="uil-edit"></i>
        </Link>
      ),
      view: (
        <Link to="/viewinventory">
          <i className="uil-eye"></i>
        </Link>
      ),
      inventory: "	BMW 1 Series",
      type: "Product",
      quantity: "100 Vehicle",
      status: "	Active",
    },
  ];
  let finalList = [];
  const makeDataInventoryList = (InventoryListList) => {
    InventoryListList.forEach((datum) => {
      finalList.push({
        Edit: (
          <Link
            to={{
              pathname: "/editinventory",
              search: "",
              state: { inventoryID: datum.userId },
            }}
          >
            <i className="uil-edit"></i>
          </Link>
        ),
        view: (
          <Link to="/viewinventory">
            <i className="uil-eye"></i>
          </Link>
        ),
        inventoryName: datum.inventoryName,
        inventoryTypeId: datum.inventoryTypeId,
        quantity: datum.quantity,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return _.uniqBy(finalList, "inventoryName");
  };

  let CustomInventoryList =
    inventoryList.length === 0 ? rowData : makeDataInventoryList(inventoryList);

  const data = {
    columns: [
      {
        label: "edit",
        field: "edit",
        sort: "asc",
        width: 150,
      },
      {
        label: "view",
        field: "view",
        sort: "asc",
        width: 150,
      },
      {
        label: "Inventory Name",
        field: "inventory",
        sort: "asc",
        width: 270,
      },
      {
        label: "Type",
        field: "type",
        sort: "asc",
        width: 200,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
    ],
    rows: CustomInventoryList,
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="WeDoc" breadcrumbItem="Home > CRM > Inventory" />

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
                        <h5>Manage Inventory</h5>
                        {/* <p className="mb-1">{mobile}</p>
                        <p className="mb-1">{email}</p> */}
                      </div>
                    </Media>
                    <div>
                      <Link to="./addInventory" className="btn btn-danger mx-5">
                        <i className="uil-plus"></i>
                        Add New Inventory
                      </Link>
                    </div>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">INVENTORY LIST</h4>

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

Inventory.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(Inventory)
);
