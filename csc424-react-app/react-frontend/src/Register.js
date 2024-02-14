import React, { useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { HandleRegistrationAttempt } from "./apihelper";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { value } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    value.username = username;
    value.password = password;
    value.phone = phone;
    HandleRegistrationAttempt({ username: value.username, password: value.password, password2: password2, phone: value.phone })
      .then((res) => res.json())
      .then((res) => {
        value.onLogin(res.token);
        navigate("/landing");
      })
      .catch((exception) => console.log(exception));
  };

  return (
    <>
      <h2>Register (Public)</h2>
      <form>
        <label>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <input type="text" placeholder="Phone #" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <input type="password" placeholder="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Register;
