import { useAuth } from "./context/AuthProvider";
import React, { useState } from "react";
export const Home = () => {
  const { value } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const handleLogin = async () => {
    if (username === "bj" && password === "pass424") {
      value.onLogin();
    } else {
      setLoginError(true);
    }
  };
  return (
    <>
      <h2>Home</h2>
      {loginError && <p style={{ color: "red" }}>Error: invalid username or password entered</p>}
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