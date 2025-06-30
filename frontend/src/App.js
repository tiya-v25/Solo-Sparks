import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Quests from './components/Quests';
import Navbar from './components/Navbar';
import QuestPage from './components/QuestPage';
import Assessment from './components/Assessment';
import MoodPage from './pages/MoodPage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/quest/:id" element={<QuestPage />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/mood" element={<MoodPage />} />
        
      </Routes>
    </div>
  );
}

export default App;
