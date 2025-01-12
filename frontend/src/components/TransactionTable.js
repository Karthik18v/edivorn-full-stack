import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaFilter, FaSync } from "react-icons/fa";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/transactions"
      );
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  // Filter transactions
  useEffect(() => {
    let filteredData = transactions;

    if (statusFilter) {
      filteredData = filteredData.filter(
        (transaction) =>
          transaction.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((transaction) =>
        transaction.custom_order_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filteredData);
  }, [statusFilter, searchTerm, transactions]);

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Transactions Overview
        </h2>

        {/* Search & Filter Section */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search by Order ID"
              className="outline-none text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow">
            <FaFilter className="text-gray-500 mr-2" />
            <select
              className="outline-none text-gray-700"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <button
            onClick={fetchTransactions}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            <FaSync className="mr-2" />
            Refresh
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Collect ID",
                  "School ID",
                  "Gateway",
                  "Order Amount",
                  "Transaction Amount",
                  "Status",
                  "Custom Order ID",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-5 border-b text-left text-gray-700 font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.collect_id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-5 border-b">
                      {transaction.collect_id}
                    </td>
                    <td className="py-3 px-5 border-b">
                      {transaction.school_id}
                    </td>
                    <td className="py-3 px-5 border-b">
                      {transaction.gateway}
                    </td>
                    <td className="py-3 px-5 border-b">
                      ₹{transaction.order_amount}
                    </td>
                    <td className="py-3 px-5 border-b">
                      ₹{transaction.transaction_amount}
                    </td>
                    <td
                      className={`py-3 px-5 border-b font-bold ${
                        transaction.status === "Success"
                          ? "text-green-600"
                          : transaction.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.status}
                    </td>
                    <td className="py-3 px-5 border-b">
                      {transaction.custom_order_id}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
