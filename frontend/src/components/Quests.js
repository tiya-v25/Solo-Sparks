import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuests(res.data);
      } catch (err) {
        console.error("Error fetching quests:", err.message);
      }
    };

    fetchQuests();
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#b30000' }}>Available Quests</h2>
      {quests.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {quests.map((quest) => (
            <div key={quest._id} style={{
              border: '1px solid #eee',
              padding: '1rem',
              borderRadius: '10px',
              background: '#ffe6e6',
              width: '250px'
            }}>
              <h3>{quest.title}</h3>
              <p>{quest.description || 'No description available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No quests found.</p>
      )}
    </div>
  );
};

export default Quests;
