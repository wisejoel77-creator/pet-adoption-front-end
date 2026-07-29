import { useEffect, useState } from "react";

function MyAdoptionRequests() {

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {fetchRequests();
  }, []);

  async function fetchRequests() {

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/my-adoption-requests",
        {method: "GET",headers: { Authorization: `Bearer ${token}` }}
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(data);
      } else {
        setError(data.error || "Failed to fetch requests");
      }

    } catch (error) {
      setError("Server connection failed");
    }

    setLoading(false);
  }

  if (loading) {
    return <h2>Loading requests...</h2>;
  }

  return (
    <div>
      <h2>My Adoption Requests 🐾</h2>

      {error && (<p style={{color:"red"}}>
          {error}
        </p>
      )}

      {requests.length === 0 ? (
        <p>You have not submitted any adoption requests.</p>) :
         (requests.map((request) => (

          <div key={request.id} className="request-card"
          >

            <h3> Request #{request.id} </h3>
            <p> Pet ID: {request.pet_id}</p>
            <p> Status: {request.status}</p>
            <p>Notes: {request.notes} </p>
            <p> Date: {request.request_date}</p>
            <p>Pet: {request.pet_name}</p>

          </div>

        ))
      )}

    </div>
  );
}

export default MyAdoptionRequests;