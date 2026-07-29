import { useState } from "react";
function Register() {
  
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
});
  function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value
  });
}
  function handleRegister(event) {
    event.preventDefault();

    if (formData.name === "" || formData.email === "" ||
      formData.password === "" || formData.confirmPassword === ""
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

    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);

    alert("Account created successfully!");
  }

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Enter your name"
          name="name" value ={formData.name}
          onChange={handleChange}/>

        <br />
        <br />

        <input type="email" placeholder="Enter your email"
          name="email" value ={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password" placeholder="Enter your password"
          name="password" value ={formData.password}
          onChange={handleChange} />

        <br />
        <br />

        <input
          type="password" placeholder="Confirm your password"
          name="confirmPassword" value ={formData.confirmPassword}
          onChange={handleChange} />

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
