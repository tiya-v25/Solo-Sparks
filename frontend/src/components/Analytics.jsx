import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch {
        setData({ error: "Failed to load analytics" });
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Your Mood Analytics</h2>
      {data ? (
        <>
          <p>Total Reflections: {data.totalReflections || 0}</p>
          <h4>Mood Counts:</h4>
          <ul>
            {Object.entries(data.moodCount || {}).map(([mood, count]) => (
              <li key={mood}>
                {mood.toUpperCase()}: {count}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Analytics;
