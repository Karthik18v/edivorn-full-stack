import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import axios from "axios";
import Header from "../Header";

import "./index.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSuccess, setTotalSuccess] = useState(0);
  const [totalFailure, setTotalFailure] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const url = `https://edviron-backend-1tcd.onrender.com/api/transactions`;

    const response = await axios.get(url);
    console.log(response);
    setData(response.data);

    if (response.status === 200) {
      setTotalSuccess(
        response.data
          .filter((each) => each.status === "SUCCESS")
          .reduce((acc, val) => acc + val.order_amount, 0)
      );
      setTotalFailure(
        response.data
          .filter((each) => each.status === "FAILURE")
          .reduce((acc, val) => acc + val.order_amount, 0)
      );
      setTotalPending(
        response.data
          .filter((each) => each.status === "PENDING")
          .reduce((acc, val) => acc + val.order_amount, 0)
      );
      setLoading(false);
    }
  };
  const pieData = [
    { name: "SUCCESS", value: 100 },
    { name: "FAILURE", value: 100 },
    { name: "PENDING", value: 100 },
  ];

  return (
    <div>
      <Header />
      {!loading && (
        <div>
          <div className="card-container">
            <div className="card">
              <h1>Total Amount</h1>
              <h2>{data.reduce((acc, val) => acc + val.order_amount, 0)}</h2>
            </div>
            <div className="card">
              <h1>Success Amount</h1>
              <h2>{totalSuccess}</h2>
            </div>
            <div className="card">
              <h1>PENDING Amount</h1>
              <h2>{totalPending}</h2>
            </div>
            <div className="card">
              <h1>FAILURE Amount</h1>
              <h2>{totalFailure}</h2>
            </div>
          </div>
          <div className="pie-chart">
            <PieChart width={550} height={550}>
              <Pie
                data={[
                  { name: "SUCCESS", value: totalSuccess },
                  { name: "FAILURE", value: totalFailure },
                  { name: "PENDING", value: totalPending },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
