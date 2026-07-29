import { Link } from "react-router-dom";

const petFallbackImage = "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80";

function PetCard(props) {
  const statusClass = props.status.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="pet-card">
      <img
        className="pet-image"
        src={props.imageUrl || petFallbackImage}
        alt={`${props.name}, available for adoption`}
        onError={(event) => { event.currentTarget.src = petFallbackImage; }}
      />
      <div className="pet-card-meta">
        <p className="pet-species">{props.species}</p>
        <span className={`adoption-status status-${statusClass}`}>{props.status}</span>
      </div>
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
