import { useEffect, useState } from "react";

function ManageShelters() {

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
    fetch("http://localhost:5000/view-all-shelters")
      .then(response => response.json())
      .then(data => {setShelters(data); })
      .catch(() => { setError("Could not load shelters"); });
  }

  function handleChange(event){

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(localStorage.getItem("token"));
    console.log("TOKEN SENT:", localStorage.getItem("token"));

    fetch("http://localhost:5000/add-shelter", {
      method:"POST",
      headers:{"Content-Type":"application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    })

    .then(response => response.json())
    .then(data => {
      if(data.Error){ setError(data.Error); setMessage(""); }

      else{
        setMessage("Shelter created successfully");
        setError("");

        setFormData({ name:"", email:"",  address:"",
          city:"", phone:""
        }); fetchShelters();
      }
    })

    .catch(()=>{
      setError("Something went wrong");
    });
  }


  return (

    <div>
      <h1>Manage Shelters </h1>

      {message &&<p style={{color:"green"}}>{message} </p>}
      {error && <p style={{color:"red"}}> {error}</p>}

      <h2>Add New Shelter</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Shelter name"name="name"
          value={formData.name}onChange={handleChange}/>

        <br/><br/>
        <input type="email" placeholder="Shelter email" name="email"
          value={formData.email} onChange={handleChange}/>
        <br/><br/>

        <input type="text" placeholder="Address" name="address"
          value={formData.address} onChange={handleChange}/>

        <br/><br/>
        <input type="text" placeholder="City" name="city"
          value={formData.city} onChange={handleChange}/>
        <br/><br/>

        <input type="text" placeholder="Phone" name="phone"
          value={formData.phone} onChange={handleChange}/>

        <br/><br/>

        <button type="submit"> Add Shelter</button>
      </form>

      <hr/>
      <h2>Existing Shelters</h2>
      {shelters.map((shelter)=>(
        <div key={shelter.id} className="card">

          <h3> {shelter.name} </h3>
          <p>{shelter.address}</p>
          <p>{shelter.city}</p>
          <p>{shelter.phone}</p>
          <p>{shelter.email}</p>

        </div>
      ))}
    </div>

  );
}

export default ManageShelters;