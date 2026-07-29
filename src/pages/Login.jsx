import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleLogin() {
  console.log(email);
  console.log(password);
}
  return (
    <div>
      <h1>Login</h1>

      <input type="email" placeholder="Enter your email" value={email}
        onChange={(e) => setEmail(e.target.value)} />

      <br />
      <br />

      <input type="password" placeholder="Enter your password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;