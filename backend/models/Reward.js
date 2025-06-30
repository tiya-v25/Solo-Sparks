
import React, { useEffect, useState } from "react";
import axios from "axios";

const Reward = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(res.data.points);
        setRewards(res.data.rewards);
      } catch (error) {
        console.error("Error fetching rewards:", error);
      }
    };

    fetchRewards();
  }, [token]);

  const redeemReward = async (rewardId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/rewards/redeem`,
        { rewardId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Reward redeemed!");
    } catch (error) {
      console.error("Error redeeming reward:", error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Your Spark Points: {points}</h2>
      <h3>Available Rewards</h3>
      <ul>
        {rewards.map((r) => (
          <li key={r._id}>
            <strong>{r.name}</strong> - {r.points} points
            <button
              onClick={() => redeemReward(r._id)}
              disabled={points < r.points}
            >
              Redeem
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reward;
