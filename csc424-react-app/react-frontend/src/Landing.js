import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthProvider";
import { getUsers } from "./apihelper";
import Table from "./Table";

const Landing = () => {
  const { value } = useAuth();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    getUsers(token)
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h2>Landing (Protected)</h2>
      <Table characterData={characters} />
      <div> Authenticated as {document.cookie.split("=")[1]}</div>
    </>
  );
};

export default Landing;

