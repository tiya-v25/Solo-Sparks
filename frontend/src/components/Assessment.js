import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // optional, for styling reuse

const Assessment = () => {
  const [formData, setFormData] = useState({
    mood: '',
    enjoyAloneTime: '',
    favoriteActivity: ''
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/assessment',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting assessment:', error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Let’s Get to Know You</h2>
      <form onSubmit={handleSubmit}>
        <label>How are you feeling today?</label>
        <input
          type="text"
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          required
        />

        <label>Do you enjoy spending time alone? (yes/no)</label>
        <input
          type="text"
          name="enjoyAloneTime"
          value={formData.enjoyAloneTime}
          onChange={handleChange}
          required
        />

        <label>What kind of activities make you feel alive?</label>
        <input
          type="text"
          name="favoriteActivity"
          value={formData.favoriteActivity}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Assessment</button>
      </form>
    </div>
  );
};

export default Assessment;
