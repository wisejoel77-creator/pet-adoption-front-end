import { useState } from "react";
function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    if (name === "" || email === "" ||
      password === "" || confirmPassword === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Account created successfully!");
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}/>

        <br />
        <br />

        <input type="email" placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <br />
        <br />

        <input
          type="password" placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} />

        <br />
        <br />

        <input
          type="password" placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)} />

        <br />
        <br />

        {error && ( <p style={{ color: "red" }}>{error}
          </p>
        )}

        <button type="submit"> Register</button>
      </form>
    </div>
  );
}

export default Register;
