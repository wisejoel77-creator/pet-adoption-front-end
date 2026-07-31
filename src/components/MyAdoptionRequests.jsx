import { useEffect, useState } from "react";

const petFallbackImage = "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80";

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
      const response = await fetch("https://pet-adoption-system-back-end.onrender.com/my-adoption-requests",
        {method: "GET",headers: { Authorization: `Bearer ${token}` }}
      );

      const data = await response.json();

      if (response.ok) {
        const requestsWithPetDetails = await Promise.all(
          data.map(async (request) => {
            if (request.pet?.species || request.pet_species) return request;

            try {
              const petResponse = await fetch(`https://pet-adoption-system-back-end.onrender.com/pet/${request.pet_id}`);
              if (!petResponse.ok) return request;

              const pet = await petResponse.json();
              return { ...request, pet: { ...request.pet, ...pet } };
            } catch {
              return request;
            }
          })
        );

        setRequests(requestsWithPetDetails);
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
      <h2>My Adoption Requests </h2>

      {error && (<p style={{color:"red"}}>
          {error}
        </p>
      )}

      {requests.length === 0 ? (
        <p>You have not submitted any adoption requests.</p>) :
         (requests.map((request) => (

          <div key={request.id} className="request-card"
          >

            <img
              className="request-pet-image"
              src={request.pet?.image_url || request.pet_image_url || request.image_url || petFallbackImage}
              alt={`${request.pet_name || "Pet"}, your adoption request`}
              onError={(event) => { event.currentTarget.src = petFallbackImage; }}
            />
            <h3> Request #{request.id} </h3>
            <p> Pet ID: {request.pet_id}</p>
            <p> Species: {request.pet?.species || request.pet_species}</p>
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
