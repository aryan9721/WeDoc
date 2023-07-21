import React, { useState, useEffect } from "react";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Table,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  Button,
  Modal,
  CardText,
  TabContent,
  TabPane,
} from "reactstrap";
import Select from "react-select";
import { isEmpty } from "lodash";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { postMstItemRequest, getMstCategoryMain, getProvince, getCity, getSuburb } from "../.././services/graphql";
import { PRODUCT_IMAGE_URL } from "../../common/config";
import Chat from "../Chat/Chat";
import jwt from "jsonwebtoken";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const SendRequest = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [activeTabVartical, setoggleTabVertical] = useState(1);
  const [textareabadge, settextareabadge] = useState(0);
  const [textcount, settextcount] = useState(0);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [categoryMain, setCategoryMain] = useState([]);
  const { addToast } = useToasts();
  //form Data
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDetail, setRequestDetail] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [suburbId, setSuburbId] = useState(null);
  const [provinceData, setProvinceData] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [suburb, setSuburb] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectedfile, setSelectedFile] = useState([]);

  const [itemRequest, { loading: itemRequestLoading, data: itemRequestData }] =
    useMutation(postMstItemRequest);

    const [fetchCategoryMain, { data: categoryMainData }] =
    useLazyQuery(getMstCategoryMain);

     const [
    fetchProvinceData,
    { loading: ProvinceData, data: provinceDataResult },
  ] = useLazyQuery(getProvince);
  const [fetchCityData, { loading: cityListLoader, data: cityListData }] =
    useLazyQuery(getCity);
  const [FetchSuburb, { loading: getSuburbLoader, data: getSuburbData }] =
    useLazyQuery(getSuburb);

  
    useEffect(() => {
      fetchCategoryMain();
      fetchProvinceData();
      fetchCityData();
      FetchSuburb();
    }, [fetchCategoryMain, fetchProvinceData, fetchProvinceData, FetchSuburb]);
    
  useEffect(() => {
    if (itemRequestData && itemRequestData.postMstItemRequest) {
      if (itemRequestData.postMstItemRequest.success===true) {
        addToast(itemRequestData.message, { appearance: 'success', autoDismiss: true});
        setRequestTitle('');
        setRequestDetail('');
        setCategoryId(null);
        setSuburbId(null);
        setProvinceId("");
        setCityId("");
        setSelectedFile(null);
        setactiveTab(1)
        
      }
    }
  }, [itemRequestData]);

  useEffect(() => {
    if (categoryMainData && categoryMainData.getMstCategoryMain) {
      const catMainData = categoryMainData.getMstCategoryMain.result || [];
      setCategoryMain(catMainData);
    }
  }, [categoryMainData]);

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

  const requestDataSubmit = () => {
    const date = new Date();
    const dateFormated = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
    var decodeJwt = jwt.decode(token);
    if(requestTitle === "" )
    {
      addToast('Request title not empty', { appearance: 'error', autoDismiss: true});
      return;
    }
    if(requestDetail === "" )
    {
      addToast('Request Detail not empty', { appearance: 'error', autoDismiss: true});
      return;
    }
    if(categoryId === null )
    {
      addToast('category not selected', { appearance: 'error', autoDismiss: true});
      return;
    }
    if(suburbId === null )
    {
      addToast('suburb not selected', { appearance: 'error', autoDismiss: true});
      return;
    }
    
    itemRequest({
      variables: {
        mstItemRequest: {
          itemRequestTitle:requestTitle,
          categoryId: categoryId,
          itemRequestDescription: requestDetail,
          itemRequestDate: dateFormated,
          suburbId: suburbId,
          requestApprovedMail: false,
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
const selectCategory = (item) =>{
  setCategoryId(item.categoryId);
  setmodal_backdrop(false);
  addToast('Category added successfully', { appearance: 'success', autoDismiss: true});
}
  function toggleTabVertical(tab) {
    if (activeTabVartical !== tab) {
      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab);
      }
    }
  }

  function textareachange(event) {
    const count = event.target.value.length;
    if (count > 0) {
      settextareabadge(true);
    } else {
      settextareabadge(false);
    }
    setRequestDetail(event.target.value);
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
   const [preview, setPreview] = useState({imgSrc: null})
   const setSelectedFileformat =(file)=>{
     setSelectedFile(file)
     const promiseArr = []
     for (let i = 0; i < file.length; i++) {
       if (file.size > 20 * 1024 * 1024) {
         alert(`Image ${file.name} size cannot be more than 20mb.`)
         break
       }
       promiseArr.push(
         new Promise((resolve, reject) => {
           const reader = new FileReader()
           reader.readAsDataURL(file[i])
           reader.onload = async () => {
             resolve(reader.result)
           }
           reader.onerror = (e) => reject(e)
         }),
       )
     }
     Promise.all(promiseArr).then((result) => {
      setPreview({
         ...preview,
         imgSrc: preview.imgSrc
           ? [...preview.imgSrc, ...result]
           : [...result],
       })
     })

   }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Forms"
            breadcrumbItem="Home &#187; Request an Item"
          />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <h4 className="card-title mb-4">Request an Item</h4>
                    <div className="wizard clearfix">
                      <div className="steps clearfix">
                        <ul>
                          <NavItem
                            className={classnames({ current: activeTab === 1 })}
                          >
                            <NavLink
                              className={classnames({
                                current: activeTab === 1,
                              })}
                              onClick={() => {
                                setactiveTab(1);
                              }}
                            >
                              <span className="number">
                                <i className="uil-pen"></i>
                              </span>{" "}
                              Request Details
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 2 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 2,
                              })}
                              onClick={() => {
                                setactiveTab(2);
                              }}
                            >
                              <span className="number me-2">
                                <i className="uil-list-ul"></i>
                              </span>{" "}
                              Category
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 3 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 3,
                              })}
                              onClick={() => {
                                setactiveTab(3);
                              }}
                            >
                              <span className="number">
                                <i className="uil-map"></i>
                              </span>{" "}
                              Area Details
                            </NavLink>
                          </NavItem>
                          <NavItem
                            className={classnames({ current: activeTab === 4 })}
                          >
                            <NavLink
                              className={classnames({
                                active: activeTab === 4,
                              })}
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
                                        value={ requestTitle }
                                        required={true}
                                        onChange={(e) => setRequestTitle(e.target.value)}
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
                                        value={requestDetail}
                                        onChange={(e) => {
                                          textareachange(e);
                                        }}
                                        maxLength="225"
                                        rows="7"
                                        placeholder="This Description has a limit of 400 chars."
                                      />
                                     
                                        <span className="badgecount badge badge-success">bfhewgfhewgfhjewfewhfewhf
                                          {" "}
                                          {textcount} / 400{" "}
                                        </span>
                                    </div>
                                  </Col>
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
                                              <Col key={'cat'+index} lg={4}>
                                                <Card
                                                  color={categoryId === item.categoryId ? "dark" : "light"}
                                                  onClick={() => selectCategory(item)}
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
                                  </Row>
                                  <Row>
                                    <Col>
                                    <div className="mb-3">
                                    <Label>getCity</Label>
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
                                    <Col>
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
                                    multiple
                                    onChange={(e) => setSelectedFileformat(e.target.files)}
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
                                  {preview.imgSrc?.map((image, index) => (
                                  <tr  key ={index}>
                                      <td><img className="rounded avatar-lg" alt="" src={image}/></td>
                                    </tr>
                                  ))}
                                  </tbody>
                                </Table>
                              </div>
                              <Button
                                color="primary"
                                disabled={itemRequestLoading}
                                onClick={()=> requestDataSubmit()}
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
                            className={
                              activeTab === 4 ? "next disabled" : "next"
                            }
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
            <Row>
              <Col>
              <Chat />
              </Col>
            </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SendRequest;
