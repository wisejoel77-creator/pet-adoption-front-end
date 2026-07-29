import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="site-nav">
      <Link to="/" className="brand">PawFound 🐾</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/my-adoption-requests">My Adoption Requests</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
