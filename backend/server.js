// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes (CommonJS)
const authRoutes = require('./routes/auth');
const questRoutes = require('./routes/quests');
const reflectionRoutes = require('./routes/reflections');
const userRoutes = require('./routes/user');
const rewardRoutes = require('./routes/rewards');
const assessmentRoutes = require('./routes/assessment');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quest', questRoutes);
app.use('/api/reflection', reflectionRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/assessment', assessmentRoutes);

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
});
