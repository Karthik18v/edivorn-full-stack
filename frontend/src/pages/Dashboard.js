import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "../components/TransactionTable";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const url = "http://localhost:4000/api/transactions";
      try {
        const response = await axios.get(url);

        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Transaction Overview</h1>
      <TransactionTable  />
    </div>
  );
};

export default Dashboard;
