import "./index.css";

const Login = () => {
  return (
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
