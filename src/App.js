import "./App.css";
import { Layout, Typography, Space } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurencies,
  CryptoDetails,
  News,
} from "./components";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/exchanges" element={<Exchanges />}></Route>
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurencies />}
              ></Route>
              <Route
                path="/cryptocurrencies/:coinId"
                element={<CryptoDetails />}
              ></Route>
              <Route path="/news" element={<News />}></Route>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crypto News <br />
            All rights reserverd
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
