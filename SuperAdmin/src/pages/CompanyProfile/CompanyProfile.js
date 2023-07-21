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
  Spinner,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { isEmpty, map } from "lodash";
import { Link } from "react-router-dom";
import Select from "react-select";
import BootstrapTable from "react-bootstrap-table-next";
import { AvForm, AvField } from "availity-reactstrap-validation";

// Images
import avatar4 from "../../assets/images/users/avatar-4.jpg";

//Import Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import { useLazyQuery } from "@apollo/react-hooks";
import { mstCompanys, mapCompanyDocuments } from "../../services/graphql";
import { mapCompanyProvides } from "../../services/graphql";
import { mapCompanySeeks } from "../../services/graphql";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import classnames from "classnames";

const CompanyProfile = (props) => {
  const [activeTab, setactiveTab] = useState("1");
  const [activeTab1, setactiveTab1] = useState("5");
  const [activeTabV, setactiveTabV] = useState("15");
  const [selectedFiles, setselectedFiles] = useState([]);
  const [selectedGroup, setselectedGroup] = useState(null);
  const [modal_standard, setmodal_standard] = useState(false);
  const [modal_scroll, setmodal_scroll] = useState(false);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [activeTabJustify1, setactiveTabJustify1] = useState("20");
  const [activeTabJustify2, setactiveTabJustify2] = useState("25");
  const [companyList, setCompanyList] = useState([]);
  const [
    fetchCompanyList,
    { loading: IncomingCompanyLoading, data: companyListData },
  ] = useLazyQuery(mstCompanys);

  useEffect(() => {
    fetchCompanyList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanyList]);
  const [abhi, setAbhi] = useState("");
  useEffect(() => {
    if (companyListData && companyListData.mstCompanys) {
      setCompanyList(companyListData.mstCompanys.data);
      setAbhi(
        companyListData.mstCompanys.data.filter((item) => item.companyId === 2)
      );
    }
  }, [companyListData]);
  console.log("zsdrgft", abhi);

  const [companyDocumentList, setCompanyDocumentList] = useState([]);
  const [
    fetchCompanyDocumentList,
    {
      loading: IncomingCompanyDocumentLoading,
      result: companyDocumentListData,
    },
  ] = useLazyQuery(mapCompanyDocuments);

  useEffect(() => {
    fetchCompanyDocumentList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanyDocumentList]);

  useEffect(() => {
    if (
      companyDocumentListData &&
      companyDocumentListData.mapCompanyDocuments
    ) {
      setCompanyDocumentList(
        companyDocumentListData.mapCompanyDocuments.result
      );
      setAbhi(
        companyDocumentListData.mapCompanyDocuments.result.filter(
          (item) => item.companyId === 2
        )
      );
    }
  }, [companyDocumentListData]);

  const rowData2 = [
    {
      aboutDocument: "	BMW 1 Series",
      companyId: 1,
      compDocId: "100 Vehicle",
      createdDate: "1/2/2004",
      documentName: "hello",
      documentPath: "123.ertr",
      documentStatusId: 23,
      documentTypeId: 24,
      modifiedBy: "friend",
      modifiedDate: "23/4/2003",
      rejectReason: "no mentioned",
      status: "	Active",
    },
  ];

  let finalList2 = [];
  const makeDataCompanyDocumentList = (CompanyDocumentListList) => {
    CompanyDocumentListList.forEach((datum) => {
      finalList.push({
        aboutDocument: datum.aboutDocument,
        companyId: datum.companyId,
        compDocId: datum.compDocId,
        createdDate: datum.createdDate,
        documentName: datum.documentName,
        documentPath: datum.documentPath,
        documentStatusId: datum.documentStatusId,
        documentTypeId: datum.documentTypeId,
        modifiedBy: datum.modifiedBy,
        modifiedDate: datum.modifiedDate,
        rejectReason: datum.rejectReason,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList2;
  };

  let CompanyDocumentList =
    companyDocumentList.length === 0
      ? rowData2
      : makeDataCompanyDocumentList(companyDocumentList);

  const result = {
    rows: companyDocumentList,
  };

  const rowData = [
    {
      companyName: "EzyFind",
      serviceTax: "14.00",
      vatnumber: "EzyFind0001",
      directorsCount: "null",
      description: "EzyFind 001",
      email: "test@ezyfind.co.za",
      webSite: "http://www.EzyFind.co.za/",
      phone: "110569123",
      helpDeskNumber: "0110569123",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataCompanyList = (CompanyListList) => {
    CompanyListList.forEach((datum) => {
      finalList.push({
        companyName: datum.companyName,
        serviceTax: datum.serviceTax,
        vatnumber: datum.vatnumber,
        directorsCount: datum.directorsCount,
        description: datum.description,
        email: datum.email,
        webSite: datum.webSite,
        phone: datum.phone,
        helpDeskNumber: datum.helpDeskNumber,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let CompanyList =
    companyList.length === 0 ? rowData : makeDataCompanyList(companyList);

  const data = {
    rows: CompanyList,
  };

  const [companyProvidesList, setCompanyProvidesList] = useState([]);
  const [
    fetchCompanyProvidesList,
    { loading: IncomingCompanyProvidesLoading, data1: companyProvidesListData },
  ] = useLazyQuery(mapCompanyProvides);

  useEffect(() => {
    fetchCompanyProvidesList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanyProvidesList]);

  useEffect(() => {
    if (companyProvidesListData && companyProvidesListData.mapCompanyProvides) {
      setCompanyProvidesList(companyProvidesListData.mapCompanyProvides.data1);
    }
  }, [companyProvidesListData]);

  const rowData1 = [
    {
      compPackageId: "	BMW 1 Series",
      provideKeywordId: "Product",
      periodTypeId: "100 Vehicle",
      quantityTypeId: "100",
      status: "	Active",
    },
  ];

  let finalList1 = [];
  const makeDataCompanyProvidesList = (CompanyProvidesListList) => {
    CompanyProvidesListList.forEach((datum) => {
      finalList.push({
        compPackageId: datum.compPackageId,
        provideKeywordId: datum.seekKeywordId,
        periodTypeId: datum.periodTypeId,
        quantityTypeId: datum.quantityTypeId,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList1;
  };

  let CompanyProvidesList =
    companyProvidesList.length === 0
      ? rowData1
      : makeDataCompanyProvidesList(companyProvidesList);

  const data1 = {
    rows: CompanyProvidesList,
  };

  const [companySeeksList, setCompanySeeksList] = useState([]);
  const [
    fetchCompanySeeksList,
    { loading: IncomingCompanySeeksLoading, data3: companySeeksListData },
  ] = useLazyQuery(mapCompanySeeks);

  useEffect(() => {
    fetchCompanySeeksList({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchCompanySeeksList]);

  useEffect(() => {
    if (companySeeksListData && companySeeksListData.mapCompanySeeks) {
      setCompanySeeksList(companySeeksListData.mapCompanySeeks.data3);
    }
  }, [companySeeksListData]);

  const rowData3 = [
    {
      compPackageId: "	BMW 1 Series",
      seekKeywordId: "Product",
      periodTypeId: "100 Vehicle",
      quantityTypeId: "100",
      status: "	Active",
    },
  ];


  let finalList3 = [];
  const makeDataCompanySeeksList = (CompanySeeksListList) => {
    CompanySeeksListList.forEach((datum) => {
      finalList.push({
        compPackageId: datum.compPackageId,
        seekKeywordId: datum.seekKeywordId,
        periodTypeId: datum.periodTypeId,
        quantityTypeId: datum.quantityTypeId,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList3;
  };


  let CompanySeeksList =
  companySeeksList.length === 0
    ? rowData3
    : makeDataCompanySeeksList(companySeeksList);

const data3 = {
  rows: CompanySeeksList,
};




  
  const products = [{ name: "David McHenry" }];
  const columns = [
    {
      dataField: "name",
    },
  ];

  const optionGroup = [
    {
      label: "Document Type",
      options: [
        { label: "CV", value: "CV" },
        { label: "Passport", value: "Passport" },
        { label: "Cipro", value: "Cipro" },
        { label: "BEE", value: "BEE" },
        { label: "Qualification", value: "Qualification" },
        { label: "Industry", value: "Industry" },
        { label: "ID", value: "ID" },
        { label: "Photo", value: "Photo" },
      ],
    },
  ];

  const data6 = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "Email",
        sort: "asc",
        width: 270,
      },
      {
        label: "Contact No",
        field: "Contact",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [
      {
        name: "Tiger Nixon",
        Email: "SystemArchitect@gmail.com",
        Contact: "7757575587",
      },
      {
        name: "Garrett Winters",
        Email: "Accountant@gmail.com",
        Contact: "7657647647",
      },
      {
        name: "Ashton Cox",
        Email: "JuniorTechnicalAuthor@gmail.com",
        Contact: "7675675757",
      },
    ],
  };

  const optionGroup1 = [
    {
      label: "Select Customer",
      options: [
        { label: "External Customer", value: "External Customer" },
        { label: "Internal Customer", value: "Internal Customer" },
      ],
    },
  ];
  const optionGroup2 = [
    {
      label: "Select Customer",
      options: [
        { label: "Eastern Cape", value: "Eastern Cape" },
        { label: "Free State", value: "Free State" },
        { label: "Gauteng", value: "Gauten" },
        { label: "Kwazulu Natal", value: "Kwazulu Natal" },
        { label: "Limpopo", value: "Limpopo" },
        { label: "Mpumalanga", value: "Mpumalanga" },
        { label: "North West", value: "North West" },
        { label: "Northern Cape", value: "Northern Cape" },
        { label: "Western Cape", value: "Western Cape" },
      ],
    },
  ];

  function tog_standard() {
    setmodal_standard(!modal_standard);
    removeBodyCss();
  }

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
          <Breadcrumbs title="UI Elements" breadcrumbItem="Profile" />

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h2">My Company Profile</CardTitle>

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
                        <span className="d-none d-sm-block">Profile</span>
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
                        <span className="d-none d-sm-block">Document</span>
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
                        <span className="d-none d-sm-block">Category</span>
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
                        <span className="d-none d-sm-block">Business</span>
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
                        <span className="d-none d-sm-block">Provide</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "10",
                        })}
                        onClick={() => {
                          toggleCustomJustified("10");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">Email</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "11",
                        })}
                        onClick={() => {
                          toggleCustomJustified("11");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="fas fa-cog"></i>
                        </span>
                        <span className="d-none d-sm-block">Seek</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: activeTabJustify === "12",
                        })}
                        onClick={() => {
                          toggleCustomJustified("12");
                        }}
                      >
                        <span className="d-block d-sm-none">
                          <i className="far fa-envelope"></i>
                        </span>
                        <span className="d-none d-sm-block">INVOICE</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTabJustify}>
                    <TabPane tabId="5" className="p-3">
                      {isEmpty(companyList) && IncomingCompanyLoading && (
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
                      )}
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <AvForm className="needs-validation">
                                {!isEmpty(companyList) && (
                                  <Row>
                                    <Col>
                                      <Card>
                                        <CardBody>
                                          <AvForm className="needs-validation">
                                            <h4>
                                              <i className="uil-bag-alt"></i>
                                              {abhi[0].companyName}
                                            </h4>
                                            <hr />
                                            <Row>
                                              <Col md="4">
                                                <FormGroup className="mb-3">
                                                  <Label htmlFor="validationCustom01">
                                                    Service Tax
                                                  </Label>
                                                  <div>
                                                    <input
                                                      className="form-control"
                                                      type="number"
                                                      value={abhi[0].serviceTax}
                                                      id="example-number-input"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                              <Col md="4">
                                                <FormGroup className="mb-3">
                                                  <Label htmlFor="validationCustom02">
                                                    VAT Number
                                                  </Label>
                                                  <div>
                                                    <input
                                                      className="form-control"
                                                      type="any"
                                                      value={abhi[0].vatnumber}
                                                      id="example-number-input"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                              <Col md="4">
                                                <FormGroup className="mb-3">
                                                  <Label htmlFor="validationCustom02">
                                                    Number of Directors
                                                  </Label>
                                                  <div>
                                                    <input
                                                      className="form-control"
                                                      type="number"
                                                      value={
                                                        abhi[0].directorsCount
                                                      }
                                                      id="example-number-input"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <div className="mt-3">
                                                  <Label>Description</Label>
                                                  <Input
                                                    type="textarea"
                                                    id="textarea"
                                                    onChange={(e) => {
                                                      textareachange(e);
                                                    }}
                                                    value={abhi[0].description}
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
                                            <hr />
                                            <h4 className="my-3">
                                              <i className="uil-map"></i>Address
                                            </h4>
                                            <hr />
                                            <Row>
                                              <Col>
                                                <div className="mb-3">
                                                  <label className="form-label">
                                                    Street Address
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    type="text"
                                                    value={data.streetAddress}
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
                                                    value={selectedGroup}
                                                    onChange={() => {
                                                      handleSelectGroup();
                                                    }}
                                                    options={optionGroup2}
                                                    classNamePrefix="select2-selection"
                                                  />
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <div className="mb-3">
                                                  <Label>City</Label>
                                                  <Select
                                                    value={selectedGroup}
                                                    onChange={() => {
                                                      handleSelectGroup();
                                                    }}
                                                    options={optionGroup}
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
                                                    value={selectedGroup}
                                                    onChange={() => {
                                                      handleSelectGroup();
                                                    }}
                                                    options={optionGroup2}
                                                    classNamePrefix="select2-selection"
                                                  />
                                                </div>
                                              </Col>
                                              <Col md="6">
                                                <FormGroup className="mb-3">
                                                  <Label htmlFor="validationCustom05">
                                                    Zip
                                                  </Label>
                                                  <AvField
                                                    name="zip"
                                                    placeholder="Zip Code"
                                                    type="text"
                                                    errorMessage=" Please provide a valid zip."
                                                    className="form-control"
                                                    validate={{
                                                      required: { value: true },
                                                    }}
                                                    id="validationCustom05"
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            <hr />
                                            <h4>
                                              <i className="uil-envelope-open"></i>
                                              Contact Information
                                            </h4>
                                            <hr />
                                            <Row>
                                              <Col md="6">
                                                <FormGroup className="mb-3">
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="email"
                                                      label="E-Mail"
                                                      value={abhi[0].email}
                                                      placeholder="Enter Valid Email"
                                                      type="email"
                                                      errorMessage="Invalid Email"
                                                      validate={{
                                                        required: {
                                                          value: true,
                                                        },
                                                        email: { value: true },
                                                      }}
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                              <Col md="6">
                                                <FormGroup className="mb-3">
                                                  <Label htmlFor="validationCustom05">
                                                    Website
                                                  </Label>
                                                  <div className="col-md-10">
                                                    <input
                                                      className="form-control"
                                                      type="url"
                                                      value={abhi[0].webSite}
                                                      defaultValue="info@joburgcityauto.co.za"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                            </Row>

                                            <Row>
                                              <Col md="6">
                                                <FormGroup className="mb-3">
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="mobile"
                                                      label="Mobile"
                                                      value={abhi[0].phone}
                                                      defaultValue="112204900"
                                                      type="tel"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                              <Col md="6">
                                                <FormGroup className="mb-3">
                                                  <div className="mb-3">
                                                    <AvField
                                                      name="helpdesk"
                                                      label="Helpdesk"
                                                      value={
                                                        abhi[0].helpDeskNumber
                                                      }
                                                      defaultValue="113340389"
                                                      type="tel"
                                                    />
                                                  </div>
                                                </FormGroup>
                                              </Col>
                                            </Row>
                                            <Button
                                              color="primary"
                                              type="submit"
                                            >
                                              <i className="bx bx-save"></i>Save
                                            </Button>
                                          </AvForm>
                                        </CardBody>
                                      </Card>
                                    </Col>
                                  </Row>
                                )}

                                <hr />
                              </AvForm>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="6" className="p-3">
                      <h3>
                        <i className="uil-cloud-upload"></i>Document
                      </h3>
                      <Col>
                        <Card color="info" className="text-white-50">
                          <CardBody>
                            <h5 className="mt-0 mb-4 text-white">
                              Document Details
                            </h5>
                            <CardText>
                              Upload your documents and be EzyFind verified.
                              This will create confidence in our customers to do
                              business with you. Your information is safe with
                              us and will not be shared with any 3rd party.
                              <ol>
                                <li>CIPRO Document</li>
                                <li>BEE Certification</li>
                                <li>Identity Document of Directors</li>
                                <li>Tax certificate</li>
                                <li>Business Registration document</li>
                                <li>
                                  Any additional documents that will assist in
                                  speeding up the process.
                                </li>
                              </ol>
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                      <Row>
                        <Col className="col-12">
                          <Card>
                            <CardBody>
                              <Form>
                                <Dropzone
                                  onDrop={(acceptedFiles) => {
                                    handleAcceptedFiles(acceptedFiles);
                                  }}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <div className="dropzone">
                                      <div
                                        className="dz-message needsclick"
                                        {...getRootProps()}
                                      >
                                        <input {...getInputProps()} />
                                        <div className="mb-3">
                                          <i className="display-4 text-muted uil uil-cloud-upload" />
                                        </div>
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
                                      </div>
                                    </div>
                                  )}
                                </Dropzone>
                                <div
                                  className="dropzone-previews mt-3"
                                  id="file-previews"
                                >
                                  {selectedFiles.map((f, i) => {
                                    return (
                                      <Card
                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                        key={i + "-file"}
                                      >
                                        <div className="p-2">
                                          <Row className="align-items-center">
                                            <Col className="col-auto">
                                              <img
                                                data-dz-thumbnail=""
                                                height="80"
                                                className="avatar-sm rounded bg-light"
                                                alt={f.name}
                                                src={f.preview}
                                              />
                                            </Col>
                                            <Col>
                                              <Link
                                                to="#"
                                                className="text-muted font-weight-bold"
                                              >
                                                {f.name}
                                              </Link>
                                              <p className="mb-0">
                                                <strong>
                                                  {f.formattedSize}
                                                </strong>
                                              </p>
                                            </Col>
                                          </Row>
                                        </div>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </Form>

                              <div className="text-center mt-4">
                                <button
                                  type="button"
                                  className="btn btn-primary waves-effect waves-light"
                                >
                                  Send Files
                                </button>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                      {isEmpty(companyDocumentList) &&
                        IncomingCompanyDocumentLoading && (
                          <Row>
                            <Col>
                              <Card>
                                <Row className="g-0 align-items-center">
                                  <Col md={12}>
                                    <CardBody>
                                      <Spinner
                                        className="m-1"
                                        color="primary"
                                      />
                                    </CardBody>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        )}
                      {!isEmpty(companyDocumentList) && (
                        <Row>
                          <Col>
                            <Card>
                              <CardBody>
                                <div className="table-responsive">
                                  <table className="table table-bordered mb-0">
                                    <thead>
                                      <tr>
                                        <th>File</th>
                                        <th>Document Type</th>
                                        <th>About Document</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">{result.compDocId}</th>
                                        <td>
                                          <div className="mb-3">
                                            <Select
                                              value={result.documentTypeId}
                                              onChange={() => {
                                                handleSelectGroup();
                                              }}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                            />
                                          </div>
                                        </td>
                                        <td>{result.aboutDocument}</td>
                                        <td>{result.documentStatusId}</td>
                                        <td>
                                          <Button
                                            color="danger"
                                            outline
                                            className="waves-effect waves-light"
                                          >
                                            Remove
                                          </Button>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2</th>
                                        <td>
                                          <div className="mb-3">
                                            <Select
                                              value={selectedGroup}
                                              onChange={() => {
                                                handleSelectGroup();
                                              }}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="table-responsive">
                                            <BootstrapTable
                                              keyField="id"
                                              data={products}
                                              columns={columns}
                                              cellEdit={cellEditFactory({
                                                mode: "click",
                                              })}
                                            />
                                          </div>
                                        </td>
                                        <td>Verfication Pending</td>
                                        <td>
                                          <Button
                                            color="danger"
                                            outline
                                            className="waves-effect waves-light"
                                          >
                                            Remove
                                          </Button>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3</th>
                                        <td>
                                          <div className="mb-3">
                                            <Select
                                              value={selectedGroup}
                                              onChange={() => {
                                                handleSelectGroup();
                                              }}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                            />
                                          </div>
                                        </td>
                                        <td>
                                          <div className="table-responsive">
                                            <BootstrapTable
                                              keyField="id"
                                              data={products}
                                              columns={columns}
                                              cellEdit={cellEditFactory({
                                                mode: "click",
                                              })}
                                            />
                                          </div>
                                        </td>
                                        <td>Verfication Pending</td>
                                        <td>
                                          <Button
                                            color="danger"
                                            outline
                                            className="waves-effect waves-light"
                                          >
                                            Remove
                                          </Button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </CardBody>
                              <Button
                                color="danger"
                                className="btn btn-danger waves-effect waves-light"
                              >
                                Save
                              </Button>{" "}
                            </Card>
                          </Col>
                        </Row>
                      )}
                    </TabPane>
                    <TabPane tabId="7" className="p-3">
                      <h3>
                        <i className="uil-document-layout-left"></i>Category
                        Details
                      </h3>
                      <div className="my-4">
                        <button
                          type="button"
                          className="btn btn-info waves-effect waves-light"
                          onClick={() => {
                            tog_backdrop();
                          }}
                          data-toggle="modal"
                        >
                          <i className="uil-focus-add"></i>
                          Add Category
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
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
                                  <CardBody>
                                    <div>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </div>
                                    <CardText>Automotive</CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
                                  <CardBody>
                                    <div>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </div>
                                    <CardText>Manufacturing</CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
                                  <CardBody>
                                    <div>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </div>
                                    <CardText>Agriculture</CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
                                  <CardBody>
                                    <div>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </div>
                                    <CardText>Construction</CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
                                  <CardBody>
                                    <div>
                                      <img
                                        src={avatar4}
                                        className="rounded avatar-md"
                                        alt=""
                                      />
                                    </div>
                                    <CardText>Entertainment</CardText>
                                  </CardBody>
                                </Card>
                              </Col>
                              <Col lg={4}>
                                <Card color="dark" className="text-light">
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
                                <Card color="dark" className="text-light">
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
                              </Col>
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
                            <button type="button" className="btn btn-primary">
                              Main Categories
                            </button>
                          </div>
                        </Modal>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-bordered border-primary mb-0">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                Products &#62; Automotive &#62; Vehicle Sales
                                &#62; New Cars &#62; BMW
                              </th>
                              <td>
                                <Button
                                  color="danger"
                                  outline
                                  className="waves-effect waves-light"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                Products &#62; Automotive &#62; Vehicle Sales
                                &#62; New Cars &#62; BMW
                              </th>
                              <td>
                                <Button
                                  color="danger"
                                  outline
                                  className="waves-effect waves-light"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </TabPane>

                    <TabPane tabId="8" className="p-3">
                      <Row>
                        <Col className="col-12">
                          <Card>
                            <CardBody>
                              <CardTitle>
                                <h3 className="mb-4">
                                  <i className="uil-document-layout-left"></i>
                                  Business Details
                                </h3>
                              </CardTitle>
                              <CardSubtitle className="mb-3">
                                <div>
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        tog_standard();
                                      }}
                                      className="btn btn-primary waves-effect waves-light"
                                      data-toggle="modal"
                                      data-target="#myModal"
                                    >
                                      <i className="uil-focus-add"></i>
                                      Add Business User
                                    </button>

                                    <Modal
                                      isOpen={modal_standard}
                                      toggle={() => {
                                        tog_standard();
                                      }}
                                    >
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title mt-0"
                                          id="myModalLabel"
                                        >
                                          Add Business User
                                        </h5>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setmodal_standard(false);
                                          }}
                                          className="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                        >
                                          <span aria-hidden="true">
                                            &times;
                                          </span>
                                        </button>
                                      </div>
                                      <div className="modal-body">
                                        <AvForm className="needs-validation">
                                          <Row>
                                            <Col md="6">
                                              <FormGroup className="mb-3">
                                                <Label htmlFor="validationCustom01">
                                                  First name
                                                </Label>
                                                <AvField
                                                  name="firstname"
                                                  placeholder="First name"
                                                  type="text"
                                                  errorMessage="Enter First Name"
                                                  className="form-control"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  id="validationCustom01"
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col md="6">
                                              <FormGroup className="mb-3">
                                                <Label htmlFor="validationCustom02">
                                                  Last name
                                                </Label>
                                                <AvField
                                                  name="lastname"
                                                  placeholder="Last name"
                                                  type="text"
                                                  errorMessage="Enter Last name"
                                                  className="form-control"
                                                  validate={{
                                                    required: { value: true },
                                                  }}
                                                  id="validationCustom02"
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col md="6">
                                              <label
                                                htmlFor="example-password-input"
                                                className="col-md-2 col-form-label"
                                              >
                                                Password
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="password"
                                                  defaultValue="hunter2"
                                                />
                                              </div>
                                            </Col>
                                            <Col md="6">
                                              <label
                                                htmlFor="example-password-input"
                                                className="col-md-2 col-form-label"
                                              >
                                                Confirm
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="password"
                                                  defaultValue="hunter2"
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col md="6">
                                              <label
                                                htmlFor="example-tel-input"
                                                className="col-md-2 col-form-label"
                                              >
                                                Mobile
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="tel"
                                                  defaultValue="1-(555)-555-5555"
                                                />
                                              </div>
                                            </Col>
                                            <Col md="6">
                                              <label
                                                htmlFor="example-email-input"
                                                className="col-md-2 col-form-label"
                                              >
                                                Email
                                              </label>
                                              <div>
                                                <input
                                                  className="form-control"
                                                  type="email"
                                                  defaultValue="bootstrap@example.com"
                                                />
                                              </div>
                                            </Col>
                                          </Row>
                                        </AvForm>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            tog_standard();
                                          }}
                                          className="btn btn-secondary waves-effect"
                                          data-dismiss="modal"
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary waves-effect waves-light"
                                        >
                                          Save
                                        </button>
                                      </div>
                                    </Modal>
                                  </div>
                                </div>
                              </CardSubtitle>
                              <MDBDataTable
                                responsive
                                striped
                                bordered
                                data={data6}
                              />
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </TabPane>

                    <TabPane tabId="9" className="p-3">
                      <h3>
                        <i className="uil-document-layout-left"></i>I provide
                        the following Products and Services
                      </h3>
                      <Col xl={4} md={6}>
                        <div className="my-4">
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={() => {
                              tog_scroll();
                            }}
                            data-toggle="modal"
                          >
                            Add Provide Keyword
                          </button>
                        </div>

                        <Modal
                          isOpen={modal_scroll}
                          toggle={() => {
                            tog_scroll();
                          }}
                          scrollable={true}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">
                              Scrollable modal
                            </h5>
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
                          <div className="modal-body">
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Category</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Keywords</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period Type</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Quantity</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Volume</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setmodal_scroll(false)}
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </Col>
                      <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Keyword </th>
                              <th>Period </th>
                              <th>Quantity </th>
                              <th> </th>
                            </tr>
                          </thead>
                          {isEmpty(companyProvidesList) &&
                          IncomingCompanyProvidesLoading && (
                            <Row>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={12}>
                                      <CardBody>
                                        <Spinner
                                          className="m-1"
                                          color="primary"
                                        />
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                          )}
                          {!isEmpty(companyProvidesList) &&
                            companyProvidesList.map((data1, key) => (
                              <tbody>
                                <tr>
                                  <th>
                                    {data1.compPackageId} &#62;{" "}
                                    {data1.provideKeywordId} &#62;{" "}
                                    {data1.volumeTypeId}
                                    &#62; {data1.periodValue} &#62; BMW
                                  </th>
                                  <th>{data1.keywordId}</th>
                                  <th>{data1.periodTypeId}</th>
                                  <th>{data1.quantityTypeId}</th>
                                  <td>
                                    <Button
                                      color="danger"
                                      outline
                                      className="waves-effect waves-light"
                                    >
                                      Remove
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                        </table>
                      </div>
                    </TabPane>
                    <TabPane tabId="10" className="p-3">
                      <AvForm className="needs-validation">
                        <FormGroup className="mb-3">
                          <div className="mb-3">
                            <AvField
                              name="email"
                              label="E-Mail"
                              placeholder="Enter Valid Email"
                              type="email"
                              errorMessage="Invalid Email"
                              validate={{
                                required: { value: true },
                                email: { value: true },
                              }}
                            />
                          </div>
                        </FormGroup>
                      </AvForm>
                    </TabPane>
                    <TabPane tabId="11" className="p-3">
                      <h3>
                        <i className="uil-document-layout-left"></i>I am looking
                        for the following Products and Services.
                      </h3>
                      <Col xl={4} md={6}>
                        <div className="my-4">
                          <button
                            type="button"
                            className="btn btn-primary waves-effect waves-light"
                            onClick={() => {
                              tog_scroll();
                            }}
                            data-toggle="modal"
                          >
                            Add Seek Keyword
                          </button>
                        </div>

                        <Modal
                          isOpen={modal_scroll}
                          toggle={() => {
                            tog_scroll();
                          }}
                          scrollable={true}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0">
                              Scrollable modal
                            </h5>
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
                          <div className="modal-body">
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Category</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Keywords</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Period Type</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Quantity</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                              <Col xl={6}>
                                <div className="mb-3">
                                  <Label>Volume</Label>
                                  <Select
                                    value={selectedGroup}
                                    onChange={() => {
                                      handleSelectGroup();
                                    }}
                                    options={optionGroup}
                                    classNamePrefix="select2-selection"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setmodal_scroll(false)}
                              >
                                Close
                              </button>
                              <button type="button" className="btn btn-primary">
                                Save
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </Col>
                      <div className="table-responsive">
                        <table className="table table-bordered border-primary mb-0">
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Keyword </th>
                              <th>Period </th>
                              <th>Quantity </th>
                              <th> </th>
                            </tr>
                          </thead>
                           {isEmpty(companySeeksList) &&
                          IncomingCompanySeeksLoading && (
                            <Row>
                              <Col>
                                <Card>
                                  <Row className="g-0 align-items-center">
                                    <Col md={12}>
                                      <CardBody>
                                        <Spinner
                                          className="m-1"
                                          color="primary"
                                        />
                                      </CardBody>
                                    </Col>
                                  </Row>
                                </Card>
                              </Col>
                            </Row>
                          )}
                          {!isEmpty(companySeeksList) &&
                          companySeeksList.map((data3, key) => (
                          <tbody>
                            <tr>
                              <th scope="row">
                              <Link>{data3.compPackageId}</Link>
                              </th>
                              <th scope="row">{data3.seekKeywordId}</th>
                              <th scope="row">{data3.periodTypeId}</th>
                              <th scope="row">{data3.quantityTypeId}</th>
                              <td>
                                <Button
                                  color="danger"
                                  outline
                                  className="waves-effect waves-light"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                          ))}
                        </table>
                      </div>
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

export default CompanyProfile;
