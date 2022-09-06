import React from "react";
import { Col, Row, Typography } from "antd";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title as Title2,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title2,
  CategoryScale,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  coinHistory?.data?.history?.map((historyData, index) => {
    coinPrice.push(historyData?.price);
    coinTimeStamp.push(
      new Date(historyData?.timestamp * 1000).toLocaleDateString()
    );
    // }
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: coinName + " Price in USD",
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title className="chart-title" level={2}>
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line
        options={options}
        datasetIdKey="id"
        data={{
          labels: coinTimeStamp,
          datasets: [
            {
              id: 1,
              label: "",
              data: coinPrice,
              backgroundColor: "#0071bd",
              borderColor: "#0071bd",
            },
          ],
        }}
      />
    </>
  );
};

export default LineChart;
