import PetCard from "../components/PetCard";

function Home() {
  return (
    <div>
      <h1>Welcome to PawFound 🐾</h1>
      <p>Find your perfect pet companion.</p>

      <PetCard name="Max" breed="Golden Retriever" age={2}/>
      <PetCard name="Luna" breed="Persian Cat" age={1} />
      <PetCard name="Buddy" breed="Beagle" age={3} />
    </div>
  );
}

export default Home;