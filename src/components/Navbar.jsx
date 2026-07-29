import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{ display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#e5e0b5",
        color: "white",
      }}
    >
      <h2>PawFound 🐾</h2>

      <div style={{display: "flex", gap: "20px", }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}> Home</Link>
        <Link to="/my-adoption-requests" style={{ color: "white", textDecoration: "none" }}>My Adoption Requests </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}> Login</Link>
        <Link to="/register" style={{ color: "white", textDecoration: "none" }}> Register </Link>
        <Link to="/admin" style={{ color: "white", textDecoration: "none"}}> Admin </Link>
      </div>
    </nav>
  );
}

export default Navbar;