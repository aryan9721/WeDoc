import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardSubtitle,
  Label,
  Input,
  Container,
} from "reactstrap";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img5 from "../../assets/images/small/img-5.jpg";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { 
  updateMstCrmCustomer, 
  mstCrmCustomer,
  getProvince,
  getCity,
  getSuburb, 
} from "../../services/graphql";
import { useToasts } from 'react-toast-notifications';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditCustomer = (props) => {
  let { customerID } = props.location.state || {};
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [selectedGroup, setselectedGroup] = useState(null);
  const { addToast } = useToasts();
  const [companyId, setCompanyId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gender, setGender] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [suburbId, setSuburbId] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [storageData, setStorageData] = useState({});



  const [
    fetchEditCustomerData,
    { loading: editCustomerLoading, data: editCustomerData },
  ] = useMutation(updateMstCrmCustomer);

  const [
    fetchCustomerData,
    { loading: customerLoading, data: customerData },
  ] = useLazyQuery(mstCrmCustomer);
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
    fetchCustomerData({
      variables:{
        id: Number(customerID),
      }
    });
  }, []);

  useEffect(() => {
    if (customerData && customerData.mstCrmCustomer) {
       setCompanyId(customerData.mstCrmCustomer.companyId)
       setFirstName(customerData.mstCrmCustomer.firstName)
       setLastName(customerData.mstCrmCustomer.lastName)
       setEmail(customerData.mstCrmCustomer.email)
       setCompanyName(customerData.mstCrmCustomer.companyName)
       setGender(customerData.mstCrmCustomer.gender)
       setContactNo(customerData.mstCrmCustomer.contactNo)
       setStreetAddress(customerData.mstCrmCustomer.streetAddress)
       setProvinceId(customerData.mstCrmCustomer.provinceId)
       setCityId(customerData.mstCrmCustomer.cityId)
       setSuburbId(customerData.mstCrmCustomer.suburbId)
       setZipCode(customerData.mstCrmCustomer.zipCode)
    }
  }, [customerData]);

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


  function handleUpdate(e) {
    if(companyName === "" )
    {
      addToast('Company Name not empty', { appearance: 'error', autoDismiss: true});
      return;
    }
  
    if(firstName === "" )
    {
      addToast('First Name not empty', { appearance: 'error', autoDismiss: true});
      return;
    }
    if(email === null )
    {
      addToast('email not selected', { appearance: 'error', autoDismiss: true});
      return;
    }
    
    if(contactNo === null )
    {
      addToast('contactNo not selected', { appearance: 'error', autoDismiss: true});
      return;
    }
    if(suburbId === null )
    {
      addToast('suburb not selected', { appearance: 'error', autoDismiss: true});
      return;
    }
    fetchEditCustomerData({
      variables:{
      companyId: Number(companyId),
      firstName: firstName,
      customerId: Number(2),
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
      }
    });

  }

  //for change tooltip display propery
  const onChangeValidation = (fieldName, value) => {
    const modifiedV = { ...validation };
    if (value !== "") {
      modifiedV[fieldName] = true;
    } else {
      modifiedV[fieldName] = false;
    }
    setValidation(modifiedV);
  };

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
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
          <Breadcrumbs title="Forms" breadcrumbItem="Edit Customer" />
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
                        <Select
                          value={companyId}
                          onChange={(e) => setCompanyId(e.target.value)}
                          // options={optionGroup1}
                          // classNamePrefix="select2-selection"
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
                        <div className="mb-3">
                          <AvField
                            name="company name"
                            label="Company"
                            placeholder="Enter Company"
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            errorMessage="Enter Company name"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <div className="mb-3">
                          <Label>Gender</Label>
                          <Select
                            value={genderOption.filter(function(option) {
                              return option.value === gender;
                            })}
                            onChange={(e) => setGender(e.value)}
                            options={genderOption}
                            classNamePrefix="select2-selection"
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="my-5">
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
                             value={options.filter(function(option) {
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
                            value={cityOption.filter(function(option) {
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
                             value={SuburbOption.filter(function(option) {
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
                    <Button color="primary" type="submit"
                    disabled={editCustomerLoading}
                     onClick={() => handleUpdate()}>
                      <i className="uil-check-circle"></i>Update
                    </Button>
                  </AvForm>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>
                    <i className="uil-plus-circle"></i>Follow up & Comment
                  </h4>
                  <hr />
                  <Row>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img2}
                              alt="Card image cap"
                            />
                          </Col>
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>Added Customer on 06-Jan-2016</CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Quote # has been created on 06-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img3}
                              alt="Card image cap"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img2}
                              alt="Card image cap"
                            />
                          </Col>
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Invoice #INVOICE - 00021 has been created on
                                06-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col lg={6}>
                      <Card>
                        <Row className="g-0 align-items-center">
                          <Col md={8}>
                            <CardBody>
                              <CardTitle className="h5">Krivahn Doss</CardTitle>
                              <CardText>
                                Quote #QUOTE - 00023 has been created on
                                14-Jan-2016
                              </CardText>
                              <CardText>
                                <small className="text-muted">
                                  Last updated 6 years ago
                                </small>
                              </CardText>
                            </CardBody>
                          </Col>
                          <Col md={4}>
                            <CardImg
                              className="img-fluid"
                              src={img3}
                              alt="Card image cap"
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>
                    <i className="uil-comment-dots"></i>Leave A Comment
                  </h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Write comment here..."
                        />
                      </div>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit">
                    submit
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EditCustomer;
