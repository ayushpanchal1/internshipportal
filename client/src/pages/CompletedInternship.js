import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import CNavbar from './components/CNavbar';
import CompletedinternshipForm from './components/CompletedInternshipForm';

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
    if (Session === "admin") {
      logout()
    }
  });

  return (
    <div>
      <CNavbar />

      <CompletedinternshipForm />
    </div>
  );
}

export default App;
