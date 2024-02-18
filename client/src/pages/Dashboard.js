import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from 'react-auth-kit';
import CNavbar from './components/CNavbar';
import UserProfile from './components/UserProfile';
import MyInternships from './components/MyInternships';

function App() {
  const auth = useAuthUser()
  const Session = auth().session

  const signOut = useSignOut();
  const navigate = useNavigate();

  function logout() {
    signOut();
    navigate("/Login");
    localStorage.removeItem("SessionInfo");
    localStorage.removeItem("SessionEmail");
  }

  useEffect(() => {
    if (Session === "admin") {
      logout()
    }
  });

  return (
    <div>
      <CNavbar />

      <UserProfile />

      <MyInternships />

    </div>
  );
}

export default App;
