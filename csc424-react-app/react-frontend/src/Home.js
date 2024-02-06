import { useAuth } from "./context/AuthProvider";
import React,  { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { value } = useAuth();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async () => {
    value.username = username;
    value.password = password;
    value.onLogin();
};


  function handleClick() {
    navigate("/register");
  }

  return (
    <>
      <h2> Home (Public)</h2>

      {value.errorMessage}

      <form>
          <p>Username</p>
          <input 
            type="text" 
            name="name"
            id="name"
            value={username} onChange={(e)=>setName(e.target.value)}/>
          <p>Password</p>
          <input 
          type="password"
          name="password"
          id="password"
          value={password} onChange={(e)=>setPassword(e.target.value)}
          />
        </form>
        <div>
        <button type="submit" onClick={handleSubmit}>
          Sign In
        </button>
        <button type="button" onClick={handleClick}>
          New User? Register here!
        </button>
        </div>

    </>
  );
};

export default Home;
