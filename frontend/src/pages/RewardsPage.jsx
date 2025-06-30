import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig'; // Make sure this handles baseURL
import './MoodPages.css'; 

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/rewards', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPoints(res.data.points);
        setRewards(res.data.rewards);
      } catch (err) {
        console.error('Error loading rewards:', err);
        setMessage('Error loading rewards');
      }
    };

    fetchRewards();
  }, []);

  const handleRedeem = async (rewardId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/rewards/redeem', { rewardId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);

      const redeemedReward = rewards.find(r => r._id === rewardId);
      if (redeemedReward) {
        setPoints(prev => prev - redeemedReward.points);
      }
    } catch (err) {
      console.error('Redeem failed:', err);
      setMessage(err.response?.data?.message || 'Redeem failed');
    }
  };

  return (
    <div className="mood-page">
      <h2>Your Points: {points}</h2>
      {message && <p className="message">{message}</p>}

      <div className="rewards-list">
        {rewards.map((reward) => (
          <div key={reward._id} className="reward-card">
            <h3>{reward.name}</h3>
            <p>Cost: {reward.points} points</p>
            <button
              onClick={() => handleRedeem(reward._id)}
              disabled={points < reward.points}
            >
              {points < reward.points ? 'Not enough points' : 'Redeem'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsPage;
