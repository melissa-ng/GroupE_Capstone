import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import GoogleAuth from './GoogleAuth.jsx'; // Adjust the path based on the file structure


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    // Mock authentication (replace with real authentication logic)
    if (email === "user@example.com" && password === "password") {
      navigate("/dashboard"); // Redirect to dashboard on success
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1>Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <GoogleAuth></GoogleAuth>
      </div>
    </div>
  );
}
