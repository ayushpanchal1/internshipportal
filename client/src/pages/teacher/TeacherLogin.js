import React from 'react'
import CNavbar from '../common/components/CNavbar'; // Import the Navbar component
import LoginForm from '../common/components/LoginForm';
// import './components/red.css'
// import './style/custom.scss'

function App() {
  
  return (
    <div>
      <CNavbar /> {/* Using the Navbar component here */}
      <LoginForm />
    </div>
  );
}

export default App;
