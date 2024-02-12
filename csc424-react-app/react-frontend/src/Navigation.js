import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const Navigation = () => {
  const { value } = useAuth();
  const token = document.cookie && document.cookie.split("=")[1];
  
  return (
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/landing">Landing</Link>
      {token !== "null" && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

export default Navigation;
