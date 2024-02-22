import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import TeacherPostNotifsForm from './components/TeacherPostNotifsForm';
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

      <TeacherPostNotifsForm />
    </div>
  );
}

export default App;
