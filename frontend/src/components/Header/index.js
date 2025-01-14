import { Link } from "react-router-dom";
import "./index.css";
const Header = () => {
  return (
    <div className="header">
      <h1>School Payment</h1>
      <ul className="nav-items">
      <li>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/"
          >
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
      <button className="logout-button" type="submit">
        Logout
      </button>
    </div>
  );
};

export default Header;
