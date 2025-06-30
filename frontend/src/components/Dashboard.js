import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(res.data.points);
        setName(res.data.name);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {name} 💫</h2>
      <h4>Your Spark Points: {points}</h4>
      <a href="/mood" className="btn btn-primary mt-3">
        Start a Mood Quest
      </a>
    </div>
  );
};

export default Dashboard;
