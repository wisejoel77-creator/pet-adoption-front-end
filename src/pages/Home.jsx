import PetCard from "../components/PetCard";
import { useState } from "react";

function Home() {
    const pets = [
  {id: 1, name: "Max", breed: "Golden Retriever", age: 2, },
  {id: 2,name: "Luna ", breed: "Persian Cat", age: 1,},
  {id: 3, name: "Buddy ", breed: "Beagle", age: 3, },
];
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
 
   return (
    <div>

      <h1>Welcome to PawFound 🐾</h1>
      <p>Find your perfect pet companion.</p>
      <h2>Pets Viewed: {count}</h2>
      <button onClick={() => setCount(count + 1)}>View Another Pet</button>
      <input type="text" placeholder="Search pets..." value={search}
       onChange={(event) => setSearch(event.target.value)}/>
      
      {pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase()))
  .map((pet) => (
    <PetCard key={pet.id} name={pet.name} breed={pet.breed} age={pet.age}/>
   ))}
  </div>
 );
}

export default Home;