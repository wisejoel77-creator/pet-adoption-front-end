import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    // logic for showing what role a user has logged in as and logic to log out
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadAccount() {
      const token = localStorage.getItem("token");

      if (!token) {setAccount(null);
        return;
      }

      try {
        const response = await fetch("https://pet-adoption-system-back-end.onrender.com/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Session expired");
        const data = await response.json();
        setAccount(data);
      } catch {localStorage.removeItem("token");
        setAccount(null);
      }
    }

    loadAccount();
    window.addEventListener("auth-change", loadAccount);
    return () => window.removeEventListener("auth-change", loadAccount);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setAccount(null);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  }

  return (
    <nav className="site-nav">
      <Link to="/" className="brand">PawFound 🐾</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {account ? (
          <>
            <Link to="/my-adoption-requests">My Adoption Requests</Link>
            {account.role === "admin" && <Link to="/admin">Admin</Link>}
            <span className="account-role">Signed in as {account.role}</span>
            <button className="logout-button" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
