import { useAuth } from "./context/AuthProvider";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from './Table';

export const Landing = () => {
  const { value } = useAuth();
  const [tableUsers, setTableUsers] = useState([]);

  /*useEffect(() => {
    axios.get('https://localhost:8000/account/users'
    ).then( response => {
      if(response){
        setTableUsers(response.data);
      }
    });
  },[setTableUsers]);
  */
  async function fetchAll() {
   /* if (token) console.log("fetchall Authorization: Bearer " + token);
    else {
      token = value.token;
      console.log("fetchall Authorization: Bearer " + value.token);
    }*/
	//console.log("in fetch all");
    try {
	//	console.log(value.token);
      const response = await axios.get(
        'https://localhost:8000/account/users',
        {
          headers: { Authorization: `bearer ${value.token}` },
        }
      );
	  console.log(response.data);
      return response;
    } catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
	//  console.log("in use effect");
    fetchAll().then( response => {
		//console.log("ayo");
      if(response){
		 console.log(response.data);
		 console.log("space");
        setTableUsers(response.data);
		console.log(tableUsers);
      }

    });
  },[tableUsers]);
//console.log("in landing");
//console.log(value.token);
  return (
    <>
      <h2>Landing (Protected)</h2>
      <div>Authenticated as {value.token}</div>
      <Table contacts={tableUsers} />
    </>
  );
};

export default Landing;
