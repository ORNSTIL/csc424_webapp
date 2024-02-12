import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { HandleLoginAttempt, requestOath } from "./apihelper";

const Home = () => {
  const { value } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    value.username = username;
    value.password = password;
    HandleLoginAttempt({ username: value.username, password: value.password })
      .then((res) => res.json())
      .then((res) => {
        value.onLogin(res.token);
        navigate("/landing");
      })
      .catch((exception) => console.log(exception));
  };

  const handleGoogle = () => {
    requestOath()
      .then((res) => res.json())
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((exception) => console.log(exception));
  };

  return (
    <>
      <h2>Home (Public)</h2>
      <form>
        <label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Sign In
        </button>
        <button type="button" onClick={handleGoogle}>
          Google Sign In
        </button>
        <button type="button" onClick={() => navigate("/register")}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Home;

