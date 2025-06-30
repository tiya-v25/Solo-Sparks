// src/components/DailyQuest.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function DailyQuest() {
  const [quest, setQuest] = useState("");
  const [day, setDay] = useState("");
  const [completed, setCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchDailyQuest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/quest/daily", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuest(res.data.quest);
        setDay(res.data.day);
        setCompleted(res.data.completed);
      } catch (err) {
        setMessage("Failed to load daily quest.");
      }
    };

    fetchDailyQuest();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (media) formData.append("media", media);

      const res = await axios.post("/quest/daily/complete", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setCompleted(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit quest");
    }
  };

  return (
    <div className="quest-box">
      <h3>📅 {day}'s Quest</h3>
      <p>{quest}</p>

      {completed ? (
        <p style={{ color: "green" }}>✅ Already Completed</p>
      ) : (
        <>
          <input
            type="file"
            accept="image/*,audio/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <button className="btn btn-success mt-2" onClick={handleSubmit}>
            Mark as Done
          </button>
        </>
      )}

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default DailyQuest;
