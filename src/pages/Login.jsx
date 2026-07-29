import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  function handleLogin(event) {
  event.preventDefault();
  if (email === "" || password === "") {
    setError("Please fill in all fields.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }
  setError("");
  
  console.log(email);
  console.log(password);
  alert("Login successful!");
}
  return (
    <div>
  <h1>Login</h1>
  {error && <p style={{ color: "red" }}>{error}</p>}
  <form onSubmit={handleLogin}>
    <input type="email" placeholder="Enter your email" value={email}
      onChange={(e) => setEmail(e.target.value)} />

    <br />
    <br />

    <input type="password" placeholder="Enter your password" value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <br />
    <br />

    <button type="submit"> Login</button>
  </form>

  <p>Email: {email}</p>
  <p>Password: {password}</p>
</div>
  );
}

export default Login;