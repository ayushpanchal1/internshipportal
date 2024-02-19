import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from '../common/components/CNavbar';
import AdminPostNotifsForm from './components/TeacherPostNotifsForm';

function App() {
    const auth = useAuthUser()
    const Session = auth().session

    const signOut = useSignOut();
    const navigate = useNavigate();

    function logout() {
        signOut();
        navigate("/login");
    }
    
    useEffect(() => {
      //Runs on every render
      if(Session==="user"){
        logout()
      }
    });

  return (
    <div>
      <CNavbar />

      <AdminPostNotifsForm />
    </div>
  );
}

export default App;
