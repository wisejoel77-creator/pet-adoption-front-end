import { Link } from "react-router-dom";

function PetCard(props) {
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "20px",
        width: "250px",
      }}>
     <h2>{props.name}</h2>
      <p>{props.breed}</p>
      <p>Age: {props.age} years</p>
     
      <Link to={`/pets/${props.id}`}>
       <button>View Details</button>
      </Link>
    </div>
  );
}

export default PetCard;