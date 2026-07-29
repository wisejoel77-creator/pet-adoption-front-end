import { useState } from "react";

function AdoptionForm({ onSuccess }) {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/adoption-request", {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  console.log(data);
}

  return (
    <div>

      <h2>Adoption Request 🐾</h2>
      <form onSubmit={handleSubmit}>

        <input type="text" placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <br />
        <br />

        <button type="submit">Submit Request</button>

      </form>

      {message && (<p>{message}</p>)}

    </div>
  );
}

export default AdoptionForm;