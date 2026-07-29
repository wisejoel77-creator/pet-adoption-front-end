import { useEffect, useState } from "react";

function ManagePets(){

  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{ fetchPets();},[]);

  function fetchPets(){
    fetch("http://localhost:5000/view-all-pets")
    .then(response=>response.json())
    .then(data=>{ setPets(data);})
    .catch(()=>{setError("Could not load pets");});
  }

  return(
    <div>

      <h1>Manage Pets</h1>
      {message && <p style={{color:"green"}}> {message} </p> }
      {error && <p style={{color:"red"}}> {error}</p>}

      <h2>Existing Pets</h2>

      {pets.map((pet)=>(
        <div key={pet.id} className="card"
        style={{ border:"1px solid black", padding:"15px", margin:"15px",
          borderRadius:"10px"}}>

          <h2>{pet.name}</h2>
          <img src={pet.image_url} alt={pet.name} width="150" />

          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Status: {pet.status}</p>
        
         <div style={{ display: "flex", gap: "10px" }}>
  <button>Edit</button>
  <button onClick={() => deletePet(pet.id)}
    style={{ backgroundColor: "red", color: "white",
      border: "none", padding: "8px 15px", borderRadius: "5px",
      cursor: "pointer",
    }} > Delete</button>
</div>

        </div>
      ))}
    </div>

  );

  function deletePet(id) {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  fetch(`http://localhost:5000/pet/${id}`, {
    method: "DELETE",
    headers: {Authorization: `Bearer ${token}`, },
  })
    .then((response) => {
      if (!response.ok) { throw new Error("Failed to delete pet"); }

      setMessage("Pet deleted successfully!");
      setError("");

      // Refresh the pet list
      fetchPets();
    })
    .catch(() => { setError("Could not delete pet"); });
}
}
export default ManagePets;