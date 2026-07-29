import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard 🐾</h1>
      <p>Welcome, Administrator.</p>

      <div className="dashboard-links">

        <div className="card">
          <h3> Manage Pets</h3>
          <p>Add, edit and remove pets.</p>

          <Link to="/admin/pets"> <button>Manage Pets</button> </Link>
        </div>

        <div className="card">
          <h3> Adoption Requests</h3>
          <p>Approve or reject requests.</p>

          <Link to="/admin/requests"> <button>View Requests</button></Link>
        </div>

        <div className="card">
          <h3> Users</h3>
          <p>View registered users.</p>

          <Link to="/admin/users"> <button>View Users</button></Link>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;