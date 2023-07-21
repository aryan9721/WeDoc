import React from "react";
import { Container, Row, Col, CardBody, Card } from "reactstrap";

//Import Components
import MiniWidget from "../../pages/Dashboard/mini-widget";

const series2 = [70];

const options2 = {
  fill: {
    colors: ["#34c38f"],
  },
  chart: {
    sparkline: {
      enabled: !0,
    },
  },
  dataLabels: {
    enabled: !1,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 10,
        size: "60%",
      },
      track: {
        margin: 0,
      },
      dataLabels: {
        show: !1,
      },
    },
  },
};

const ProfilePercentage = () => {
  const reports = [
    {
      id: 2,
      charttype: "radialBar",
      chartheight: 45,
      chartwidth: 45,
      series: series2,
      options: options2,
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="metismenu list-unstyled menu-title">
            Profile Progress
            <MiniWidget reports={reports} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProfilePercentage;
