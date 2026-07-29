import { useState } from "react";

function AdoptionForm({ petId }) {

  const [formData, setFormData] = useState({ notes: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {

      const response = await fetch("http://localhost:5000/adoption-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
          body: JSON.stringify({ pet_id: petId, notes: formData.notes })
        }
      );


      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("BACKEND MESSAGE:", data);

      if (response.ok) {
        setMessage("Adoption request submitted successfully 🐾");
        setSubmitted(true);
      } else {
        setError(data.error || "Request failed");
      }

    } catch (error) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="success-card">
        <h2>Request sent! 🐾</h2>
        <p>Your adoption request has been submitted.</p>
        <p>The shelter will review your request soon.</p>
      </div>
    );
  }


  return (
    <div>
      <h2>Adoption Request </h2>

      <form onSubmit={handleSubmit}>
        <textarea name="notes" placeholder="Why do you want to adopt this pet?"
          value={formData.notes}
          onChange={handleChange}
        />

        {error && ( <p style={{ color: "red" }}> {error} </p>)}

        {message && (<p style={{ color: "green" }}>{message}</p>)}

        <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Adoption Request"}
        </button>

      </form>

    </div>
  );
}

export default AdoptionForm;