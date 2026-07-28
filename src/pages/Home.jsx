import PetCard from "../components/PetCard";

function Home() {
    const pets = [
  {id: 1, name: "Max", breed: "Golden Retriever", age: 2, },
  {id: 2,name: "Luna ", breed: "Persian Cat", age: 1,},
  {id: 3, name: "Buddy ", breed: "Beagle", age: 3, },
];
  return (
    <div>
      <h1>Welcome to PawFound 🐾</h1>
      <p>Find your perfect pet companion.</p>

      {pets.map((pet) => (
   <PetCard key={pet.id} name={pet.name} breed={pet.breed} age={pet.age} />
     ))}
 
    </div>
  );
}

export default Home;