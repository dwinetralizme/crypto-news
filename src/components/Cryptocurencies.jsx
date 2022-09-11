import { React, useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCoinsQuery } from "../services/cryptoCoinsApi";

const Cryptocurencies = ({ simplified }) => {
  const count = simplified ? 10 : 30;
  const { data: cryptoList, isFetching } = useGetCoinsQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter(
      (coin) =>
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search coins"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/cryptocurrencies/${currency.uuid}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Dayly Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurencies;
