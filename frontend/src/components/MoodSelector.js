// 📁 frontend/components/MoodSelector.js
import React, { useState } from 'react';
import axios from 'axios';

const MoodSelector = ({ onQuestFetched }) => {
  const [mood, setMood] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/quest/${mood}`);
      onQuestFetched(res.data.quest);
    } catch (err) {
      console.error('Error fetching quest:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mood-form">
      <h2>What's your mood today?</h2>
      <select value={mood} onChange={(e) => setMood(e.target.value)} required>
        <option value="">-- Select Mood --</option>
        <option value="happy">😊 Happy</option>
        <option value="sad">😔 Sad</option>
        <option value="anxious">😣 Anxious</option>
        <option value="angry">😠 Angry</option>
      </select>
      <button type="submit">Get Quest</button>
    </form>
  );
};

export default MoodSelector;