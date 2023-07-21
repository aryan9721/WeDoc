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
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ButtonDropdown,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
} from "reactstrap";

//SimpleBar
import SimpleBar from "simplebar-react";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img6 from "../../assets/images/small/img-6.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import Select from "react-select";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  addMessage,
  getChats,
  getGroups,
  getMessages,
} from "../../store/actions";
import { useLazyQuery } from "@apollo/react-hooks";
//import Skeleton from '@material-ui/core/Skeleton';
import { getItemRequestList } from "../../services/graphql";
import { PRODUCT_IMAGE_URL } from "../../common/config";

const MyRequest = (props) => {
  const { chats, groups, messages } = props;
  const [messageBox, setMessageBox] = useState(null);
  const [selectedGroup, setselectedGroup] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [drp_info1, setDrp_info1] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Marcus",
    isActive: true,
  });
  const [notification_Menu, setnotification_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("Designer");
  const [curMessage, setcurMessage] = useState("");

  const [itemRequestList, setItemRequestList] = useState([]);

  const [fetchItemRequestListData, { data: itemRequestListData }] =
    useLazyQuery(getItemRequestList);

  useEffect(() => {
    fetchItemRequestListData({
      variables: {
        itemRequestTitle: null,
        categoryIds: null,
        provinceIds: null,
        cityIds: null,
        suburbIds: null,
        page: 1,
        size: 10,
      },
    });
  }, [fetchItemRequestListData]);

  useEffect(() => {
    if (itemRequestListData && itemRequestListData.getItemRequestList) {
      setItemRequestList(itemRequestListData.getItemRequestList.result);
    }
  }, [itemRequestListData]);

  const optionGroup = [
    {
      label: "Picnic",
      options: [
        { label: "Mustard", value: "Mustard" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
    {
      label: "Camping",
      options: [
        { label: "Tent", value: "Tent" },
        { label: "Flashlight", value: "Flashlight" },
        { label: "Toilet Paper", value: "Toilet Paper" },
      ],
    },
  ];

  const optionGroup1 = [
    {
      label: "Picnic",
      options: [
        { label: "Eastern Cape", value: "Eastern Cape" },
        { label: "Ketchup", value: "Ketchup" },
        { label: "Relish", value: "Relish" },
      ],
    },
    {
      label: "Camping",
      options: [
        { label: "Tent", value: "Tent" },
        { label: "Flashlight", value: "Flashlight" },
        { label: "Toilet Paper", value: "Toilet Paper" },
      ],
    },
  ];

  const { onGetChats, onGetGroups, onGetMessages } = props;

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

  //Use For MyRequest Box
  const userChatOpen = (id, name, status, roomId) => {
    const { onGetMessages } = props;
    setChat_Box_Username(name);
    setCurrentRoomId(roomId);
    onGetMessages(roomId);
  };

  const addMessage = (roomId, sender) => {
    const { onAddMessage } = props;
    const message = {
      id: Math.floor(Math.random() * 100),
      roomId,
      sender,
      message: curMessage,
      createdAt: new Date(),
    };
    setcurMessage("");
    onAddMessage(message);
  };

  const onKeyPress = (e) => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
    }
  };

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="WeDoc"
            breadcrumbItem="Home &#187; MyRequest List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>MyRequest</h4>
                    </CardTitle>
                    <Row>
                      <Col>
                        <div className="btn-block me-1 my-3">
                          <ButtonDropdown
                            isOpen={drp_info1}
                            toggle={() => setDrp_info1(!drp_info1)}
                          >
                            <Button id="caret" color="info">
                              <i className="uil-search"></i>
                              SEARCH FILTERS
                            </Button>
                            <DropdownToggle
                              caret
                              color="info"
                              className="dropdown-toggle-split"
                            >
                              <i className="mdi mdi-chevron-down" />
                            </DropdownToggle>
                            <DropdownMenu>
                              <AvForm className="needs-validation">
                                <Row className="my-1 mx-3">
                                  <label htmlFor="example-search-input">
                                    Search
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="search"
                                      defaultValue="How do I shoot web"
                                    />
                                  </div>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>status</Label>
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
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Select Category</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Province</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>City</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <div className="my-2 mx-3">
                                      <Label>Suburb</Label>
                                      <Select
                                        value={selectedGroup}
                                        onChange={() => {
                                          handleSelectGroup();
                                        }}
                                        options={optionGroup1}
                                        classNamePrefix="select2-selection"
                                      />
                                    </div>
                                  </Col>
                                </Row>

                                <Button
                                  className="my-2 mx-3"
                                  color="primary"
                                  type="submit"
                                >
                                  SEARCH
                                </Button>
                              </AvForm>
                            </DropdownMenu>
                          </ButtonDropdown>
                        </div>{" "}
                      </Col>
                    </Row>
                    {itemRequestList.map((item, index) => (
                      <Row className="g-0 align-items-center">
                        <Col md={4}>
                          <CardImg
                            className="img-fluid"
                            src={
                              //   item.itemImagePath === null
                              //     ? img2
                              //     : PRODUCT_IMAGE_URL + item.itemImagePath
                              //
                              PRODUCT_IMAGE_URL
                            }
                            alt="Card image cap"
                          />
                        </Col>
                        <Col md={8}>
                          <CardBody>
                            <CardTitle className="h5">
                              <Link to="/RequestDetail">
                                {item.itemRequestTitle}
                              </Link>
                            </CardTitle>
                            <CardText className="h4">
                              {item.itemCategory}
                            </CardText>
                            <CardText>
                              Status: {item.itemRequestStatus}
                            </CardText>
                            <CardText>{item.itemRequestDescription}</CardText>
                            <CardText>
                              <Button
                                color="info"
                                className="btn-soft-info waves-effect waves-light mb-1"
                              >
                                {item.itemRequestDate}
                              </Button>{" "}
                            </CardText>
                          </CardBody>
                        </Col>
                      </Row>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Card>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

MyRequest.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyRequest);
