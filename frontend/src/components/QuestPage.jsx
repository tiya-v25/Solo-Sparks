// frontend/src/pages/QuestPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function QuestPage() {
  const [day, setDay] = useState("");
  const [quest, setQuest] = useState("");
  const [completed, setCompleted] = useState(false);
  const [media, setMedia] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDailyQuest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/quest/daily", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDay(res.data.day);
        setQuest(res.data.quest);
        setCompleted(res.data.completed);
      } catch (err) {
        setMessage("Failed to load daily quest.");
        console.error(err.message);
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
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>📅 {day}'s Quest</h2>
      <p>{quest}</p>

      {completed ? (
        <p className="text-success">✅ Quest already completed</p>
      ) : (
        <>
          <input
            type="file"
            accept="image/*,audio/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <button onClick={handleSubmit} className="btn btn-success mt-2">
            Mark as Done
          </button>
        </>
      )}

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default QuestPage;