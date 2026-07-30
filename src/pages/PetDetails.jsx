import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdoptionForm from "../components/AdoptionForm";
import { API_URL } from "../config";

const petFallbackImage = "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=80";

function PetDetails() {

  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPet = async () => {
     const response = await fetch( `https://pet-adoption-system-back-end.onrender.com/pet/${id}` );
     const data = await response.json();
     setPet(data);

    };

    fetchPet();

  }, [id]);

  if (!pet) {return <p>Loading pet...</p>;}

  const petNotes = pet.notes || pet.description ||
    `Meet ${pet.name}, a ${pet.age}-year-old ${pet.breed || pet.species || "pet"} looking for a loving forever home.`;

  return (
    <div className="pet-details">

      <img
        className="pet-detail-image"
        src={pet.image_url || petFallbackImage}
        alt={`${pet.name}, available for adoption`}
        onError={(event) => { event.currentTarget.src = petFallbackImage; }}
      />
      <h1>{pet.name}</h1>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>
      <section className="pet-notes">
        <h2>About {pet.name}</h2>
        <p>{petNotes}</p>
      </section>

      <button className="adopt-button" onClick={()=> setShowForm(true)}>Adopt Me 🐾</button>
      <button onClick={() => navigate(-1)}> Back</button>
      {showForm && (<AdoptionForm petId={pet.id} 
      closeForm={() => setShowForm(false)}
     />
)}

    </div>
  );
}

export default PetDetails;
