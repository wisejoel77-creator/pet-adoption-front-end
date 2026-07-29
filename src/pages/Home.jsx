import PetCard from "../components/PetCard";
import { useState, useEffect } from "react";

function Home() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pets, setPets] = useState([]);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    useEffect(() => {

  const fetchPets = async () => {
    try {

      const response = await fetch( "https://jsonplaceholder.typicode.com/users" );
      const data = await response.json();

      const formattedPets = data.map((user) => ({
        id: user.id, name: user.name,
        breed: "Unknown breed", age: 1
      }));

      setPets(formattedPets);

    } catch (error) {
      setError("Failed to load pets.");
    } finally {
      setLoading(false);
    }
  };

  fetchPets();
}, []);
 
   return (
    <div>

      <h1>Welcome to PawFound 🐾</h1>
      <p>Find your perfect pet companion.</p>
      <h2>Pets Viewed: {count}</h2>
      <button onClick={() => setCount(count + 1)}>View Another Pet</button>
      <input type="text" placeholder="Search pets..." value={search}
       onChange={(event) => setSearch(event.target.value)}/>
      
      {loading && <p>Loading pets...</p>}
      {pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase()))
  .map((pet) => (
    <PetCard id={pet.id} key={pet.id} name={pet.name} breed={pet.breed} age={pet.age}/>
   ))}
  </div>
 );
}

export default Home;