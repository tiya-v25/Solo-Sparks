import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { div } from "framer-motion/client";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/mood");
    } catch (err) {
      alert("Invalid credentials or error logging in.");
      console.error(err);
    }
  };

  return (
    <div className="container ">
      <form onSubmit={handleLogin} >
        <h2 className="h3 mb-3 fw-normal">Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default Login;
