import React from "react";
import { Col, Row, Typography } from "antd";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title as Title2,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title2, CategoryScale);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  coinHistory?.data?.history?.map((historyData) => {
    coinPrice.push(historyData?.price);
    coinTimeStamp.push(
      new Date(historyData?.timestamp * 1000).toLocaleDateString()
    );
  });

  console.log(coinTimeStamp);
  console.log(coinPrice);

  const data = {
    labels: coinTimeStamp,
    datasets: {
      label: "Price in USD",
      data: coinPrice,
      fill: false,
      backgroundColor: "#0071bd",
      borderColor: "#0071bd",
    },
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
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
      {/* <Line data={dt} /> */}
      <Line
        datasetIdKey="id"
        data={{
          labels: ["Jun", "Jul", "Aug"],
          datasets: [
            {
              id: 1,
              label: "",
              data: [5, 6, 7],
            },
            {
              id: 2,
              label: "",
              data: [3, 2, 1],
            },
          ],
        }}
      />

      {/* <Line options={options} data={data} /> */}
    </>
  );
};

export default LineChart;
