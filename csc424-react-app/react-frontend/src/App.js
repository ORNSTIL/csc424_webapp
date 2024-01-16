import { Routes, Route, Link, NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Register } from "./Register";
export const AuthContext = React.createContext(null);  // we will use this in other components
const App = () => {
  const [token, setToken] = React.useState(null);
  const [user, setUser] = React.useState(null);

  const handleLogin = async () => {

    const token = await fakeAuth();
    setToken(token);

};

    const handleLogout = () => {
    setToken(null);
};
  <Navigation token={token} onLogout={handleLogout} />

return (

<AuthProvider>
    <Navigation />
   
    <h1>React Router</h1>

    <Routes>
      <Route index element={<Home />} />
      <Route
		path="landing"
		element={
			<ProtectedRoute>
				<Landing />
			</ProtectedRoute>
		}
		/>
      <Route path="home" element={<Home />} />
	  <Route path="register" element={<Register />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </AuthProvider>
);
};

const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/landing">Landing</NavLink>
      {value.token && (
        <button type="button" onClick={value.onLogout}>
          Sign Out
   </button>
)}
  </nav>
);
}
export default App;
