import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut, useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import UserProfile from './components/StudentProfile';
import MyInternships from './components/StudentMyInternships';
import { logout } from "../../services/Services"

function App() {
  const auth = useAuthUser()
  const Session = auth().session

  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    if (Session === "admin") {
      logout(navigate, signOut);
    }
  }, []);

  return (
    <div>
      <CNavbar />

      <UserProfile />

      <MyInternships />

    </div>
  );
}

export default App;
