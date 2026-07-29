import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AdoptionForm from "../components/AdoptionForm";

function PetDetails() {

  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {

    const fetchPet = async () => {

      const response = await fetch( `https://jsonplaceholder.typicode.com/users/${id}` );

      const data = await response.json();
      const formattedPet = {
        id: data.id, name: data.name,
        breed: "Unknown breed", age: 1
      };
      setPet(formattedPet);

    };

    fetchPet();

  }, [id]);

  if (!pet) {return <p>Loading pet...</p>;}

  return (
    <div>

      <h1>{pet.name}</h1>
      <p>Breed: {pet.breed}</p>
      <p>Age: {pet.age}</p>

      <button>Adopt Me </button>
      <AdoptionForm />

    </div>
  );
}

export default PetDetails;