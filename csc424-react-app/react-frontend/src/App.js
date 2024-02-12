import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Navigation from "./Navigation";
import Home from "./Home";
import Landing from "./Landing";
import Register from "./Register";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <h1>React Router</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path="landing" element={<Landing />} />
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
