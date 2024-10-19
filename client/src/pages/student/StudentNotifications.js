//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import CNavbar from '../common/components/CNavbar';
import StudentNotificationComponent from './components/StudentNotificationsComponent';

function App() {
  //console.log(Email)
  return (
    <div>
      <CNavbar />
      <StudentNotificationComponent />
    </div>
  );
}

export default App;

