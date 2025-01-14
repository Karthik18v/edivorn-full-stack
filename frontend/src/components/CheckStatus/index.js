import { useState } from "react";
import Header from "../Header";
import "./index.css";
import axios from "axios";

const CheckStatus = () => {
  const [query, setQuery] = useState("");
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(true);

  const SubmitQuery = async () => {
    const url = `https://edviron-backend-1tcd.onrender.com/api/transactions/check?custom_order_id=${query}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      setStatement(response.data[0]);
      setLoading(false);
    }
    console.log(response);
  };

  const onClickBackButton = () => {
    setQuery("");
    setLoading(true);
  };
  console.log(statement);

  return (
    <div>
      <Header />
      <div className="check-status-container">
        <h1>Check Status</h1>
        <div className="main-container">
          <input
            type="text"
            placeholder="Enter custom_order_id EX: test1..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button className="search-button" type="button" onClick={SubmitQuery}>
            Search
          </button>
        </div>
        {!loading && (
          <div className="payment-container">
            <div className="payment-card">
              <h2>Payment Statement</h2>
              <p>
                <strong>Transaction ID:</strong>
                {statement.collect_id}
              </p>
              <p>
                <strong>Amount:</strong> {statement.order_amount}
              </p>
              <p>
                <strong>School Id:</strong> {statement.school_id}
              </p>
              <p>
                <strong>custom_order_id:</strong> {statement.custom_order_id}
              </p>
              <p>
                <strong>Status:</strong> {statement.status}
              </p>
              <button className="back-button" onClick={onClickBackButton}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
