import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConfig";
import "./MoodPages.css";

function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalReflections: 0,
    moodCount: {},
    lastReflection: null,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats({
          totalReflections: res.data.totalReflections || 0,
          moodCount: res.data.moodCount || {},
          lastReflection: res.data.lastReflection || null,
        });
      } catch (err) {
        console.error("Error loading analytics:", err.message);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="mood-page">
      <h2>📊 Your Mood Analytics</h2>
      <p>Total Reflections: {stats.totalReflections}</p>

      <div>
        <h3>Mood Distribution:</h3>
        <ul>
          {Object.entries(stats.moodCount).length === 0 ? (
            <p>No mood data yet.</p>
          ) : (
            Object.entries(stats.moodCount).map(([mood, count]) => (
              <li key={mood}>
                {mood.toUpperCase()}: {count}
              </li>
            ))
          )}
        </ul>
      </div>

      {stats.lastReflection && (
        <div className="last-reflection">
          <h4>📝 Last Reflection:</h4>
          <p><strong>Mood:</strong> {stats.lastReflection.mood}</p>
          <p><strong>Message:</strong> {stats.lastReflection.message}</p>
          <small>{new Date(stats.lastReflection.createdAt).toLocaleString()}</small>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPage;
