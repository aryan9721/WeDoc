import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Media,
  Row,
  Form,
  UncontrolledDropdown,
  Button,
  Table,
} from "reactstrap";
import jwt from "jsonwebtoken";

//SimpleBar
import SimpleBar from "simplebar-react";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import avatar4 from "../../assets/images/users/avatar-4.jpg";

import {
  addMessage,
  getChats,
  getGroups,
  getMessages,
} from "../../store/actions";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import {
  getResponseItems,
  getIncomingItemRequestList,
  getItemRequestList,
  createMstItemResponse,
  postMstItemResponse
} from "../../services/graphql";
import { PRODUCT_IMAGE_URL } from "../../common/config";

const Chat = (props) => {
  const { chats, groups, messages } = props;
  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Marcus",
    isActive: true,
  });
  const [notification_Menu, setnotification_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("Designer");
  const [curMessage, setcurMessage] = useState("");
  const [chatRequestData, setChatRequestData] = useState({});
  const [chatData, setChatData] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [requestId, setRequestId] = useState('');
  const [file, setSelectedFile] = useState(null);
  const [itemRequestData, setItemRequestData] = useState({});
  
  const obj = JSON.parse(localStorage.getItem("authUser"));
  const { onGetChats, onGetGroups, onGetMessages } = props;

  const [fetchChatData, { data: chatApiData }] = useLazyQuery(getResponseItems);

  const [fetchRequestData, { data: chatRequestApiData }] = useLazyQuery(
    getItemRequestList
  );
  const [addResponse, { loading: addResponseLoader, data: updateResponseData }] = useMutation(
    postMstItemResponse
  );
  const token = localStorage.getItem("authToken").replace(/^"|"$/g, "");
  var decodeJwt = jwt.decode(token);

  useEffect(() => {
    fetchRequestData({
      variables: {
        itemRequestTitle: null,
        categoryIds: null,
        provinceIds: null,
        cityIds: null,
        suburbIds: null,
        page: 1,
        size: 100,
      },
    });
  }, [fetchChatData, fetchRequestData]);

  useEffect(() => {
    if (chatApiData && chatApiData.getResponseItems) {
      setChatData(chatApiData.getResponseItems);
    }
  }, [chatApiData]);

  useEffect(() => {
    if (chatRequestApiData && chatRequestApiData.getItemRequestList) {
      setChatRequestData(chatRequestApiData.getItemRequestList.result);
      if (chatRequestApiData.getItemRequestList.result.length > 0 ){
        setItemRequestData(chatRequestApiData.getItemRequestList.result[0].itemRequestTitle)
      fetchChatData({
        variables: {
          id: chatRequestApiData.getItemRequestList.result[0].itemRequestID,
        },
      });
    }
    }
  }, [chatRequestApiData]);

  useEffect(() => {
    if (updateResponseData && updateResponseData.postMstItemResponse) {
      document.getElementById('imageUploaded').value='';
    }
  }, [updateResponseData]);

  

  useEffect(() => {
    onGetChats();
    onGetGroups();
    onGetMessages(currentRoomId);
  }, [onGetChats, onGetGroups, onGetMessages, currentRoomId]);

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages, scrollToBottom]);

  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu);
  };

  //Use For Chat Box
  const userChatOpen = (itemRequest) => {
    setRequestId(itemRequest.itemRequestID);
    setItemRequestData(itemRequest);
    fetchChatData({
      variables: {
        id: itemRequest.itemRequestID,
      },
    });
  };
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

  const addMessage = (data) => {
    const date = new Date();
    const responseDate = new Date(
      date.toISOString().split("T")[0] + "T00:00:00.000Z"
    );
    const newData = {
      "comment": curMessage,
      "companyId": decodeJwt.companyId,
      "createdBy": null,
      "createdDate": null,
      "isAccepted": null,
      "isActive": null,
      "isRejected": null,
      "itemRequestId": requestId,
      "itemResponseId":  0,
      "modifiedBy": null,
      "modifiedDate": null,
      "replyToId": data && data.replyToId ? data.replyToId : 0,
      "responseDate": responseDate,
      "userId": null,
      "replyTo": null,
      "mapItemResponseUpload": [],
    }
    setChatData(chatData => [...chatData, newData]);
    
    addResponse({variables:{
      mstItemResponse:{
        comment: curMessage,
        companyId: Number(decodeJwt.companyId),
        createdBy: null,
        createdDate: null,
        isAccepted: null,
        isActive: null,
        isRejected: null,
        itemRequestId: requestId,
        itemResponseId:  0,
        modifiedBy: null,
        modifiedDate: null,
        replyToId: data && data.replyToId ? data.replyToId : 0,
        responseDate: responseDate,
        userId: null
      },
      file :{ file }
    }})
  };

  const onKeyPress = (e, data) => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurMessage(value);
      addMessage(data);
    }
  };

  const fetchRequest = (title) => {
    fetchRequestData({
      variables: {
        itemRequestTitle: title,
        categoryIds: null,
        provinceIds: null,
        cityIds: null,
        suburbIds: null,
        page: 1,
        size: 10,
      },
    });
  };

  const searchItemRequest = (e, data) => {
    const { key } = e;

    if (key === "Enter") {
      fetchRequest(data);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="WeDoc" breadcrumbItem="Chat" />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <div className="p-3 px-4">
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 align-self-center me-3">
                    <img
                      src={`${PRODUCT_IMAGE_URL}${obj.userProfileImage}`}
                      className="avatar-xs rounded-circle"
                      alt=""
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="font-size-16 mt-0 mb-1">
                      <Link to="#" className="text-dark">
                        {obj.firstName}{" "}{obj.lastName}
                        <i className="mdi mdi-circle text-success align-middle font-size-10 ms-1"></i>
                      </Link>
                    </h5>
                    <p className="text-muted mb-0">Available</p>
                  </div>

                  <div>
                    <Dropdown
                      isOpen={notification_Menu}
                      toggle={toggleNotification}
                      className="chat-noti-dropdown"
                    >
                      <DropdownToggle className="btn py-0" tag="button">
                        <i className="uil uil-ellipsis-h"></i>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Profile</DropdownItem>
                        <DropdownItem href="#">Edit</DropdownItem>
                        <DropdownItem href="#">Add Contact</DropdownItem>
                        <DropdownItem href="#">Setting</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <div className="search-box chat-search-box">
                  <div className="position-relative">
                    <Input
                      type="text"
                      value={searchTitle}
                      className="form-control bg-light border-light rounded"
                      placeholder="Search..."
                      onKeyUp={(e) => searchItemRequest(e, searchTitle)}
                      onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <i className="uil uil-search search-icon"></i>
                  </div>
                </div>
              </div>
              <div className="pb-3">
                <SimpleBar style={{ height: "470px" }} data-simplebar>
                  <div className="p-4 border-top">
                    <div>
                      <h5 className="font-size-16 mb-3">
                        <i className="uil uil-user me-1"></i> New Item Request
                      </h5>
                      <ul className="list-unstyled chat-list">
                        {map(chatRequestData, (chatRequestData) => (
                          <li
                            key={
                              chatRequestData.itemRequestID +
                              chatRequestData.itemRequestStatus
                            }
                            className={
                              currentRoomId === chatRequestData.itemRequestID
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to="#"
                              onClick={() => {
                                userChatOpen(chatRequestData);
                              }}
                            >
                              <Media className="d-flex">
                                <Media className="flex-1 overflow-hidden" body>
                                  <h5 className="text-truncate font-size-14 mb-1">
                                    {chatRequestData.itemRequestTitle}
                                  </h5>
                                  <p className="text-truncate mb-0">
                                    {chatRequestData.itemRequestDescription}
                                  </p>
                                </Media>
                                <div className="font-size-11">
                                  {chatRequestData.itemRequestDate}
                                </div>
                              </Media>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SimpleBar>
              </div>
            </Card>

            <div className="w-100 user-chat mt-4 mt-sm-0 ms-lg-1">
              <Card>
                <div className="p-3 px-lg-4 border-bottom">
                  <Row>
                    <Col md="4" className="col-6">
                      <h5 className="font-size-16 mb-1 text-truncate">
                        <Link to="#" className="text-dark">
                          Responses
                        </Link>
                      </h5>
                      <p className="text-muted text-truncate mb-0">
                         {itemRequestData.itemRequestTitle}
                      </p>
                      <p className="text-muted text-truncate mb-0">
                        <i className="uil uil-users-alt me-1"></i> {chatRequestData.length+' Item Request'}
                      </p>
                    </Col>
                    <Col md="8" className="col-6">
                      <ul className="list-inline user-chat-nav text-end mb-0">
                        <li className="list-inline-item">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn nav-btn"
                              tag="button"
                            >
                              <i className="uil uil-search"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end dropdown-menu-md">
                              <Form className="p-2">
                                <div>
                                  <Input
                                    type="text"
                                    className="form-control rounded"
                                    placeholder="Search..."
                                  />
                                </div>
                              </Form>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                        <li className="list-inline-item">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn nav-btn"
                              tag="button"
                            >
                              <i className="uil uil-ellipsis-h"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem href="#">Profile</DropdownItem>
                              <DropdownItem href="#">Archive</DropdownItem>
                              <DropdownItem href="#">Muted</DropdownItem>
                              <DropdownItem href="#">Delete</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>

                <div className="px-lg-2">
                  <div className="chat-conversation p-3">
                    <PerfectScrollbar
                      style={{ height: "455px" }}
                      className="list-unstyled mb-0"
                      containerRef={(ref) => setMessageBox(ref)}
                    >
                      <li className="chat-day-title">
                        <div className="title">Today</div>
                      </li>
                      {chatData &&
                        map(chatData, (chatData) => (
                          <li
                            key={"test_k" + chatData.itemResponseId}
                            className={
                              chatData.companyId === decodeJwt[3] ? "right" : ""
                            }
                          >
                            <div className="conversation-list">
                              <div className="ctext-wrap">
                                <div className="ctext-wrap-content">
                                  <h5 className="font-size-14 conversation-name">
                                   
                                    <Link to="#" className="text-dark">
                                      {chatData.sender}
                                    </Link>
                                    {chatData.mapItemResponseUpload.map((product, key) => (
                                    <img
                                        src={`${PRODUCT_IMAGE_URL}${product.uploadPath}`}
                                        alt={product.documentName}
                                        className="img-fluid mx-auto d-block"
                                      />
                                    ))}
                                    <span className="d-inline-block font-size-12 text-muted ms-2">
                                      {moment(chatData.responseDate).format(
                                        "hh:mm"
                                      )}
                                    </span>
                                  </h5>
                                  <p className="mb-0">{chatData.comment}</p>
                                </div>
                           { chatData.replyTo !== null && (

                                <li
                            className={
                              chatData.companyId === decodeJwt[3] ? "right" : ""
                            }
                          >
                            <div className="conversation-list">
                              <div className="ctext-wrap">
                                <div className="ctext-wrap-content">
                                  <h5 className="font-size-14 conversation-name">
                                    <Link to="#" className="text-dark">
                                    </Link>
                                    <span className="d-inline-block font-size-12 text-muted ms-2">
                                      {moment(chatData.replyTo.responseDate).format(
                                        "hh:mm"
                                      )}
                                    </span>
                                  </h5>
                                  <p className="mb-0">{chatData.replyTo.comment}</p>
                                </div>
                                </div>
                                </div>
                            </li>
                           )}
                                <UncontrolledDropdown className="align-self-start">
                                  <DropdownToggle href="#" tag="a">
                                    <i className="uil uil-ellipsis-v"></i>
                                  </DropdownToggle>
                                  <DropdownMenu direction="right">
                                    <DropdownItem href="#">Copy</DropdownItem>
                                    <DropdownItem href="#">Save</DropdownItem>
                                    <DropdownItem href="#">
                                      Forward
                                    </DropdownItem>
                                    <DropdownItem href="#">Delete</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                            </div>
                          </li>
                          
                         
                        ))}
                    </PerfectScrollbar>
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
                  </div>
                </div>
                <div className="p-3 chat-input-section">
                  <Row>
                    <div className="col-auto">
                      <input 
                      type="file" 
                      className="form-control" 
                      id="imageUploaded" 
                      multiple
                      onChange={(e) => setSelectedFileformat(e.target.files)}
                      />

                      {/* <Button
                        type="file"
                        color="primary"
                        className="chat-send form-control waves-effect waves-light"
                        id="resume"
                        onClick={() =>
                          addMessage(
                            chatData.itemRequestId,
                            currentUser.itemResponseId
                          )
                        }
                      >
                        <i className="mdi mdi-link-variant"></i>
                      </Button> */}
                    </div>

                    <div className="col">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control chat-input rounded"
                          value={curMessage}
                          onKeyPress={(e) => onKeyPress(e, chatData[chatData.length - 1])}
                          onChange={(e) => setcurMessage(e.target.value)}
                          placeholder="Enter Message..."
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <Button
                        type="submit"
                        color="primary"
                        disabled={addResponseLoader}
                        className="chat-send w-md waves-effect waves-light"
                        onClick={() =>
                          addMessage(chatData[chatData.length - 1])
                        }
                      >
                        <span className="d-none d-sm-inline-block me-2">
                          Send
                        </span>{" "}
                        <i className="mdi mdi-send float-end"></i>
                      </Button>
                    </div>
                  </Row>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

const mapStateToProps = ({ chat }) => ({
  chats: chat.chats,
  groups: chat.groups,
  messages: chat.messages,
});

const mapDispatchToProps = (dispatch) => ({
  onGetChats: () => dispatch(getChats()),
  onGetGroups: () => dispatch(getGroups()),
  onGetMessages: (roomId) => dispatch(getMessages(roomId)),
  onAddMessage: (roomId) => dispatch(addMessage(roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
