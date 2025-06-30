const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Load env before anything else
dotenv.config();

// ✅ Now connect to DB after env is loaded
const connectDB = require("./db/connectDB");
connectDB();

const authRoutes = require('./routes/auth');
const questRoutes = require('./routes/quests');
const reflectionRoutes = require('./routes/reflections');
const userRoutes = require('./routes/user');
const rewardRoutes = require('./routes/rewards');
const assessmentRoutes = require('./routes/assessment');

const app = express();
const PORT = process.env.PORT || 5000;

const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quest', questRoutes);
app.use('/api/reflection', reflectionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/assessment', assessmentRoutes);

// ✅ Move DB connect to connectDB.js (already there)
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
