
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import TeacherProfile from './components/TeacherProfile';
import TeacherMyNotifs from './components/TeacherMyNotifs';
import { logout } from '../../services/Services';

function App() {
  const auth = useAuthUser()
  const Session = auth().session

  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    //Runs on every render
    if (Session === "user") {
      logout(navigate, signOut)
    }
  }, []);

  return (
    <div>
      <CNavbar />
      <TeacherProfile />
      <TeacherMyNotifs />
    </div>
  );
}

export default App;
