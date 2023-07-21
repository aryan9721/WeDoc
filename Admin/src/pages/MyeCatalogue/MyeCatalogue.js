import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Card,
  Alert,
  Col,
  Row,
  Container,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  NavLink,
  NavItem,
  Nav,
  Button,
  TabContent,
  TabPane,
} from "reactstrap";
import { PRODUCT_IMAGE_URL } from "../../common/config";

//SimpleBar
import classnames from "classnames";
import Rating from "react-rating";
import RatingTooltip from "react-rating-tooltip";
//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img2 from "../../assets/images/small/img-2.jpg";
import img3 from "../../assets/images/small/img-3.jpg";
import img6 from "../../assets/images/small/img-6.jpg";
import { mstEFlyerss } from "../../services/graphql";
import { useLazyQuery } from "@apollo/react-hooks";
import {
  addMessage,
  getChats,
  getGroups,
  getMessages,
} from "../../store/actions";

const MyeCatalogue = (props) => {
  const { chats, groups, messages } = props;
  const [def, setdef] = useState("");
  const starStyle = {};
  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [activeTabJustify, setactiveTabJustify] = useState("5");
  const [currentUser, setCurrentUser] = useState({
    name: "Marcus",
    isActive: true,
  });
  const [notification_Menu, setnotification_Menu] = useState(false);
  const [Chat_Box_Username, setChat_Box_Username] = useState("Designer");
  const [curMessage, setcurMessage] = useState("");
  const [eFlyerss, setEFlyerss] = useState([]);
  const [
    fetchEFlyerss,
    { loading: IncomingEFlyerssLoading, data: eFlyerssData },
  ] = useLazyQuery(mstEFlyerss);

  useEffect(() => {
    fetchEFlyerss({
      variables: {
        key: 2,
        keyType: 1,
        page: 1,
        size: 10,
      },
    });
  }, [fetchEFlyerss]);

  useEffect(() => {
    if (eFlyerssData && eFlyerssData.mstEFlyerss) {
      setEFlyerss(eFlyerssData.mstEFlyerss.data);
    }
  }, [eFlyerssData]);
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

  //Use For Reviews Box
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
  const rowData = [
    {
      title: "	BMW 1 Series",
      categoryId: "Product",
      description: "100 Vehicle",
      startDate: "123",
      endDate: "234",
      status: "	Active",
    },
  ];

  let finalList = [];
  const makeDataEFlyerss = (EFlyerss) => {
    EFlyerss.forEach((datum) => {
      finalList.push({
        title: datum.title,
        categoryId: datum.categoryId,
        description: datum.description,
        startDate: datum.startDate,
        endDate: datum.endDate,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let EFlyerss = eFlyerss.length === 0 ? rowData : makeDataEFlyerss(eFlyerss);

  const data = {
    rows: EFlyerss,
  };

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

  function toggleCustomJustified(tab) {
    if (activeTabJustify !== tab) {
      setactiveTabJustify(tab);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="WeDoc"
            breadcrumbItem="Home &#187; Catalogue List"
          />

          <div className="d-lg-flex mb-4">
            <Card className="chat-leftsidebar">
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle>
                      <h4>Your Current Catalogues</h4>
                    </CardTitle>
                    <Row>
                      <Col>
                        <Link
                          to="./addnewcatalogue"
                          className="btn btn-danger my-3"
                        >
                          <i className="uil-plus"></i>
                          Add New Catalogue
                        </Link>
                      </Col>
                    </Row>
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
                          <span className="d-none d-sm-block">All Active</span>
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
                          <span className="d-none d-sm-block">Pending</span>
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
                            <i class="fas fa-plane-slash"></i>
                          </span>
                          <span className="d-none d-sm-block">Cancelled</span>
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
                            <i class="fas fa-times"></i>
                          </span>
                          <span className="d-none d-sm-block">Expired</span>
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTabJustify}>
                      <TabPane tabId="5" className="p-3">
                        <Row>
                          <Col>
                            <Card>
                              {!isEmpty(eFlyerss) &&
                                eFlyerss.map((data, key) => (
                                  <Row className="g-0 align-items-center">
                                    <Col md={4}>
                                      <CardImg
                                        className="img-fluid"
                                        src={PRODUCT_IMAGE_URL}
                                        alt="Card image cap"
                                      />
                                    </Col>
                                    <Col md={8}>
                                      <CardBody>
                                        <CardTitle className="h5">
                                          <Link to="/myecataloguedetail">
                                            {data.title}
                                          </Link>
                                        </CardTitle>

                                        <CardText>{data.description}</CardText>
                                        <CardText>
                                          <Button
                                            color="info"
                                            className="btn-soft-info waves-effect waves-light"
                                          >
                                            Start Date: {data.startDate}
                                          </Button>{" "}
                                          <Button
                                            color="info"
                                            className="btn-soft-info waves-effect waves-light"
                                          >
                                            End Date: {data.endDate}
                                          </Button>{" "}
                                          <Link
                                            to="./editmyecatalogue"
                                            className="btn btn-danger my-3"
                                          >
                                            Edit
                                          </Link>
                                        </CardText>
                                      </CardBody>
                                    </Col>
                                  </Row>
                                ))}
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="6" className="p-3">
                        <Row>
                          <Col md={12}>
                            <Card>
                              <Alert color="primary">
                                No Pending Catalogues to display
                              </Alert>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      <Link>BMW ACCESSORIES CATALOGUE</Link>
                                    </CardTitle>

                                    <CardText>
                                      COMPETENT PARTNERS. Extraordinary products
                                      to meet extraordinary needs. BMW Group
                                      South Africa offers a wide range of
                                      special products and services to business
                                      customers in the corporate, government and
                                      rental markets. Through our Corporate,
                                      Direct and Special Sales, programmes are
                                      also available for diplomats and members
                                      of international organisations, for 5 Star
                                      hotels and airlines, suppliers and
                                      security cars.
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Link
                                        to="./editmyecatalogue"
                                        className="btn btn-danger my-3"
                                      >
                                        Edit
                                      </Link>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="7" className="p-3">
                        <Row>
                          <Col md={12}>
                            <Card>
                              <Alert color="primary">
                                No Cancelled Catalogues to display
                              </Alert>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      <Link>STEPHANIE JOSHUA ATTORNEYS</Link>
                                    </CardTitle>

                                    <CardText>
                                      Unbelievable product that covers all areas
                                      of Air dryers & Air preheaters.
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Link
                                        to="./editmyecatalogue"
                                        className="btn btn-danger my-3"
                                      >
                                        Edit
                                      </Link>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="8" className="p-3">
                        <Row>
                          <Col md={12}>
                            <Card>
                              <Alert color="primary">
                                No Expired Catalogues to display
                              </Alert>
                            </Card>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Card>
                              <Row className="g-0 align-items-center">
                                <Col md={4}>
                                  <CardImg
                                    className="img-fluid"
                                    src={PRODUCT_IMAGE_URL}
                                    alt="Card image cap"
                                  />
                                </Col>
                                <Col md={8}>
                                  <CardBody>
                                    <CardTitle className="h5">
                                      <Link>STEPHANIE JOSHUA ATTORNEYS</Link>
                                    </CardTitle>

                                    <CardText>
                                      Unbelievable product that covers all areas
                                      of Air dryers & Air preheaters.
                                    </CardText>
                                    <CardText>
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Started on 21-May-2015
                                      </Button>{" "}
                                      <Button
                                        color="info"
                                        className="btn-soft-info waves-effect waves-light"
                                      >
                                        Ends on 31-Dec-2021
                                      </Button>{" "}
                                      <Link
                                        to="./editmyecatalogue"
                                        className="btn btn-danger my-3"
                                      >
                                        Edit
                                      </Link>
                                    </CardText>
                                  </CardBody>
                                </Col>
                              </Row>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
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

MyeCatalogue.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyeCatalogue);
