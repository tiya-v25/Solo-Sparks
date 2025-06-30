// src/components/QuestPage.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/axiosConfig";

const QuestPage = () => {
  const [quests, setQuests] = useState([]);

  const fetchQuests = async () => {
    try {
      const res = await API.get("/api/quests");
      setQuests(res.data);
    } catch (error) {
      console.error("Failed to fetch quests", error);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
    <div className="auth-form">
      <h2>All Quests</h2>
      <ul>
        {quests.map((quest) => (
          <li key={quest._id}>
            <strong>{quest.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestPage;
