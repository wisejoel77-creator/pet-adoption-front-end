import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function ManageShelters() {

  const [editingId, setEditingId] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [formData, setFormData] = useState({
    name: "", email: "",
    address: "", city: "",
    phone: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {fetchShelters();}, []);

  function fetchShelters(){
    fetch("https://pet-adoption-system-back-end.onrender.com/view-all-shelters")
      .then(response => response.json())
      .then(data => setShelters(data))
      .catch(() => {
        setError("Could not load shelters");
      });
  }

  function handleChange(event){
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    const token = localStorage.getItem("token");
    let url = "https://pet-adoption-system-back-end.onrender.com/add-shelter";
    let method = "POST";

    if(editingId){
      url = `https://pet-adoption-system-back-end.onrender.com/shelter/${editingId}`;
      method = "PATCH";
    }

    fetch(url, {
      method: method,
      headers:{"Content-Type":"application/json","Authorization": `Bearer ${token}`},
      body: JSON.stringify(formData)
    })

    .then(response => response.json())
    .then(data => {

      if(data.Error){setError(data.Error);setMessage("");}

      else{
        setMessage( editingId 
          ? "Shelter updated successfully"
          : "Shelter created successfully"
        );

        setError("");
        setFormData({ name:"", email:"", address:"",
          city:"", phone:""
        });

        setEditingId(null);
        fetchShelters();
      }
    })

    .catch(()=>{
      setError("Something went wrong");
    });
  }

  function editShelter(shelter){
    setEditingId(shelter.id);
    
    setFormData({name:shelter.name, email:shelter.email,
      address:shelter.address,city:shelter.city,
      phone:shelter.phone
    });
  }

  function deleteShelter(id){
    const token = localStorage.getItem("token");
    fetch(`https://pet-adoption-system-back-end.onrender.com/shelter/${id}`,{
      method:"DELETE",headers:{"Authorization": `Bearer ${token}`}
    })

    .then(response => response.json())
    .then(data=>{
     
      if(data.Error){ setError(data.Error); }

      else{
        setMessage("Shelter deleted successfully");
        fetchShelters(); }
    })

    .catch(()=>{setError("Could not delete shelter");});
  }

  return (

    <div>
      <h1>Manage Shelters</h1>
      <Link to="/admin" className="back-to-dashboard">Go back to Admin Dashboard</Link>
      {message && <p style={{color:"green"}}> {message} </p>}
      {error && <p style={{color:"red"}}>{error}</p>}

      <h2>{editingId ? "Update Shelter" : "Add New Shelter"}</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Shelter name"
        name="name" value={formData.name}
        onChange={handleChange}/>

        <br/><br/>
        <input type="email" placeholder="Shelter email" name="email"
        value={formData.email} onChange={handleChange}/>
        <br/><br/>

        <input type="text" placeholder="Address" name="address"
        value={formData.address} onChange={handleChange}/>

        <br/><br/>
        <input type="text"placeholder="City"name="city"
        value={formData.city}onChange={handleChange} />
        <br/><br/>

        <input type="text" placeholder="Phone" name="phone"
        value={formData.phone} onChange={handleChange}/>

        <br/><br/>

        <button type="submit">{editingId ? "Update Shelter" : "Add Shelter"}</button>
        {editingId &&

          <button type="button" onClick={()=>{
            setEditingId(null);
            setFormData({ name:"", email:"",
              address:"", city:"", phone:"" });
               }} > Cancel </button>}
      </form>

      <hr/>
      <h2>Existing Shelters</h2>
      {shelters.map((shelter)=>(
        <div key={shelter.id} className="card">
         
          <h3>{shelter.name}</h3>
          <p>{shelter.address}</p>
          <p>{shelter.city}</p>
          <p>{shelter.phone}</p>
          <p>{shelter.email}</p>

          <button onClick={()=>editShelter(shelter)}> Edit</button>
          <button onClick={()=>deleteShelter(shelter.id)}> Delete</button>

        </div>
      ))}
    </div>
  );
}
export default ManageShelters;
