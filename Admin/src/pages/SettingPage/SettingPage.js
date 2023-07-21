import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import {
  TabContent,
  TabPane,
  Form,
  NavLink,
  NavItem,
  Nav,
  Card,
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  Label,
  Input,
  CardBody,
  CardText,
  CardTitle,
  CardSubtitle,
  Container,
} from "reactstrap";

import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { isEmpty, map } from "lodash";
import { mstCompanys } from "../../services/graphql";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";

// Images
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import classnames from "classnames";

const SettingPage = () => {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [webSite, setWebSite] = useState("");
  const [companyPercent, setCompanyPercent] = useState("");
  const [crmInvoiceFooter, setCrmInvoiceFooter] = useState("");
  const [crmInvoiceHeader, setCrmInvoiceHeader] = useState("");
  const [crmQuoteFooter, setCrmQuoteFooter] = useState("");
  const [mobile, setmobile] = useState("");
  const [idx, setidx] = useState(1);
  const [isError, setIsError] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [activeTab1, setactiveTab1] = useState("5");
  const [activeTabV, setactiveTabV] = useState("15");
  const [selectedFiles, setselectedFiles] = useState([]);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_scroll, setmodal_scroll] = useState(false);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  //const [activeTab2, setactiveTab2] = useState("9");
  //const [activeTab3, setactiveTab3] = useState("13");
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [activeTabJustify1, setactiveTabJustify1] = useState("20");
  const [activeTabJustify2, setactiveTabJustify2] = useState("25");
  const [crmQuoteHeader, setCrmQuoteHeader] = useState("");
  const [companyProfileDetails, setCompanyProfileDetails] = useState({});

  const [
    fetchCompanyProfileDetails,
    { loading: AddressLoading, data: companyProfileDetailsData },
  ] = useLazyQuery(mstCompanys);

  useEffect(() => {
    fetchCompanyProfileDetails({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanyProfileDetails]);

  const [abhi, setAbhi] = useState("");

  useEffect(() => {
    if (companyProfileDetailsData && companyProfileDetailsData.mstCompanys) {
      setCompanyProfileDetails(companyProfileDetailsData.mstCompanys.data);
      setAbhi(
        companyProfileDetailsData.mstCompanys.data.filter(
          (item) => item.companyId === 2
        )
      );
    }
  }, [companyProfileDetailsData]);

  const rowData = [
    {
      logoPath: "CompanyLogo/1/869630311_08-05-2015_12_27_1.png",
      companyName: "	BMW 1 Series",
      email: "Product@gmail.com",
      webSite: "123.ezyfind.za",
      crmcolorCode: "#1234",
      createdDate: "12/2/2002",
      description: "when",
      companyPercent: "12",
      crmInvoiceFooter: "hello invoice footer",
      crmInvoiceHeader: "hello invoice header",
      crmQuoteFooter: "hello quote footer",
      crmQuoteHeader: "hello quote header",
      uid: "12",
      status: "	Active",
    },
  ];

  // let finalData = [];
  // const makeDataCompanyProfileDetails = (CompanyProfileDetailsData) => {
  //   CompanyProfileDetailsData.forEach((datum) => {
  //     finalData.push({
  //     logoPath: datum.logoPath,
  //       companyName: datum.companyName,
  //       email: datum.email,
  //       webSite: datum.webSite,
  // createdDate: datum.createdDate,
  //       description: datum.description,
  //       crmcolorCode: datum.crmcolorCode,
  //       companyPercent: datum.companyPercent,
  //       crmInvoiceFooter: datum.crmInvoiceFooter,
  //       crmInvoiceHeader: datum.crmInvoiceHeader,
  //       crmQuoteFooter: datum.crmQuoteFooter,
  //       crmQuoteHeader: datum.crmQuoteHeader,
  //       status: datum.isActive === true ? "Active" : "InActive",
  //     });
  //   });
  //   return finalData;
  // };

  // let CompanyProfileDetails =
  // companyProfileDetails.length === 0 ? rowData : makeDataCompanyProfileDetails(companyProfileDetails);

  const data = {
    rows: companyProfileDetails,
  };

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setCompanyName(obj.companyName);
        setEmail(obj.email);
        setWebSite(obj.webSite);
        setCompanyPercent(obj.companyPercent);
        setCrmInvoiceFooter(obj.crmInvoiceFooter);
        setCrmInvoiceHeader(obj.crmInvoiceHeader);
        setCrmQuoteFooter(obj.crmQuoteFooter);
        setCrmQuoteHeader(obj.crmQuoteHeader);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setCompanyName(obj.companyName);
        setEmail(obj.email);
        setWebSite(obj.webSite);
        setCompanyPercent(obj.companyPercent);
        setCrmInvoiceFooter(obj.crmInvoiceFooter);
        setCrmInvoiceHeader(obj.crmInvoiceHeader);
        setCrmQuoteFooter(obj.crmQuoteFooter);
        setCrmQuoteHeader(obj.crmQuoteHeader);
        setidx(obj.uid);
      }
    }
  }, [mstCompanys]);

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }
  function toggle1(tab) {
    if (activeTab1 !== tab) {
      setactiveTab1(tab);
    }
  }

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }
  function toggleV(tab) {
    if (activeTabV !== tab) {
      setactiveTabV(tab);
    }
  }

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
    }
  }

  function toggleCustomJustified1(tab) {
    if (activeTabJustify1 !== tab) {
      setactiveTabJustify1(tab);
    }
  }

  function toggleCustomJustified2(tab) {
    if (activeTabJustify2 !== tab) {
      setactiveTabJustify2(tab);
    }
  }

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
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

  function tog_scroll() {
    setmodal_scroll(!modal_scroll);
    removeBodyCss();
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Setting" breadcrumbItem="Home >> Settings" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h2">Company Settings</CardTitle>

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
                        <span className="d-none d-sm-block">CRM</span>
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
                        <span className="d-none d-sm-block">Integration</span>
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
                        <span className="d-none d-sm-block">Audit</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "9",
                        })}
                        onClick={() => {
                          toggleCustomJustified("9");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">Notifications</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTabJustify}>
                    <TabPane tabId="5" className="p-3">
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <AvForm className="needs-validation">
                                <h4>
                                  <i className="uil-bag-alt"></i>General Setting
                                </h4>
                                <hr />
                                {!isEmpty(companyProfileDetails) && (
                                  <Row>
                                    <Col md="4">
                                      <div>
                                        <img
                                          src={abhi[0].logoPath}
                                          className="rounded avatar-lg my-3"
                                          alt="logo image"
                                        />
                                      </div>
                                    </Col>
                                    <Col md="8">
                                      <FormGroup className="mb-3">
                                        <Label
                                          htmlFor="example-url-input"
                                          className="col-md-2 col-form-label"
                                        >
                                          Site URL
                                        </Label>
                                        <div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="url"
                                            value={abhi[0].webSite}
                                          />
                                        </div>
                                      </FormGroup>
                                      <FormGroup className="mb-3">
                                        <Label>Upload New Logo</Label>
                                        <div className="col-md-10">
                                          <input
                                            className="form-control"
                                            type="file"
                                          />
                                        </div>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                )}
                                <Button color="primary" type="submit">
                                  <i className="bx bx-save"></i>Submit
                                </Button>
                              </AvForm>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    {!isEmpty(companyProfileDetails) && (
                      <TabPane tabId="6" className="p-3">
                        <h3>
                          <i className="uil-cloud-upload"></i>CRM Setting
                        </h3>

                        <Row>
                          <Col>
                            <Label
                              htmlFor="example-color-input"
                              className="col-md-2 col-form-label"
                            >
                              Color
                            </Label>
                            <div className="col-md-10">
                              <input
                                className="form-control form-control-color mw-100"
                                type="color"
                                value={abhi[0].crmcolorCode}
                                defaultValue="#556ee6"
                                id="example-color-input"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="mt-3">
                              <Label>Quote Header</Label>
                              <Input
                                type="textarea"
                                id="textarea"
                                value={abhi[0].crmQuoteHeader}
                                onChange={(e) => {
                                  textareachange(e);
                                }}
                                maxLength="225"
                                rows="3"
                                placeholder="Text for quote header."
                              />
                              {textareabadge ? (
                                <span className="badgecount badge badge-success">
                                  {" "}
                                  {textcount} / 225{" "}
                                </span>
                              ) : null}
                            </div>
                          </Col>
                          <Col>
                            <div className="mt-3">
                              <Label>Quote Footer</Label>
                              <Input
                                type="textarea"
                                id="textarea"
                                value={abhi[0].crmQuoteFooter}
                                onChange={(e) => {
                                  textareachange(e);
                                }}
                                maxLength="225"
                                rows="3"
                                placeholder="Terms & Conditions apply. Quote valid for 30 days from creation."
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
                              <Label>Invoice Header</Label>
                              <Input
                                type="textarea"
                                id="textarea"
                                value={abhi[0].crmInvoiceHeader}
                                onChange={(e) => {
                                  textareachange(e);
                                }}
                                maxLength="225"
                                rows="3"
                                placeholder="Text for Invoice header"
                              />
                              {textareabadge ? (
                                <span className="badgecount badge badge-success">
                                  {" "}
                                  {textcount} / 225{" "}
                                </span>
                              ) : null}
                            </div>
                          </Col>
                          <Col>
                            <div className="mt-3">
                              <Label>Invoice Footer</Label>
                              <Input
                                type="textarea"
                                id="textarea"
                                value={abhi[0].crmQuoteFooter}
                                onChange={(e) => {
                                  textareachange(e);
                                }}
                                maxLength="225"
                                rows="3"
                                placeholder="Terms & Conditions apply. Quote valid for 30 days from creation."
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

                        <div>
                          <Button
                            color="primary"
                            type="submit"
                            className="my-3"
                          >
                            <i className="bx bx-save"></i>Submit
                          </Button>
                        </div>
                      </TabPane>
                    )}
                    {!isEmpty(companyProfileDetails) && (
                      <TabPane tabId="7" className="p-3">
                        <h3>
                          <i className="uil-document-layout-left"></i>Third
                          Party Integration
                        </h3>
                        <hr />
                        <div>
                          <h2>PayFast</h2>
                        </div>

                        <div>
                          <Row>
                            <Col>
                              <Label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                              >
                                PayFast Merchant ID
                              </Label>
                              <div className="col-md-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  value={abhi[0].payFastMerchantId}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Label
                                htmlFor="example-text-input"
                                className="col-md-2 col-form-label"
                              >
                                PayFast Merchant Key
                              </Label>
                              <div className="col-md-6">
                                <input
                                  className="form-control"
                                  type="text"
                                  value={abhi[0].payFastMerchantKey}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div>
                          <Button
                            color="primary"
                            type="submit"
                            className="my-3"
                          >
                            <i className="bx bx-save"></i>Submit
                          </Button>
                        </div>
                      </TabPane>
                    )}

                    {!isEmpty(companyProfileDetails) && (
                      <TabPane tabId="8" className="p-3">
                        <Row>
                          <Col className="col-12">
                            <h3 className="mb-4">
                              <i className="uil-document-layout-left"></i>
                              Audit Log
                            </h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="2">
                            <div>
                              <img
                                src={abhi[0].logoPath}
                                className="rounded avatar-sm"
                                alt="logo"
                              />
                            </div>
                          </Col>
                          <Col md="10">
                            <p>
                              <Link>{abhi[0].companyName}</Link> at{" "}
                              {abhi[0].createdDate}
                              <br />
                              {abhi[0].description}
                            </p>
                          </Col>
                        </Row>

                        <hr />
                      </TabPane>
                    )}
                    <TabPane tabId="9" className="p-3">
                      <h3>
                        <i className="uil-document-layout-left"></i>
                        Notifications Settings
                      </h3>

                      <div className="table-responsive">
                        <table className="table table-bordered  mb-0">
                          <thead>
                            <tr>
                              <th>Service</th>
                              <th> Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">Request Alerts</th>
                              <th scope="row">
                                <div className="form-check form-check-end">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck2"
                                    defaultChecked
                                  />
                                </div>
                              </th>
                            </tr>
                            <tr>
                              <th scope="row">Newsletter Alerts</th>
                              <th scope="row">
                                <div className="form-check form-check-end">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck2"
                                    defaultChecked
                                  />
                                </div>
                              </th>
                            </tr>
                            <tr>
                              <th scope="row">Industry Alerts</th>
                              <th scope="row">
                                <div className="form-check form-check-end">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="defaultCheck2"
                                    defaultChecked
                                  />
                                </div>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <Row>
                        <Col>
                          <div>
                            <Button
                              color="primary"
                              type="save"
                              className="my-3"
                            >
                              <i className="bx bx-save"></i>Save
                            </Button>
                          </div>
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

export default SettingPage;
