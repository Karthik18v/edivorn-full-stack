import { useState } from "react";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const apiUrl =
        "https://edviron-backend-1tcd.onrender.com/api/auth/signup";

      const response = await axios.post(
        apiUrl,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      if (response.status === 201) {
        alert("User Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setUsername("");
      setPassword("");
      setEmail("");
      alert(error.response.data.message);
      
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>signup</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
