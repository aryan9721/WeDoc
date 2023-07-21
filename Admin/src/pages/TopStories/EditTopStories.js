import React, { useState, useEffect } from "react";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Input,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// import images
import img3 from "../../assets/images/small/img-3.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
const EditTopStories = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [story, setStory] = useState();
  var myHeaders = new Headers();
  const jwt = localStorage.getItem("jwt");
  console.log(localStorage.getItem("jwt"));
  myHeaders.append("x-api-key", jwt);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/stories`, requestOptions)
      .then((response) => response.json())
      .then((result) => setStory(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container fluid={true} className="p-3">
              <Header />
              <Breadcrumbs
                title="Edit Top Stories"
                breadcrumbItem="Edit Top Stories"
              />
              <Row>
                <Col lg={12}>
                  <div className="form-inline">
                    <div className="search-box ml-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="orm-control bg-light border-light rounded"
                          placeholder="Search..."
                        />
                        <i className="mdi mdi-magnify search-icon"></i>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                {story &&
                  story.map((story, id) => (
                    <Col key={id} mg={6} xl={3}>
                      <Card>
                        <CardImg
                          top
                          className="img-fluid p-3"
                          src={img3}
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardTitle className="h4 mt-0">
                            {story ? story.title : null}
                          </CardTitle>
                          <CardSubtitle className="h6 mt-0">
                            {story ? story.description : null}
                          </CardSubtitle>
                          <CardText>
                            Updated on <b>21/12/22 & 16:25 PM</b>
                          </CardText>
                          <Link
                            to="#"
                            className="btn btn-primary waves-effect waves-light"
                          >
                            Edit
                          </Link>{" "}
                          <Link
                            to="#"
                            className="btn btn-primary waves-effect waves-light float-md-end"
                          >
                            Delete
                          </Link>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>

              <Row>
                <Col sm="6">
                  <div>
                    <p className="mb-sm-0">
                      {/* can see on the ecommerce page */}
                      {/* Page {productsData.currentPage} of {productsData.totalPages} */}
                      Page 1 of 97
                    </p>
                  </div>
                </Col>
                <Col sm="6">
                  <div className="float-sm-end">
                    <Pagination className="pagination pagination-rounded mb-sm-0">
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Footer />
      </div>
    </React.Fragment>
  );
};
export default EditTopStories;
