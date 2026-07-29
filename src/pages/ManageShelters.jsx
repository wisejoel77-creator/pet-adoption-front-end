import { useEffect, useState } from "react";

function ManageShelters() {

  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchShelters();
  }, []);


  function fetchShelters() {

    fetch("http://localhost:5000/view-all-shelters")
      .then(response => response.json())
      .then(data => {
        setShelters(data);
      })
      .catch(error => {
        console.log(error);
        setError("Could not load shelters");
      });
  }

  return (
    <div>

      <h1>Manage Shelters </h1>
      {error && (<p style={{color:"red"}}>{error}</p> )}

      {shelters.length === 0 ? ( <p>No shelters available</p>) : 
        (shelters.map((shelter)=>(
          
          <div key={shelter.id} className="card">

            <h3>{shelter.name}</h3>
            <p>Address: {shelter.address}</p>
            <p>City: {shelter.city}</p>
            <p> Phone: {shelter.phone}</p>
            <p> Email: {shelter.email}</p>

          </div>

        ))
      )}
    </div>
  );
}

export default ManageShelters;