import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Table,
  Button,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Modal,
  CardText,
  TabContent,
  TabPane,
} from "reactstrap";
import jwt from "jsonwebtoken";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import DatePicker from "react-datepicker";
//Import Breadcrumb
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import {
  createMstSpecials,
  getMstCategoryMain,
  // getProvince,
  // getCity,
  // getSuburb,
} from "../.././services/graphql";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";

const AddNewSpecial = () => {
  const [categoryMain, setCategoryMain] = useState([]);

  const [activeTab, setactiveTab] = useState(1);
  const [activeTabVartical, setoggleTabVertical] = useState(1);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [specialTitle, setSpecialTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [vaildStartDate, setVaildStartDate] = useState(false);
  const [vaildEndDate, setVaildEndDate] = useState(false);
  const [diffDays, setDiffDays] = useState(0);
  const [requestDetail, setRequestDetail] = useState("");

  const [selectedfile, setSelectedFile] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { addToast } = useToasts();
  const [mstSpecials, { loading: mstSpecialsLoading, data: mstSpecialsData }] =
    useMutation(createMstSpecials);
  const [fetchCategoryMain, { data: categoryMainData }] =
    useLazyQuery(getMstCategoryMain);

  useEffect(() => {
    fetchCategoryMain();
  }, [fetchCategoryMain]);

  useEffect(() => {
    if (mstSpecialsData && mstSpecialsData.createMstEFlyers) {
      if (mstSpecialsData.createMstEFlyers.success === true) {
        addToast(mstSpecialsData.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSpecialTitle("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setCategoryId(null);
        setRequestDetail("");
        setSelectedFile(null);
        setactiveTab(1);
      }
    }
  }, [mstSpecialsData]);

  useEffect(() => {
    if (categoryMainData && categoryMainData.getMstCategoryMain) {
      const catMainData = categoryMainData.getMstCategoryMain.result || [];
      setCategoryMain(catMainData);
    }
  }, [categoryMainData]);
  const requestDataSubmit = () => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);
    if (specialTitle === "") {
      addToast("Request title not empty", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    if (categoryId === null) {
      addToast("category not selected", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    mstSpecials({
      variables: {
        mstSpecials: {
          specialTitle: specialTitle,
          categoryId: categoryId,
          specialdescription: description,
          startDate: dateFormated,
          // suburbId: suburbId,
          requestDetail: requestDetail,

          createdBy: decodeJwt.id,
          createdDate: dateFormated,
          modifiedDate: dateFormated,
        },
        file: selectedfile,
      },
    });
  };
  function toggleTab(tab) {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
      }
    }
  }

  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab);
      }
    }
  }
  const selectCategory = (item) => {
    setCategoryId(item.categoryId);
  };
  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    setDescription(event.target.value);
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

  // provinceData.forEach((item) => {
  //   options.push({ label: item.provinceName, value: item.provinceId });
  // });
  // const cityOption = [];
  // cityList.forEach((item) => {
  //   cityOption.push({ label: item.cityName, value: item.cityId });
  // });
  // const SuburbOption = [];
  // suburb.forEach((item) => {
  //   SuburbOption.push({ label: item.suburbName, value: item.suburbId });
  // });
  const [preview, setPreview] = useState({ imgSrc: null });
  const setSelectedFileformat = (file) => {
    setSelectedFile(file);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPreview({
        imgSrc: [reader.result],
      });
    }.bind(this);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Add New Special" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{""}</h4>
                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1);
                            }}
                          >
                            <span className="number">
                              {" "}
                              <i className="uil-pen"></i>
                            </span>{" "}
                            Special Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2);
                            }}
                          >
                            <span className="number me-2">
                              {" "}
                              <i className="uil-list-ul"></i>
                            </span>{" "}
                            Category
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3);
                            }}
                          >
                            <span className="number">
                              {" "}
                              <i className="uil-map"></i>
                            </span>{" "}
                            Area Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4);
                            }}
                          >
                            <span className="number">
                              <i className="uil-image"></i>
                            </span>{" "}
                            Upload Photos
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <div className="body">
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId={1}>
                            <Form>
                              <Row>
                                <Col className="mb-3">
                                  <label
                                    htmlFor="example-text-input"
                                    className="col-md-2 col-form-label"
                                  >
                                    Title
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={specialTitle}
                                      required={true}
                                      onChange={(e) =>
                                        setSpecialTitle(e.target.value)
                                      }
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <div className="mt-3">
                                    <Label>Description</Label>

                                    <Input
                                      type="textarea"
                                      id="textarea"
                                      value={description}
                                      onChange={(e) => {
                                        textareachange(e);
                                      }}
                                      maxLength="225"
                                      rows="7"
                                      placeholder="This Description has a limit of 400 chars."
                                    />
                                    {textareabadge ? (
                                      <span className="badgecount badge badge-success">
                                        {" "}
                                        {textcount} / 400{" "}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <Row className="mb-3">
                                <Col md={6}>
                                  <div className="mt-3">
                                    <Label>Start Date</Label>
                                    {/* <div className="col-md-10">
                                      <input
                                        className="form-control"
                                        type="date"
                                        defaultValue="2019-08-19"
                                        id="example-date-input"
                                      />
                                    </div> */}
                                    <DatePicker
                                      placeholderText="Start Date"
                                      onChange={(date) => {
                                        setVaildStartDate(false);
                                        setStartDate([
                                          ...startDate,
                                          {
                                            index: mstSpecials.categoryId,
                                            date: date,
                                          },
                                        ]);
                                      }}
                                      popperClassName="hire-date-range"
                                      popperPlacement="top-end"
                                      minDate={new Date()}
                                      maxDate={endDate}
                                    />
                                  </div>
                                </Col>
                                <Col md={6}>
                                  <div className="mt-3">
                                    <Label>End Date</Label>
                                    <DatePicker
                                      placeholderText="End Date"
                                      onChange={(date) => {
                                        setVaildEndDate(false);
                                        setEndDate([
                                          ...endDate,
                                          {
                                            index: mstSpecials.categoryId,
                                            date: date,
                                          },
                                        ]);
                                      }}
                                      popperClassName="hire-date-range"
                                      popperPlacement="top-end"
                                    />
                                    {vaildEndDate && (
                                      <span className="text-primary text-vaild">
                                        Enter End Date
                                      </span>
                                    )}
                                  </div>
                                </Col>
                              </Row>
                              <Row className="mb-3">
                                <Label>Amount (R)</Label>
                                <div className="col-md-10">
                                  <input
                                    className="form-control"
                                    type="number"
                                    defaultValue="42"
                                    id="example-number-input"
                                  />
                                </div>
                              </Row>
                            </Form>
                          </TabPane>
                          <TabPane tabId={2}>
                            <div>
                              <Form>
                                <Row>
                                  <Col>
                                    <div className="my-4 text-center">
                                      <button
                                        type="button"
                                        className="btn btn-info waves-effect waves-light"
                                        onClick={() => {
                                          tog_backdrop();
                                        }}
                                        data-toggle="modal"
                                      >
                                        Select Category
                                        <i className="uil-edit"></i>
                                      </button>
                                      <Modal
                                        isOpen={modal_backdrop}
                                        toggle={() => {
                                          tog_backdrop();
                                        }}
                                        scrollable={true}
                                        id="staticBackdrop"
                                      >
                                        <div className="modal-header">
                                          <h5
                                            className="modal-title"
                                            id="staticBackdropLabel"
                                          >
                                            Select Category
                                          </h5>
                                          <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => {
                                              setmodal_backdrop(false);
                                            }}
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div className="modal-body">
                                          <Row>
                                            {categoryMain.map((item, index) => (
                                              <Col key={"cat" + index} lg={4}>
                                                <Card
                                                  color={
                                                    categoryId ===
                                                    item.categoryId
                                                      ? "dark"
                                                      : "light"
                                                  }
                                                  onClick={() =>
                                                    selectCategory(item)
                                                  }
                                                  className="text-light"
                                                >
                                                  <CardBody>
                                                    <div>
                                                      <img
                                                        src={`${PRODUCT_IMAGE_URL}${item.categoryIcon}`}
                                                        className="rounded avatar-md"
                                                        alt=""
                                                      />
                                                    </div>
                                                    <CardText>
                                                      {item.categoryName}
                                                    </CardText>
                                                  </CardBody>
                                                </Card>
                                              </Col>
                                            ))}
                                            {/* <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Automotive
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Manufacturing
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Agriculture
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Construction
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>
                                                    Entertainment
                                                  </CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>Financial</CardText>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col lg={4}>
                                              <Card
                                                color="dark"
                                                className="text-light"
                                              >
                                                <CardBody>
                                                  <div>
                                                    <img
                                                      src={avatar4}
                                                      className="rounded avatar-md"
                                                      alt=""
                                                    />
                                                  </div>
                                                  <CardText>Attorneys</CardText>
                                                </CardBody>
                                              </Card>
                                            </Col> */}
                                          </Row>
                                        </div>
                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={() => {
                                              setmodal_backdrop(false);
                                            }}
                                          >
                                            Close
                                          </button>
                                          <button
                                            type="button"
                                            className="btn btn-primary"
                                          >
                                            Main Categories
                                          </button>
                                        </div>
                                      </Modal>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                <Row>
                                  <Col>
                                    <div className="mb-3">
                                      <Label>Province</Label>
                                      <select className="form-select">
                                        <option defaultValue></option>
                                        <option value="EC">Eastern Cape</option>
                                        <option value="FS">Free State</option>
                                        <option value="GT">Gauteng</option>
                                        <option value="KN">
                                          Kwazulu Natal
                                        </option>
                                        <option value="LP">Limpopo</option>
                                        <option value="ML">Mpumalanga</option>
                                        <option value="NW">North West</option>
                                        <option value="NC">
                                          Northern Cape
                                        </option>
                                        <option value="WC">Western Cape</option>
                                      </select>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="mb-3">
                                      <Label>City</Label>
                                      <select className="form-select">
                                        <option defaultValue></option>
                                        <option value="AE">
                                          American Express
                                        </option>
                                        <option value="VI">Visa</option>
                                        <option value="MC">MasterCard</option>
                                        <option value="DI">Discover</option>
                                      </select>
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="mb-3">
                                      <Label>Suburb</Label>
                                      <select className="form-select">
                                        <option defaultValue></option>
                                        <option value="AE">
                                          American Express
                                        </option>
                                        <option value="VI">Visa</option>
                                        <option value="MC">MasterCard</option>
                                        <option value="DI">Discover</option>
                                      </select>
                                    </div>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={4}>
                            <div className="row justify-content-center">
                              <Col className="mb-3">
                                <label htmlFor="resume">{""}</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="resume"
                                />
                              </Col>
                            </div>
                            <div className="table-responsive">
                              <Table className="table mb-0">
                                <thead>
                                  <tr>
                                    <th>Image</th>
                                    <th>{""}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                    <td>{""}</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                    <td>{""}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <Button
                              disabled={mstSpecialsLoading}
                              onClick={() => requestDataSubmit()}
                              color="primary"
                              className="btn btn-primary waves-effect waves-light"
                            >
                              Submit
                            </Button>{" "}
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            className="btn btn-primary"
                            onClick={() => {
                              toggleTab(activeTab + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AddNewSpecial;
