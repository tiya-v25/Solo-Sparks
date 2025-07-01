# ✨ Solo Sparks

Solo Sparks is a MERN-based mental wellness app where users reflect on moods, complete daily quests, and earn Spark Points. It features secure authentication, media uploads, and cloud integration to deliver a personalized and engaging self-care experience.

---

## ✅ Features

### 🌈 Mood Reflections
- Users can log their daily moods (happy, sad, anxious, angry).
- Based on the selected mood, the system assigns a **personalized quest**.
- Users submit reflections with optional **media (image/audio/video)** via Cloudinary.

### 📅 Daily Quests
- Every user receives a rotating **day-wise daily quest**.
- Users can complete the quest with text/media and earn **bonus Spark Points**.
- Prevents duplicate submissions using date tracking.

### 💡 Spark Points & Rewards
- Reflections and quests reward users with Spark Points.
- Rewards page shows redeemable items with cost.
- Points update dynamically after submissions or redemptions.

### 📊 Analytics (Optional)
- Mood statistics and reflection counts visualized per user.
- Last reflection timestamp shown for tracking progress.

### 🔐 User Authentication
- Secure user registration & login with JWT tokens.
- Middleware protection for routes and reflection access.

---

## 🧱 Technology Stack

- **Frontend:** React, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT  
- **Media Uploads:** Cloudinary  
- **Styling:** Bootstrap + Custom CSS  
- **Deployment-Ready:** Clean structure, modular routes and components  

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/tiya-v25/Solo-Sparks.git
cd Solo-Sparks
```

### 2️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4️⃣ Setup Environment Variables (in `/backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5️⃣ Run the App (Dev Mode)
```bash
# In one terminal (backend)
cd backend
npm start

# In another terminal (frontend)
cd frontend
npm start
```

---

## 📁 Project Structure

```
Solo-Sparks/
├── backend/
│   ├── models/               # Mongoose schemas: User, Reflection, Quest, Completion
│   ├── routes/               # Modular route files (auth, reflection, quest, rewards)
│   ├── middleware/           # JWT auth
│   ├── utils/                # Cloudinary config
│   └── server.js             # Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, DailyQuest, Rewards, Analytics
│   │   ├── pages/            # MoodPage, Dashboard, Login, Register, QuestPage
│   │   └── App.js            # Frontend routes
│   └── public/
│
├── .env                      # (excluded)
├── .gitignore
└── README.md
```

---

## ✅ Highlights

- ✅ Mood-based dynamic quests  
- ✅ Daily quest engine (auto-rotating)  
- ✅ JWT-protected routes  
- ✅ Cloudinary media handling  
- ✅ Points system & reward redemption  
- ✅ Modular code with future scalability  

---

## 🙌 Conclusion

Solo Sparks is more than just a project — it's a wellness ecosystem combining behavior, incentives, and simplicity. It reflects skills in:
- Full-stack development  
- Secure authentication  
- REST API & cloud integrations  
- Real-world UX thinking  

This project is ready to be extended with habit tracking, weekly streaks, community features and more!

---
