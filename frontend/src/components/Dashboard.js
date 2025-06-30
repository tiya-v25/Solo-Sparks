import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig.js"; // Use your axiosConfig with baseURL

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const [name, setName] = useState("");
  const [reflections, setReflections] = useState([]);

  // 🔹 Fetch user info (name & points)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(res.data.points);
        setName(res.data.name);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // 🔹 Fetch recent reflections
  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/reflection", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReflections(res.data);
      } catch (err) {
        console.error("Error fetching reflections", err);
      }
    };

    fetchReflections();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Welcome, {name} 💫</h2>
      <h4>Your Spark Points: {points}</h4>

      <a href="/mood" className="btn btn-primary mt-3">
        Start a Mood Quest
      </a>

      <hr className="my-4" />
      <h4>📝 Your Recent Reflections</h4>

      {reflections.length === 0 ? (
        <p>No reflections submitted yet.</p>
      ) : (
        <div className="row">
          {reflections.map((ref, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Mood: {ref.mood}</h5>
                  <p className="card-text">{ref.message}</p>

                  {ref.mediaUrl && (
                    <>
                      {ref.mediaUrl.includes("image") && (
                        <img
                          src={ref.mediaUrl}
                          alt="media"
                          className="img-fluid rounded mb-2"
                        />
                      )}
                      {ref.mediaUrl.includes("video") && (
                        <video
                          src={ref.mediaUrl}
                          controls
                          className="w-100 mb-2"
                        />
                      )}
                      {ref.mediaUrl.includes("audio") && (
                        <audio
                          controls
                          src={ref.mediaUrl}
                          className="w-100 mb-2"
                        />
                      )}
                    </>
                  )}

                  <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {new Date(ref.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
