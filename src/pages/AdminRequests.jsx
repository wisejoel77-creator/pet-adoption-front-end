import { useEffect, useState } from "react";

function AdminRequests() {

  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {fetchRequests();}, []);

  function fetchRequests(){
    fetch("http://localhost:5000/adoption-requests", {
      headers:{"Authorization": `Bearer ${localStorage.getItem("token")}`}
    })

    .then(response => response.json())
    .then(data => {console.log("ADOPTION REQUEST RESPONSE:", data);

  if(data.error) { setError(data.error); setRequests([]); }
  else{ setRequests(data); }})

    .catch(()=>{setError("Could not load adoption requests");});
  }

  function updateRequest(id, status){
    fetch(`http://localhost:5000/adoption-request/${id}`, {
      method:"PATCH",
      headers:{"Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`},
      body: JSON.stringify({status: status})
    })

    .then(response => response.json())
    .then(data=>{

      if(data.error){ setError(data.error); }
      else{setMessage(`Request ${status.toLowerCase()} successfully`);
        setError("");
        fetchRequests();
      }
    })

    .catch(()=>{setError("Something went wrong");});
  }

  return (
    <div>
      <h1>Manage Adoption Requests</h1>

      {message &&  <p style={{color:"green"}}> {message}</p>}
      {error && <p style={{color:"red"}}>{error}</p> }
      {requests.length === 0 && (<p>No adoption requests found.</p>)}
      {requests.map((request)=>(

  <div key={request.id} className="card request-card">

    <h2>{request.pet?.name || "Unknown Pet"}</h2>
    <p> Species: {request.pet?.species || "Unknown"}</p>
    <p> Breed: {request.pet?.breed || "Unknown"}</p>

    <hr/>
    <h3>Applicant Details</h3>
    <p>Name: {request.adopter?.username || "Unknown"}</p>
    <p> Email: {request.adopter?.email || "Unknown"}</p>
    <p> Notes: {request.notes || "No notes provided"}</p>
    <p> Status: <strong>{request.status}</strong></p>
    <p>Date: {new Date(request.request_date).toLocaleDateString()}</p>

    {request.status === "Pending" && (
      <div>

        <button onClick={() => updateRequest(request.id,"Approved")}>
          Approve </button>

        {" "}
        <button onClick={() => updateRequest(request.id,"Rejected")}>
          Reject</button>

      </div>
    )}
  </div>
))}

</div>
  );}
      
export default AdminRequests;
