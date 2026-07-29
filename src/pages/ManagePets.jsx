import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ManagePets(){

  const [pets, setPets] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
  name: "", species: "", breed: "", age: "",
  gender: "", status: "", image_url: "", shelter_id: ""});

  const [editingId, setEditingId] = useState(null);

  useEffect(()=>{ fetchPets();},[]);

  function fetchPets(){
    fetch("http://localhost:5000/view-all-pets")
    .then(response=>response.json())
    .then(data=>{ setPets(data);})
    .catch(()=>{setError("Could not load pets");});

  }
  function handleChange(e) {setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}

async function savePet() {
  const token = localStorage.getItem("token");

  const url = editingId
    ? `http://localhost:5000/pet/${editingId}`
    : "http://localhost:5000/add-pet";
  const method = editingId ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`,},
      body: JSON.stringify(formData),});
    const data = await response.json();

    if (response.ok) {

      setMessage(data.message);
      setError("");
      setFormData({ name: "", species: "", breed: "",
        age: "", gender: "", status: "", image_url: "",
        shelter_id: ""});

      setEditingId(null);
      console.log(localStorage.getItem("token"));
      fetchPets(); } else {setError(data.Error || "Operation failed");}
  } catch { setError("Could not connect to server");}
}

function editPet(pet) {
  setEditingId(pet.id);

  setFormData({ name: pet.name || "", species: pet.species||"",
    breed: pet.breed||"",
    age: pet.age||"",
    gender: pet.gender||"",
    status: pet.status||"",
    image_url: pet.image_url||"",
    shelter_id: pet.shelter_id||"",
  });

  setMessage("");
  setError("");
}
  return(
    <div>

      <h1>Manage Pets</h1>
      <Link to="/admin" className="back-to-dashboard">←Go back to Admin Dashboard</Link>
      {message && <p style={{color:"green"}}> {message} </p> }
      {error && <p style={{color:"red"}}> {error}</p>}

      <h2>{editingId ? "Edit Pet" : "Add New Pet"}</h2>

      <input type="text" name="name" placeholder="Name"
       value={formData.name}onChange={handleChange}/>

      <input type="text" name="species" placeholder="Species"
       value={formData.species} onChange={handleChange}/>

      <input type="text" name="breed" placeholder="Breed"
       value={formData.breed}onChange={handleChange}/>

      <input type="number" name="age" placeholder="Age"
       value={formData.age} onChange={handleChange}/>

      <input type="text" name="gender" placeholder="Gender"
       value={formData.gender} onChange={handleChange}/>

     <input type="text" name="status" placeholder="Status"
      value={formData.status} onChange={handleChange}/>

     <input type="text" name="image_url" placeholder="Image URL"
      value={formData.image_url} onChange={handleChange}/>

    <input type="number" name="shelter_id" placeholder="Shelter ID"
     value={formData.shelter_id}onChange={handleChange}/>

    <button onClick={savePet}> {editingId ? "Update Pet" : "Add Pet"} </button>
<hr />

      <h2>Existing Pets</h2>

      {pets.map((pet)=>(
        <div key={pet.id} className="card">

          <h2>{pet.name}</h2>
          <img src={pet.image_url} alt={pet.name} width="150" />

          <p>Species: {pet.species}</p>
          <p>Breed: {pet.breed}</p>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Status: {pet.status}</p>
        
         <div style={{ display: "flex", gap: "10px" }}>
  <button onClick={() => editPet(pet)}>Edit</button>
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
