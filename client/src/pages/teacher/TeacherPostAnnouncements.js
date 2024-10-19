import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import TeacherPostAnnouncementForm from './components/TeacherPostAnnouncementForm';
import { logout } from '../../services/Services';

function App() {
    const auth = useAuthUser()
    const Session = auth().session

    const signOut = useSignOut();
    const navigate = useNavigate();
    
    useEffect(() => {
      //Runs on every render
      if(Session==="user"){
        logout(navigate, signOut);
      }
    });

  return (
    <div>
      <CNavbar />

      <TeacherPostAnnouncementForm />
    </div>
  );
}

export default App;
