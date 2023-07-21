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
import { AvForm, AvField } from "availity-reactstrap-validation";
import Select from "react-select";
import {
  updateMstCrmInventory,
  mstCrmInventorys,
} from "../../services/graphql";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";

//Import Breadcrumb

const EditInventory = (props) => {
  let { inventoryID } = props.location.state || {};
  console.log(props, inventoryID);
  const [validation, setValidation] = useState({
    fnm: null,
    lnm: null,
    unm: null,
    city: null,
    stateV: null,
  });
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [createdDate, setCreatedDate] = useState("");

  const [selectedGroup, setselectedGroup] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [officeDescription, setOfficeDescription] = useState("");
  const [inventoryTypeId, setInventoryTypeId] = useState("");
  const [storageData, setStorageData] = useState({});

  const { addToast } = useToasts();

  const [
    fetchEditInventoryData,
    { loading: editInventoryLoading, data: editInventoryData },
  ] = useMutation(updateMstCrmInventory);

  const [
    fetchInventoryData,
    { loading: InventoryLoading, data: InventoryData },
  ] = useLazyQuery(mstCrmInventorys);
  const optionGroup1 = [
    {
      label: "Select Customer",
      options: [
        { label: "External Customer", value: "External Customer" },
        { label: "Internal Customer", value: "Internal Customer" },
      ],
    },
  ];
  const optionInventoryType = [
    {
      label: "Select Inventory",
      options: [
        { label: "Product", value: "Product" },
        { label: "Service", value: "Service" },
      ],
    },
  ];

  useEffect(() => {
    if (InventoryData && InventoryData.mstCrmInventorys) {
      setCompanyId(InventoryData.mstCrmInventorys.companyId);
      setInventoryName(InventoryData.mstCrmInventorys.inventoryName);
      setInventoryId(InventoryData.mstCrmInventorys.inventoryId);
      setInventoryDescription(
        InventoryData.mstCrmInventorys.inventoryDescription
      );
      setOfficeDescription(InventoryData.mstCrmInventorys.officeDescription);
      setInventoryTypeId(InventoryData.mstCrmInventorys.inventoryTypeId);
      setQuantity(InventoryData.mstCrmInventorys.quantity);
      setCreatedDate(InventoryData.mstCrmInventorys.createdDate);
    }
  }, [InventoryData]);

  function handleUpdate(e) {
    if (inventoryName === "") {
      addToast("Inventory Name not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (inventoryId === "") {
      addToast("inventoryId not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    fetchEditInventoryData({
      variables: {
        companyId: Number(companyId),
        inventoryName: inventoryName,
        inventoryId: Number(2),
        inventoryDescription: inventoryDescription,
        officeDescription: officeDescription,
        inventoryTypeId: Number(inventoryTypeId),
        quantity: Number(quantity),
        createdDate: createdDate,
      },
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

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    settextcount(event.target.value.length);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Edit Inventory" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>Edit Inventory - BMW 1 Series</h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Inventory Name</Label>

                        <Select
                          value={optionGroup1.filter(function (option) {
                            return option.value === inventoryName;
                          })}
                          onChange={(e) => setInventoryName(e.value)}
                          options={optionGroup1}
                          classNamePrefix="select2-selection"
                        />
                      </div>
                    </Col>
                  </Row>

                  <AvForm className="needs-validation">
                    <Row>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom01">Quantity</Label>
                          <input
                            className="form-control"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            defaultValue="1"
                            id="example-number-input"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Unit Type</Label>
                          <AvField
                            name="Unit Type"
                            placeholder="Unit Type..."
                            type="text"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                            errorMessage="Enter Unit Type"
                            className="form-control"
                            validate={{ required: { value: true } }}
                            id="validationCustom02"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">
                            Inventory Type
                          </Label>
                          <Select
                            value={optionInventoryType.filter(function (
                              option
                            ) {
                              return option.value === inventoryTypeId;
                            })}
                            onChange={(e) => setInventoryName(e.value)}
                            options={optionInventoryType}
                            classNamePrefix="select2-selection"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <div className="mt-3">
                          <Label>Inventory Description</Label>
                          <Input
                            type="textarea"
                            id="textarea"
                            value={inventoryDescription}
                            onChange={(e) =>
                              setInventoryDescription(e.target.value)
                            }
                            maxLength="225"
                            rows="4"
                            placeholder="Description..."
                          />
                          {textareabadge ? (
                            <span className="badgecount badge badge-success">
                              {" "}
                              {textcount} / 225{" "}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mt-3">
                          <Label>Additional Comments (Office Use)</Label>
                          <Input
                            type="textarea"
                            id="textarea"
                            value={officeDescription}
                            onChange={(e) =>
                              setOfficeDescription(e.target.value)
                            }
                            maxLength="225"
                            rows="4"
                            placeholder="Comment..."
                          />
                          {textareabadge ? (
                            <span className="badgecount badge badge-success">
                              {" "}
                              {textcount} / 225{" "}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <hr />
                    <Button
                      color="primary"
                      type="submit"
                      disabled={editInventoryLoading}
                      onClick={() => handleUpdate()}
                    >
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

export default EditInventory;
