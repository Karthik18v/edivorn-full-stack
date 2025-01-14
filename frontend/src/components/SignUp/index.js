import "./index.css";

const SignUp = () => {
  return (
    <div class="login-container">
      <div class="login-card">
        <h2>signup</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
