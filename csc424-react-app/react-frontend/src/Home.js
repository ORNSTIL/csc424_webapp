import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { NavLink } from "react-router-dom";
import axios from 'axios';

export const Home = () => {
    const { value } = useAuth();
	const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
	
	const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/account/login', {
        username,
        password,
      });

      value.onLogin(response.data.token);

      setLoginError(false);
    } catch (error) {
      setLoginError(true);
    }
  };

    return (
    <>
  <div>
    <h2>Home (Public)</h2>
	{loginError && <p style={{ color: "red" }}>Failed login attempt</p>}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    <div>
      <button type="button" onClick={handleLogin}>
        Sign In
      </button>
    </div>

    <div>
      <NavLink to="/register">New User? Register Here</NavLink>
    </div>
  </div>
</>

);
};
