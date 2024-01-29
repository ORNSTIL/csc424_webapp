import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    const { value } = useAuth(); 
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
	const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
		try {
            if(password === confirmPassword){
            
            let user = {
                username: username,
                phoneNumber: phoneNumber,
                password: password,
                //confirmPassword: confirmPassword
            } 
            const response = await axios.post('https://localhost:8000/account/register', {user});
            console.log(response);
            if(response.status === 201){
				console.log("yo");
                value.onRegister(response.data);
				//navigate("/landing");
            }
            else{
                alert("Register failed.");
            }
        }
        else{
            alert("Passwords do not match.");
        }
        } catch (error) {
            alert(JSON.stringify(error.response.data.message));
        }
    }

    return (
        <>
        <div>
            <h2>Sign Up</h2>
            <form>
                <p>Username</p>
                <input 
                    type="text" 
                    name="Username" 
                    value={username} onChange={e => setName(e.target.value)}/>
                <p>Phone Number</p>
                <input 
                    type="text" 
                    name="Phone Number" 
                    value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                <p>Password</p>
                <input 
                    type="password" 
                    name="Password" 
                    value={password} onChange={e => setPassword(e.target.value)}/>
                <p>Confirm Password</p>
                <input 
                    type="password" 
                    name="Confirm Password" 
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </form>
            <button type="submit" onClick={handleSubmit}>
                Sign Up
            </button>
        </div>
        </>
    );
};

export default Register;
