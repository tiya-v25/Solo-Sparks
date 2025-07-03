import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light px-3">
      <h1 className="display-4 fw-bold text-dark mb-3"
        style={{ transition: "color 0.3s ease, transform 0.3s ease",}} onMouseEnter={(e) => {e.target.style.color = "#007bff";e.target.style.transform = "scale(1.05)";}}
        onMouseLeave={(e) => {
        e.target.style.color = "#212529"; 
        e.target.style.transform = "scale(1)";
        }}>
        Welcome to Solo Sparks</h1>
      
      <p className="lead text-secondary mb-4">
        Light up your day with mindful reflections, mood tracking, and personal growth.
      </p>

      <Link to="/Dashboard" className="btn btn-primary btn-lg px-4 shadow-sm">
         Continue Growing
      </Link>
    </main>
  );
}

export default Home;
