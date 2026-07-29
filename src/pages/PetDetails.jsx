import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdoptionForm from "../components/AdoptionForm";

function PetDetails() {

  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    const fetchPet = async () => {
     const response = await fetch( `http://localhost:5000/pet/${id}` );

     const data = await response.json();
     setPet(data);

    };

    fetchPet();

  }, [id]);

  if (!pet) {return <p>Loading pet...</p>;}

  return (
    <div>

      <h1>{pet.name}</h1>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>

      <button onClick={()=> setShowForm(true)}>Adopt Me </button>
      {showForm && <AdoptionForm petId={pet.id} />} 

    </div>
  );
}

export default PetDetails;