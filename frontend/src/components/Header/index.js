import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";
const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>School Payment</h1>
      <ul className="nav-items">
        <li>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/transactions"
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/check-status"
          >
            Check Status
          </Link>
        </li>
      </ul>
      <button className="logout-button" type="submit" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
