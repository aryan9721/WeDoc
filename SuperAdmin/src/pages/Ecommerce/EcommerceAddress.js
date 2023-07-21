import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Form,
  Container,
  Label,
  Input,
  FormGroup,
  Button,
  Spinner,
} from "reactstrap";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { getUserAddress, getUser, purchaseShoppingCartAsync } from "../../services/graphql";
import InputAdornment from "@material-ui/core/InputAdornment";


//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EcommerceAddress = (props) => {
  const [userProfileData, setUserProfileData] = useState({});
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [idx, setidx] = useState(1);
  const [isError, setIsError] = useState(false);
  //   const [addressList, setAddressList] = useState([]);
  // const [
  //   fetchAddressList,
  //   { loading: AddressLoading, result: addressListData },
  // ] = useLazyQuery(getUserAddress);

  // useEffect(() => {
  //   fetchAddressList({
  //     variables: {
  //       key: 2,
  //       keyType: 1,
  //       page: 1,
  //       size: 10,
  //     },
  //   });
  // }, [fetchAddressList]);


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
      
    }
  }, [props.success, props]);

  

  const [shopProduct, { data: shopProductData }] = useLazyQuery(
    purchaseShoppingCartAsync
  );

  useEffect(() => {
    if (shopProductData && shopProductData.purchaseShoppingCartAsync) {
     
     window.location.assign(shopProductData.purchaseShoppingCartAsync.result.paymentUrl)
     
    } 
  }, [shopProductData]);

  const PurchaseProduct = () => {
    shopProduct({
   variables:{
    id: 6,
   }
    })
  }
  function handleValidSubmit(event, values) {
    props.editProfile(values);
    PurchaseProduct();
  }

  // useEffect(() => {
  //   if (
  //     addressListData &&
  //     addressListData.getUserAddress
  //   ) {
  //     setAddressList(
  //       addressListData.getUserAddress.result
  //     );
  //   }
  // }, [addressListData]);

  // const rowData = [
  //   {
  //       userAddressID: "	BMW 1 Series",
  //       userID: "Product",
  //       streetAddress: "100 Vehicle",
  //       countryID: "21",
  //       provinceID: "23",
  //       cityID: "24",
  //       suburbID: "22",
  //       zipCode: "26",
  //       longitude: "27",
  //       latitude: "28",
  //     status: "	Active",
  //   },
  // ];

  // let finalList = [];
  // const makeDataAddressList = (AddressListList) => {
  //   AddressListList.forEach((datum) => {
  //     finalList.push({
  //       userAddressID: datum.userAddressID,
  //       userID: datum.userID,
  //       streetAddress: datum.streetAddress,
  //       countryID: datum.countryID,
  //       provinceID: datum.provinceID,
  //       cityID: datum.cityID,
  //       suburbID: datum.suburbID,
  //       zipCode: datum.zipCode,
  //       longitude: datum.longitude,
  //       latitude: datum.latitude,
  //       status: datum.isActive === true ? "Active" : "InActive",
  //     });
  //   });
  //   return finalList;
  // };

  // let AddressList =
  //   addressList.length === 0
  //     ? rowData
  //     : makeDataAddressList(addressList);

  // const result = {
  //   rows: AddressList,
  // };


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Address Details"
            breadcrumbItem="Address Details"
          />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">CONTACT DETAILS</CardTitle>
                  {/* {isEmpty(addressList) &&
                      AddressLoading && (
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={12}>
                                  <CardBody>
                                    <Spinner className="m-1" color="primary" />
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      )} */}

                    {/* {!isEmpty(addressList) &&
                      addressList.map((result, key) => ( */}

                  <Row>
                    <Col lg={12}>
                      <div className="mt-4">
                        <Form 
                        onValidSubmit={(e, v) => {
                          handleValidSubmit(e, v);
                        }}>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="formrow-firstname-input"
                            >
                              Name
                            </Label>
                            <Input
                              type="text"

                              className="form-control"
                              value={userProfileData.firstName}
                              id="formrow-firstname-input"
                            />
                          </div>

                          <Row>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="formrow-email-input"
                                >
                                  Email
                                </Label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  value={userProfileData.email}
                                  id="formrow-email-input"
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="formrow-password-input"
                                >
                                  Mobile
                                </Label>
                                <Input
                                name="mobile"
                                  className="form-control"
                                  type="tel"
                                  error={isError}
                                  value={mobile}
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
                                
                              </div>
                            </Col>
                          </Row>
                          <Row className="my-4">
                            <Col>
                              <h5>ADDRESS DETAILS</h5>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Label
                              htmlFor="example-text-input"
                              className="form-label"
                            >
                              Street&#x2a;
                            </Label>
                            <div className="col-md-12">
                              <input
                                className="form-control"
                                type="text"
                                value={userProfileData.streetAddress}
                                defaultValue="Address (House No, Building, Street, Area &#x2a;)"
                              />
                            </div>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom03">
                                  City&#x2a;
                                </Label>
                                <Input
                                  name="city"
                                  placeholder="City"
                                  type="text"
                                  value={userProfileData.cityName}
                                  errorMessage=" Please provide a valid city."
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom03"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom04">
                                  Province&#x2a;
                                </Label>
                                <Input
                                  name="Province"
                                  placeholder="Province"
                                  type="text"
                                  value={userProfileData.provinceName}
                                  errorMessage="Please provide a valid state."
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom04"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom04">
                                  Suburb&#x2a;
                                </Label>
                                <Input
                                  name="Suburb"
                                  placeholder="Suburb"
                                  type="text"
                                  value={userProfileData.suburbName}
                                  errorMessage="Please provide a valid state."
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom04"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup className="mb-3">
                                <Label htmlFor="validationCustom05">
                                  Zip&#x2a;
                                </Label>
                                <Input
                                  name="zip"
                                  placeholder="Zip Code"
                                  type="text"
                                  value={userProfileData.zipCode}
                                  errorMessage=" Please provide a valid zip."
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="validationCustom05"
                                />
                              </FormGroup>
                            </Col>
                          </Row>

                          <div className="mt-4">
                            <Button
                              type="button"
                              onClick={()=> PurchaseProduct()}
                              color="primary"
                              className="w-md"
                            >
                              Submit
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                      {/* ))} */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceAddress;
