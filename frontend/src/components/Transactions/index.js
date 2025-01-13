import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import "./index.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchSchoolId, setSearchSchoolId] = useState("");
  const [searchGateWay, setSearchGateWay] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  useEffect(() => {
    fetchTransactions();
  });

  const fetchTransactions = async () => {
    const url = `https://edviron-backend-1tcd.onrender.com/api/transactions?school_id=${searchSchoolId}&gateway=${searchGateWay}&status=${searchStatus}`
    console.log(url);
    const response = await axios.get(url);
    setTransactions(response.data);
    console.log(response);
  };

  const onClickFilter = () => {
    setSearchGateWay("");
    setSearchSchoolId("");
    setSearchStatus("");
  };

  console.log(searchGateWay);
  console.log(searchSchoolId);
  console.log(searchStatus);

  return (
    <div className="transactions">
      <Header />
      <div>
        <h2>Transaction Overview</h2>
        <div className="filter-container">
          <div>
            <label>School Id: </label>
            <input
              type="text"
              placeholder="school_id"
              onChange={(e) => setSearchSchoolId(e.target.value)}
            />
          </div>
          <div>
            <label>Gateway: </label>
            <select
              value={searchGateWay}
              onChange={(e) => setSearchGateWay(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="PHONEPE">PHONEPE</option>
              <option value="CASHFREE">CASHFREE</option>
            </select>
          </div>
          <div>
            <label>Status: </label>
            <select
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">ALL</option>
              <option value="SUCCESS">SUCCESS</option>
              <option value="PENDING">PENDING</option>
              <option value="FAILURE">FAILURE</option>
            </select>
          </div>
          <div className="button-container">
            <button onClick={onClickFilter}>Clear Filter</button>
          </div>
        </div>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Collect ID</th>
              <th>School ID</th>
              <th>Gateway</th>
              <th>Order Amount</th>
              <th>Transaction Amount</th>
              <th>Status</th>
              <th>Custom Order ID</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.collect_id}</td>
                <td>{transaction.school_id}</td>
                <td>{transaction.gateway}</td>
                <td>{transaction.order_amount}</td>
                <td>{transaction.transaction_amount}</td>
                <td>{transaction.status}</td>
                <td>{transaction.custom_order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
