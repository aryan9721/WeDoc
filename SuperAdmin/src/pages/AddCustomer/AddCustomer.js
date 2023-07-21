import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardTitle,
  CardSubtitle,
  Label,
  Input,
  Container,
} from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import {
  createMstCrmCustomer,
  getProvince,
  getCity,
  getSuburb,
} from "../../services/graphql";

const AddCustomer = () => {
  const [companyId, setCompanyId] = useState("");
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [textareabadge, settextareabadge] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [suburbId, setSuburbId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [textcount, settextcount] = useState(0);
  const { addToast } = useToasts();

  const [
    AddCustomerData,
    { loading: addCustomerDataLoading, data: addCustomerData },
  ] = useMutation(createMstCrmCustomer);

  useEffect(() => {
    if (addCustomerData && addCustomerData.createMstCrmCustomer) {
      if (addCustomerData.createMstCrmCustomer !== true) {
        addToast(addCustomerData.message, {
          appearance: "Customer Added Successfully",
          autoDismiss: true,
        });
        setEmail("");
        setFirstName("");
        setUserId(null);
        setCompanyId(null);
        setSuburbId(null);
        setProvinceId("");
        setCityId("");
        setContactNo("");
        setGender(null);

        window.location.reload();
      }
    }
  }, [addCustomerData]);

  const customerDataSubmit = () => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);
    if (companyName === "") {
      addToast("Company Name not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (userId === "") {
      addToast("userId not empty", { appearance: "error", autoDismiss: true });
      return;
    }
    if (firstName === "") {
      addToast("First Name not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (email === null) {
      addToast("email not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (contactNo === null) {
      addToast("contactNo not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (suburbId === null) {
      addToast("suburb not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    AddCustomerData({
      variables: {
        mstCrmCustomer: {
          companyId: Number(decodeJwt.companyId),

          customerId: 0,
          firstName: firstName,
          lastName: lastName,
          email: email,
          companyName: companyName,
          gender: gender,
          contactNo: contactNo,
          streetAddress: streetAddress,
          provinceId: Number(provinceId),
          cityId: Number(cityId),
          suburbId: Number(suburbId),
          zipCode: zipCode,
        },
      },
    });
  };

  const [provinceData, setProvinceData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [suburb, setSuburb] = useState([]);

  const [
    fetchProvinceData,
    { loading: ProvinceData, data: provinceDataResult },
  ] = useLazyQuery(getProvince);
  const [fetchCityData, { loading: cityListLoader, data: cityListData }] =
    useLazyQuery(getCity);
  const [FetchSuburb, { loading: getSuburbLoader, data: getSuburbData }] =
    useLazyQuery(getSuburb);

  useEffect(() => {
    fetchProvinceData();
    fetchCityData();
    FetchSuburb();
  }, [fetchProvinceData]);

  useEffect(() => {
    if (getSuburbData && getSuburbData.getSuburb) {
      setSuburb(getSuburbData.getSuburb.result);
    }
  }, [getSuburbData]);
  useEffect(() => {
    if (provinceDataResult && provinceDataResult.getProvince) {
      setProvinceData(provinceDataResult.getProvince.result);
    }
  }, [provinceDataResult]);

  useEffect(() => {
    if (cityListData && cityListData.getCity) {
      setCityList(cityListData.getCity.result);
    }
  }, [cityListData]);

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    setFirstName(event.target.value);
    settextcount(event.target.value.length);
  }

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const options = [];

  provinceData.forEach((item) => {
    options.push({ label: item.provinceName, value: item.provinceId });
  });
  const cityOption = [];
  cityList.forEach((item) => {
    cityOption.push({ label: item.cityName, value: item.cityId });
  });
  const SuburbOption = [];
  suburb.forEach((item) => {
    SuburbOption.push({ label: item.suburbName, value: item.suburbId });
  });
  const genderOption = [
    { label: "Male", value: 1 },
    { label: "Female", value: 0 },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Add New Customer" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>Map with WeDoc Users</h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>WeDoc Users</Label>
                        <Input
                          className="form-control"
                          name="WeDoc Users"
                          placeholder="WeDoc Users"
                          type="text"
                          value={userId}
                          required={true}
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>

                  <AvForm className="needs-validation">
                    <h4>Person Info</h4>
                    <hr />
                    <Row>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">First name</Label>
                          <AvField
                            name="firstname"
                            placeholder="First name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            errorMessage="Enter First Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom01"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Last name</Label>
                          <AvField
                            name="lastname"
                            placeholder="Last name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            errorMessage="Enter Last name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <AvField
                            name="email"
                            label="E-Mail"
                            placeholder="Enter Valid Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            errorMessage="Invalid Email"
                            validate={{
                              required: { value: true },
                              email: { value: true },
                            }}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Company</Label>
                          <AvField
                            name="company"
                            placeholder="Company"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            errorMessage="Enter Company Name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Gender</Label>
                          <Select
                            value={genderOption.filter(function (option) {
                              return option.value === gender;
                            })}
                            onChange={(e) => setGender(e.value)}
                            options={genderOption}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <label
                          htmlFor="example-tel-input"
                          className="col-md-2 col-form-label"
                        >
                          Mobile
                        </label>
                        <div className="col-md-10">
                          <input
                            className="form-control"
                            type="tel"
                            value={contactNo}
                            onChange={(e) => setContactNo(e.target.value)}
                            defaultValue="1-(555)-555-5555"
                          />
                        </div>
                      </Col>
                    </Row>
                    <h4>Address</h4>
                    <hr />
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label className="form-label">Street Address</label>
                          <input
                            className="form-control"
                            type="text"
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder="Enter Street Address"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Province</Label>
                          <Select
                            value={options.filter(function (option) {
                              return option.value === provinceId;
                            })}
                            onChange={(e) => setProvinceId(e.value)}
                            options={options}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>City</Label>
                          <Select
                            value={cityOption.filter(function (option) {
                              return option.value === cityId;
                            })}
                            onChange={(e) => setCityId(e.value)}
                            options={cityOption}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Suburb</Label>
                          <Select
                            value={SuburbOption.filter(function (option) {
                              return option.value === suburbId;
                            })}
                            onChange={(e) => setSuburbId(e.value)}
                            options={SuburbOption}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom05">Zip</Label>
                          <AvField
                            name="zip"
                            placeholder="Zip Code"
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            errorMessage=" Please provide a valid zip."
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom05"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr />
                    <Button
                      disabled={addCustomerDataLoading}
                      color="primary"
                      type="submit"
                      onClick={() => customerDataSubmit()}
                    >
                      <i className="bx bx-save"></i>Save
                    </Button>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddCustomer;
