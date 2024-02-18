
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from './components/CNavbar';
import AdminProfile from './components/AdminProfile';
import AdminMyNotifs from './components/AdminMyNotifs';

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
    //Runs on every render
    if (Session === "user") {
      logout()
    }
  }, []);

  return (
    <div>
      <CNavbar />
      <AdminProfile />
      <AdminMyNotifs />
    </div>
  );
}

export default App;
