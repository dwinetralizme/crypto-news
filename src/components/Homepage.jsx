import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCoinsQuery } from "../services/cryptoCoinsApi";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCoinsQuery();
  const globalStats = data?.data.stats;
  const coins = data?.data.coins;

  const key = process.env.REACT_APP_RAPID_KEY;
  // console.log(globalStats);
  // console.log(coins);
  console.log(key);

  if (isFetching) return "Loading...";
  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title='Total Cryptocurrencies'
            value={millify(globalStats.totalCoins)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(Number(globalStats.totalMarketCap))}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(Number(globalStats.total24hVolume))}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'></Title>
      </div>
    </>
  );
};

export default Homepage;
