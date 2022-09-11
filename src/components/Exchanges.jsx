import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import { useGetCoinExchangesQuery } from "../services/cryptoCoinsApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetCoinExchangesQuery();
  const exchangeList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Markets</Col>
      </Row>
      <Row>
        {exchangeList.map((exchanges, index) => (
          <Col span={24} key={index}>
            <Collapse>
              <Panel
                showArrow={false}
                header={
                  <Row>
                    <Col span={8}>
                      <Text>
                        <strong>{exchanges.rank}</strong>
                      </Text>
                      <Avatar
                        className="exchange-image"
                        src={exchanges.iconUrl}
                      />
                      <Text>
                        <strong>{exchanges.name}</strong>
                      </Text>
                    </Col>
                    <Col span={8}>
                      ${millify(parseFloat(exchanges?.["24hVolume"]))}
                    </Col>
                    <Col span={8}>
                      ${millify(parseFloat(exchanges.numberOfMarkets))}
                    </Col>
                  </Row>
                }
              >
                <Text>
                  <strong>{exchanges.name}</strong>
                </Text>
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
