import { useState } from "react";

function AdoptionForm({ petId }) {

  const [formData, setFormData] = useState({notes: ""});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("")

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
  event.preventDefault();
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/adoption-request", {
    method: "POST",
    headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
    body: JSON.stringify({ pet_id: petId, notes: formData.notes}),
  });

  const data = await response.json();
  if (response.ok) {
      setMessage("Adoption request submitted successfully 🐾");
      setError("");
    } else {
      setError(data.Error || "Something went wrong");
      setMessage("");
    }
}

  return (
    <div>

      <h2>Adoption Request 🐾</h2>
      <form onSubmit={handleSubmit}>

      <textarea name="notes"
        placeholder="Why do you want to adopt this pet?"
        value={formData.notes}
        onChange={handleChange}
      />

      {error && <p style={{color:"red"}}>{error}</p>}
      {message && <p style={{color:"green"}}>{message}</p>}
      <button type="submit"> Submit Adoption Request</button>

    </form>

    </div>
  );
}

export default AdoptionForm;