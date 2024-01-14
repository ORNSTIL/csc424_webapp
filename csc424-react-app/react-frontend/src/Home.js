import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import axios from 'axios'; // Import Axios library

export const Home = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async () => {
    try {
      // Make a POST request to the login API with user credentials
      const response = await axios.post('http://localhost:8000/account/login', {
        username,
        password,
      });

      // If successful, set the token in the auth context
      value.onLogin(response.data.token);

      // Reset the loginError state
      setLoginError(false);
    } catch (error) {
      // If the login fails, set the loginError state to true
      setLoginError(true);
    }
  };

  return (
    <>
      <h2>Login</h2>
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
      <button type="button" onClick={handleLogin}>
        Log In
      </button>
    </>
  );
};
