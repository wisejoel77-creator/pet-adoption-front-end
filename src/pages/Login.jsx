import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  async function handleLogin(event) {
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

  try {
    const response = await fetch("https://pet-adoption-system-back-end.onrender.com/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/");
    } else {
      setError(data.Error || "Login failed");
    }

  } catch (error) {
    setError("Cannot connect to server");
  }
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
</div>
  );
}

export default Login;