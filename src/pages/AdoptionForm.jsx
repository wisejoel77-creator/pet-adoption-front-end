import { useState } from "react";

function AdoptionForm() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage( `Thank you ${name}! Your adoption request has been submitted.`);

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