import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Input,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Sidebar from "../../components/VerticalLayout/Sidebar";
import Header from "../../components/VerticalLayout/Header";
import Footer from "../../components/VerticalLayout/Footer";
import img1 from "../../assets/images/small/img-1.jpg";
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditEAdvertisement = (props) => {
  const { REACT_APP_API_ENDPOINT } = process.env;
  const [advertisementList, setAdvertisementList] = useState();
  // Post advertisement from here
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  console.log(localStorage.getItem("jwt"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}/advertisment`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAdvertisementList(result))
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
                title="Edit Advertisement"
                breadcrumbItem="Edit Advertisement"
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
                {advertisementList &&
                  advertisementList.map((index, id) => (
                    <Col mg={6} xl={3} key={id}>
                      <Card>
                        <CardImg
                          top
                          className="img-fluid p-3"
                          src={img1}
                          alt="Card image cap"
                        />
                        <CardBody>
                          <CardTitle className="h4 mt-0">
                            {index ? index.description : null}
                          </CardTitle>
                          <CardTitle className="h4 mt-0">
                            {index ? index.link : null}
                          </CardTitle>
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
                    <p className="mb-sm-0">Page 1 of 97</p>
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
export default EditEAdvertisement;
