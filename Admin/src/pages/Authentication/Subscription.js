import React from "react";
import "./Subs.css";
import {
  Col,
  Table,
  Button,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import userProfile from "./user-profile";
function Subscription() {
  return (
    <>
      {/* <div class="container">
    <div class="corporate">
     CORPORATE
    </div>
    <div class="income">
  <h2 class="income-1">R 143,000.00</h2>
  <h1>R150,000.00</h1>
  <h3>PER MONTH</h3>
    </div>
    <div class="feature">
     <p>2 HRS TIME DELAY</p>
     <p>UNLIMITED USERS</p>
     <p>UNLIMITED CATEGORY</p>
     <p>300 REQUESTS</p>
     <p>50 SPECIAL</p>
     <p>50 E-FLYERS</p>
     <p>UNLIMITED SALESLEAD</p>
     <p>100 KEYWORDS</p>
     <p>CRM</p>
     <p>PAYFAST INTEGRATION</p>
    </div>
    
   <button class="button">SUBSCRIBE</button>
    
  </div>
</div> */}

      <div className="services" id="services">
        <h1>SELECT SUBSCRIPTION PLAN</h1>
        <Row>
          <Col>
            <div className="table-respons">
              <Table className="tabled mb-0">
                <thead>
                  <tr>
                    <th className="month-1">1 MONTH</th>
                    <th className="month-3">3 MONTH (5%OFF)</th>
                    <th className="month-6">6 MONTH (10%OFF)</th>
                    <th className="month-9">9 MONTH (15%OFF)</th>
                  </tr>
                </thead>
              </Table>
            </div>
          </Col>
        </Row>
        <div className="services__wrapper">
          <div className="services__card">
            <div className="corporate">CORPORATE</div>
            <div className="income">
              <p className="income-1">R 143,000.00</p>
              <p className="income-2">R150,000.00</p>
              <p className="p3">PER MONTH</p>
            </div>
            <div className="service-feature">
              <p>2 HRS TIME DELAY</p>
              <p>UNLIMITED USERS</p>
              <p>UNLIMITED CATEGORY</p>
              <p>300 REQUESTS</p>
              <p>50 SPECIAL</p>
              <p>50 E-FLYERS</p>
              <p>UNLIMITED SALESLEAD</p>
              <p>100 KEYWORDS</p>
              <p>CRM</p>
              <p>PAYFAST INTEGRATION</p>
            </div>
            <div className="services__btn">
              {/* <Link
                to="#"
                onClick={() => updatePackageByUser(1)}
                className="btn btn-danger waves-effect waves-light"
              >
                Subscribe
              </Link> */}
              <button>Subscribe</button>
            </div>
          </div>
          <div className="services__card">
            <div className="corporate">FRANCHISEE</div>
            <div className="income">
              <p className="income-1">R 25,500.00</p>
              <p className="income-2">R30,000.00</p>
              <p className="p3">PER MONTH</p>
            </div>
            <div className="service-feature">
              <p>3 HRS TIME DELAY</p>
              <p>5 USERS</p>
              <p>UNLIMITED CATEGORY</p>
              <p>200 REQUESTS</p>
              <p>25 SPECIAL</p>
              <p>25 E-FLYERS</p>
              <p>50 SALESLEAD</p>
              <p>50 KEYWORDS</p>
              <p>CRM</p>
              <p>PAYFAST INTEGRATION</p>
            </div>
            <div className="services__btn">
              <button>Subscribe</button>
            </div>
          </div>
          <div className="services__card">
            <div className="corporate-sme">SME</div>
            <div className="income-sme">
              <p className="income-1">R 994.65</p>
              <p className="income-2">R1,047.00</p>
              <p className="p3">PER MONTH</p>
            </div>
            <div className="service-feature">
              <p>4 HRS TIME DELAY</p>
              <p>3 USERS</p>
              <p>3 CATEGORY</p>
              <p>100 REQUESTS</p>
              <p>10 SPECIAL</p>
              <p>10 E-FLYERS</p>
              <p>10 SALESLEAD</p>
              <p>10 KEYWORDS</p>
              <p>CRM</p>
              <p>PAYFAST INTEGRATION</p>
            </div>
            <div className="services__btn-sme">
              <button>Subscribe</button>
            </div>
          </div>
          <div className="services__card">
            <div className="corporate">FREE</div>
            <div className="income-free">
              {/* <p className="income-1">R 143,000.00</p>
              <p className="income-2">R150,000.00</p> */}
              <p className="p3-2">PER MONTH</p>
            </div>
            <div className="service-feature">
              <p>5 HRS TIME DELAY</p>
              <p>1 USERS</p>
              <p>3 CATEGORY</p>
              <p>NO REQUESTS</p>
              <p>NO SPECIAL</p>
              <p>NO E-FLYERS</p>
              <p>NO SALESLEAD</p>
              <p>NO KEYWORDS</p>
              <p>CRM</p>
              <p>PAYFAST INTEGRATION</p>
            </div>
            <div className="services__btn">
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Subscription;
