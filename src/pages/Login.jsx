import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleLogin(event) {
  event.preventDefault();
  
  console.log(email);
  console.log(password);
}
  return (
    <div>
  <h1>Login</h1>

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