import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const DailyQuest = () => {
  const [day, setDay] = useState('');
  const [quest, setQuest] = useState('');
  const [completed, setCompleted] = useState(false);
  const [media, setMedia] = useState(null);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchQuest = async () => {
      try {
        const res = await axios.get('/quest/daily');
        setDay(res.data.day);
        setQuest(res.data.quest);
        setCompleted(res.data.completed);
      } catch (err) {
        setMessage('Error fetching daily quest');
        console.error(err);
      }
    };
    fetchQuest();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('description', text); // ✅ text input
      if (media) formData.append('media', media); // ✅ media input

      const res = await axios.post('/quest/daily/complete', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage(res.data.message);
      setCompleted(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>🗓️ {day}'s Quest</h2>
      <p>{quest}</p>

      {completed ? (
        <p className="text-success">✅ Already completed!</p>
      ) : (
        <>
          <textarea
            className="form-control mb-3"
            placeholder="Write something about your quest..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*,audio/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
            className="form-control mb-3"
          />

          <button onClick={handleSubmit} className="btn btn-success">
            Submit Quest
          </button>
        </>
      )}

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default DailyQuest;
