import { useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = "https://edviron-backend-1tcd.onrender.com/api/auth/login";
      const response = await axios.post(
        apiUrl,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response.data.token);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("jwtToken", token, { expires: 7 });
        navigate("/");
      }
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <p>
            Create a new Account{" "}
            <Link className="link" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
