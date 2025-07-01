// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.js";
import Login from "./components/Login.jsx";
import Register from "./components/Register.js";
import Dashboard from "./components/Dashboard.js";
import Quests from "./components/Quests.js";
import Navbar from "./components/Navbar.jsx";
import QuestPage from "./components/QuestPage.jsx";
import Assessment from "./components/Assessment.js";
import MoodPage from "./pages/MoodPage.js";
import RewardsPage from "./pages/RewardsPage.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import DailyQuest from './components/DailyQuest.jsx';





function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/quests" element={<PrivateRoute><Quests /></PrivateRoute>} />
        <Route path="/quest/:id" element={<PrivateRoute><QuestPage /></PrivateRoute>} />
        <Route path="/assessment" element={<PrivateRoute><Assessment /></PrivateRoute>} />
        <Route path="/mood" element={<PrivateRoute><MoodPage /></PrivateRoute>} />
        <Route path="/rewards" element={<PrivateRoute><RewardsPage /></PrivateRoute>} />
        <Route path="/daily-quest" element={<PrivateRoute><DailyQuest /></PrivateRoute>}/>

       

        {/* Fallback route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
