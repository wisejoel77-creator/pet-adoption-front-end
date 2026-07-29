import { useState } from "react";

function Register() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (
      !formData.name || !formData.email ||
      !formData.password || !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({username: formData.name,
          email: formData.email, password: formData.password,
          role: "adopter"
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
       setMessage("Account created successfully!");
       } else {
       setError(data.error || data.message || "Registration failed");
}

      if (response.ok) {
        setMessage("Account created successfully!");

        setFormData({name: "", email: "",
          password: "", confirmPassword: "",
        });
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    }
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input type="text" name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input type="email" name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input type="password" name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <input type="password" name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <br />
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;