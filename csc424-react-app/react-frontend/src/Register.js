
import { useAuth } from "./context/AuthProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
    const { value } = useAuth();
    const navigate = useNavigate();
	const [registerUser, setRegisterUser] = useState("");
	const [registerPass, setRegisterPass] = useState("");
	const [registerValidatedPass, setRegisterValidatedPass] = useState("");


const handleRegister = async () => {
    try {
        const response = await axios.post('http://localhost:8000/account/register', {
            username: registerUser,
            password: registerPass,
            validatePassword: registerValidatedPass
        });
        navigate("/landing");
    } catch (error) {
        alert(error.response.data);
        console.log(error);
    }
};



    return (
    <>	
	  <div>
    <h2>Register (Public)</h2>

    <div>
      <label htmlFor="Username">Username:</label>
      <input type="text" id="registerUser" />
    </div>

    <div>
      <label htmlFor="Password1">Password:</label>
      <input type="password" id="registerPass" />
    </div>

	 <div>
      <label htmlFor="Password2">Confirm Password:</label>
      <input type="password" id="registerValidatedPass" />
    </div>
	
    <div>
      <button type="button" onClick={handleRegister}>
        Register
      </button>
    </div>
  </div>
    </>
);
};
