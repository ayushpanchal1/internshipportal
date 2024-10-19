import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSignOut } from 'react-auth-kit';
import { useAuthUser } from 'react-auth-kit';
import { logout } from '../../services/Services';
import CNavbar from '../common/components/CNavbar';
import Requests from './components/StudentMyRequests';


function App() {
    //console.log(Email)

    const auth = useAuthUser()
    const Session = auth().session

    const signOut = useSignOut();
    const navigate = useNavigate();

    useEffect(() => {
        //Runs on every render
        if (Session === "admin") {
            logout(navigate, signOut)
        }
    }, []);

    return (
        <div>
            <CNavbar />
            <Requests />
        </div>
    );
}

export default App;

