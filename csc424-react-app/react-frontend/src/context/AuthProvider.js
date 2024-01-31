import { createContext, useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');



  const handleRegister = async (token) => {

		console.log("here");

        setToken(token);

        // document.cookie = `token=${response.data.token}`;
        document.cookie = `token=${token}`;
		console.log(document.cookie);
		console.log("still here");
		//await new Promise(resolve => setTimeout(resolve, 0));
		navigate('/landing');

  };

    const handleLogin = async () => {
      try {
        const response = await axios.post('https://localhost:8000/account/login', {value});
        console.log(response);
        if(response.status === 201){
          setToken(response.data.token);
          
          //document.cookie = `token=${token}`;
          document.cookie = `token=${response.data.token}`;
		  console.log(document.cookie);

          navigate('/landing');
        }
     }
     catch (error) {

      alert(JSON.stringify(error.response.data.message))
     }
    };

  const handleLogout = () => {
    setToken(null);
    document.cookie = `token=;max-age=300`
  };

  const value = {
    token,
    setToken: setToken,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  };


  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);
