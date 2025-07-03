import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token) return null; // Hide navbar if not logged in

  return (
    <nav className="bg-dark text-light p-3 d-flex justify-content-between">
      <h4 className="ms-3">Solo Sparks</h4>
      <div className="d-flex gap-4 me-4">

        <Link to="/dashboard" className="text-light">Dashboard</Link>
        <Link to="/daily-quest" className="text-light">Daily Quest</Link>
        <Link to="/mood" className="text-light">Mood</Link>
        <Link to="/rewards" className="text-light">Rewards</Link>
      

        <button
          className="btn btn-sm btn-outline-light"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

