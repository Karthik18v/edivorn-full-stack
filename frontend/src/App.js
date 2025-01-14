import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/Dashboard/index";
import Transactions from "./components/Transactions";
import CheckStatus from "./components/CheckStatus";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/check-status" element={<CheckStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
