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
import { createMstCrmInventory } from "../../services/graphql";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useToasts } from "react-toast-notifications";
import jwt from "jsonwebtoken";
const AddInventory = () => {
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [createdDate, setCreatedDate] = useState("");

  const [inventoryTypeId, setInventoryTypeId] = useState("");

  const [selectedGroup, setselectedGroup] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [officeDescription, setOfficeDescription] = useState("");
  const { addToast } = useToasts();

  const [
    AddInventoryData,
    { loading: addInventoryDataLoading, data: addInventoryData },
  ] = useMutation(createMstCrmInventory);

  useEffect(() => {
    if (addInventoryData && addInventoryData.createMstCrmInventory) {
      if (addInventoryData.createMstCrmInventory !== true) {
        addToast(addInventoryData.message, {
          appearance: "Inventory Added Successfully",
          autoDismiss: true,
        });
        setQuantity(null);
        setInventoryId(null);
        setCompanyId(null);
        setInventoryDescription("");
        setOfficeDescription("");
        setInventoryName("");
        setInventoryTypeId(null);
        setCreatedDate("");

        window.location.reload();
      }
    }
  }, [addInventoryData]);

  const inventoryDataSubmit = () => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);
    if (inventoryName === "") {
      addToast("Inventory Name not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (inventoryId === "") {
      addToast("Inventory Id not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (inventoryDescription === null) {
      addToast("email not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    if (officeDescription === null) {
      addToast("suburb not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    AddInventoryData({
      variables: {
        mstCrmInventory: {
          companyId: Number(decodeJwt.companyId),

          createdDate: "2016-01-06T22:41:30.717",
          inventoryDescription: inventoryDescription,
          inventoryId: Number(inventoryId),
          inventoryName: inventoryName,
          inventoryTypeId: Number(inventoryTypeId),
          isActive: true,
          modifiedBy: null,
          modifiedDate: null,
          officeDescription: officeDescription,
          quantity: Number(quantity),
        },
      },
    });
  };

  const optionInventoryType = [
    { label: "Product", value: 1 },
    { label: "Service", value: 0 },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Add New Inventory" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <h4>
                    <i className="uil-plus-circle"></i>Inventory Details
                  </h4>
                  <hr />
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <Label>Inventory Name</Label>
                        <Input
                          value={inventoryName}
                          onChange={(e) => setInventoryName(e.target.value)}
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
                          <Input
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
                          <Input
                            className="form-control"
                            type="number"
                            value={inventoryId}
                            onChange={(e) => setInventoryId(e.target.value)}
                            defaultValue="1"
                            id="example-number-input"
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
                            onChange={(e) => setInventoryTypeId(e.value)}
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
                      disabled={addInventoryDataLoading}
                      color="primary"
                      type="submit"
                      onClick={() => inventoryDataSubmit()}
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

export default AddInventory;
