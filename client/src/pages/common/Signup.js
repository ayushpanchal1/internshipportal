
import React from 'react'
import CNavbar from './components/CNavbar'; // Import the Navbar component
import SignupForm from './components/SignupForm';

function App() {

  return (
    <div>
      <CNavbar /> {/* Use the Navbar component here */}
      {/* <br/><br/><br/><br/><br/> */}
      <SignupForm />
    </div>
  );
}

export default App;
