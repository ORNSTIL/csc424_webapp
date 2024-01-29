import { useAuth } from "./context/AuthProvider.js";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Table from './Table.js';

export const Landing = () => {
  const { value } = useAuth();
  const [tableUsers, setTableUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:8000/account/users'
    ).then( response => {
      if(response){
        setTableUsers(response.data);
      }
    });
  },[setTableUsers]);

  return (
    <>
      <h2>Landing (Protected)</h2>
      <div> Authenticated as {value.token}</div>
      <Table contacts={tableUsers} />
    </>
  );
};

export default Landing;
