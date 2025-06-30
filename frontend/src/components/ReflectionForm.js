import React, { useState } from "react";
import axios from "axios";

const ReflectionForm = ({ mood, quest }) => {
  const [reflection, setReflection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // store this at login time

    try {
      const res = await axios.post("http://localhost:5000/api/reflections", {
        mood,
        quest,
        reflection,
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`Reflection saved! You now have ${res.data.newPoints} Spark Points 🎉`);
      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong while saving your reflection.");
    }
  };

  return submitted ? (
    <p>Thank you for reflecting ✨</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="How did the quest make you feel?"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        required
      />
      <button type="submit">Submit Reflection</button>
    </form>
  );
};

export default ReflectionForm;
