import React, { useState } from "react";
import axios from "../utils/axiosConfig.js";
import "./MoodPages.css";

const MoodPage = () => {
  const [mood, setMood] = useState("");
  const [quest, setQuest] = useState("");
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);

  const getQuest = async () => {
    if (!mood) return alert("Please select a mood first!");

    try {
      const res = await axios.get(`/quest/${mood}`);
      setQuest(res.data.quest);
    } catch (err) {
      console.error("Error fetching quest:", err);
      alert("Failed to fetch quest.");
    }
  };

  const submitReflection = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("mood", mood);
      formData.append("message", reflection);
      if (media) {
        formData.append("media", media);
      }

      const res = await axios.post(`/reflection`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Reflection submitted!");
      alert("Reflection submitted with media! 🌟");
      setMood("");
      setQuest("");
      setReflection("");
      setMedia(null);
    } catch (err) {
      console.error("Error submitting reflection:", err);
      alert("Failed to submit reflection.");
    }
  };

  return (
    <div className="mood-container">
      <h2>🌈 How are you feeling today?</h2>

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="mood-select"
      >
        <option value="">Select your mood</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😞 Sad</option>
        <option value="anxious">😰 Anxious</option>
        <option value="angry">😡 Angry</option>
      </select>

      <button onClick={getQuest} className="fetch-btn">
        Fetch Quest
      </button>

      {quest && (
        <div className="quest-box">
          <h3>Your Quest ✨</h3>
          <p>{quest}</p>

          <textarea
            placeholder="How did this quest make you feel?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            className="reflection-input"
            required
          />

          <input
            type="file"
            accept="image/*,audio/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
            className="media-upload-input"
          />

          <button onClick={submitReflection} className="submit-btn">
            Submit Reflection
          </button>
        </div>
      )}

      {message && (
        <div className="submission-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default MoodPage;
