import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Media,
  Button,
} from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation";

// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";
import { MDBDataTable } from "mdbreact";
import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { useLazyQuery } from "@apollo/react-hooks";

//import Skeleton from '@material-ui/core/Skeleton';
import { mstCrmQuotes } from "../../services/graphql";

const Quotes = (props) => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [idx, setidx] = useState(1);
  const [mobile, setmobile] = useState("");
  const [isError, setIsError] = useState(false);
  const [userProfileData, setUserProfileData] = useState({});

  const [quotes, setQuotes] = useState([]);

  const [fetchCrmQuotes, { loading: quotesLoading, data: crmQuotesData }] =
    useLazyQuery(mstCrmQuotes);

  useEffect(() => {
    fetchCrmQuotes({
      variables: {
        page: 1,
        size: 10,
      },
    });
  }, [fetchCrmQuotes]);

  useEffect(() => {
    if (crmQuotesData && crmQuotesData.mstCrmQuotes) {
      setQuotes(crmQuotesData.mstCrmQuotes.data);
    }
  }, [crmQuotesData]);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.firstName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.firstName);
        setUserProfileData(obj);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        props.resetProfileFlag();
      }, 3000);
    }
  }, [props.success, props]);

  function handleValidSubmit(event, values) {
    props.editProfile(values);
  }

  const rowData = [
    {
      edit: (
        <Link to="/editquotes">
          <i className="uil-edit"></i>
        </Link>
      ),
      view: (
        <Link to="/viewquotes">
          <i className="uil-eye"></i>
        </Link>
      ),
      GI: (
        <Link to="/generateinvoice">
          <i className="uil-file-blank"></i>
        </Link>
      ),
      quotedate: "07-01-2016",
      quote: "	QUOTE - 00022",
      Customername: "Paul Peter",
      amount: "R 35000",
      vatamount: "	R 4900",
      totalamount: "	R 39900",
    },
  ];
  let finalList = [];

  const makeDataQuotesList = (QuotesListList) => {
    QuotesListList.forEach((datum) => {
      finalList.push({
        edit: (
          <Link to="/editquotes">
            <i className="uil-edit"></i>
          </Link>
        ),
        view: (
          <Link to="/viewquotes">
            <i className="uil-eye"></i>
          </Link>
        ),
        gi: (
          <Link to="/generateinvoice">
            <i className="uil-file-blank"></i>
          </Link>
        ),
        quotedate: datum.quoteDate,
        quote: datum.quoteNo,
        Customerid: datum.customerId,
        amount: datum.amount,
        vatamount: datum.vatamount,
        totalamount: datum.totalAmount,
        status: datum.isActive === true ? "Active" : "InActive",
      });
    });
    return finalList;
  };

  let CustomQuotesList =
    quotes.length === 0 ? rowData : makeDataQuotesList(quotes);

  const data = {
    columns: [
      {
        label: "Edit",
        field: "edit",
        sort: "asc",
        width: 100,
      },
      {
        label: "View",
        field: "view",
        sort: "asc",
        width: 100,
      },
      {
        label: "GI",
        field: "gi",
        sort: "asc",
        width: 100,
      },
      {
        label: "Quotes Date",
        field: "quotedate",
        sort: "asc",
        width: 270,
      },
      {
        label: "Quote",
        field: "quote",
        sort: "asc",
        width: 200,
      },
      {
        label: "Customer ID",
        field: "Customerid",
        sort: "asc",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
        width: 100,
      },
      {
        label: "VAT Amount",
        field: "vatamount",
        sort: "asc",
        width: 100,
      },
      {
        label: "Total Amount",
        field: "totalamount",
        sort: "asc",
        width: 100,
      },
    ],
    rows: CustomQuotesList,
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="WeDoc" breadcrumbItem="Home > CRM > Quotes" />

          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success && props.success ? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <Media className="d-flex">
                    <Media body className="flex-1 align-self-center">
                      <div className="text-muted">
                        <h5>Manage Quotes</h5>
                        {/* <p className="mb-1">{mobile}</p>
                        <p className="mb-1">{email}</p> */}
                      </div>
                    </Media>
                    <div>
                      <Link to="./addquotes" className="btn btn-danger mx-5">
                        <i className="uil-plus"></i>
                        Add New Quotes
                      </Link>
                    </div>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">QUOTE LIST</h4>

          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleValidSubmit(e, v);
                }}
              ></AvForm>
              <MDBDataTable responsive striped bordered data={data} />
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

Quotes.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(Quotes)
);
