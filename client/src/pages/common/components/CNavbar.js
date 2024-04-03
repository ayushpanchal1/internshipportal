// import React, { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { Container, Navbar, Nav, Modal, Button } from "react-bootstrap"
// import { useSignOut } from 'react-auth-kit';
// import { logout } from "../../../services/Services"

// function CNavbar() {
//   const Session = localStorage.getItem('SessionInfo');
//   const signOut = useSignOut();
//   const navigate = useNavigate();

//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   function handleSubmit(event){
//     logout(navigate, signOut);
//   }

//   // function logout() {
//   //   signOut();
//   //   localStorage.removeItem('SessionInfo');
//   //   localStorage.removeItem('SessionEmail');
//   //   navigate("/student/StudentLogin");
//   // }

//   return (
//     <Container>
//       <Navbar collapseOnSelect expand="lg" className="navbar fixed-top navbar-dark bg-primary">
//         <Navbar.Brand style={{ paddingLeft: "10px" }}>
//         <Link
//             to="/"
//             style={{
//               color: "inherit",
//               textDecoration: "none", // Adjust as needed
//             }}
//           >

//           <img
//             src="https://president.somaiya.edu.in/assets/oop/img/Homepage/Somaiya-logo-01.svg"
//             width="40"
//             height="40"
//             className="d-inline-block align-center"
//             alt="Logo"
//             style={{ backgroundColor: "white" }}
//           ></img>
//           &nbsp; <b1>Internship Management Portal</b1>
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav" style={{ paddingLeft: "10px" }}>
//         <Nav className="me-auto">
//           {!Session && (
//             <>
//               <li className="nav-item" style={{marginLeft:"700px"}}>
//                 <Link to={"/student/StudentLogin"} className="nav-link">
//                   Student Login
//                 </Link>
//               </li>
//               <li className="nav-item me-5">
//                 <Link to={"/Signup"} className="nav-link">
//                   Signup
//                 </Link>
//               </li>
//               <li className="nav-item me-5">
//                 <Link to={"/teacher/TeacherLogin"} className="nav-link">
//                   Teacher Login
//                 </Link>
//               </li>
//             </>)}
//           {Session === 'user' && (<><li className="nav-item">
//             <Link to={"/student/StudentDashboard"} className="nav-link">
//               Dashboard
//             </Link>
//           </li>
//             <li className="nav-item">
//               <Link to={"/student/StudentCompletedInternship"} className="nav-link">
//                 Update
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/student/StudentAddRequest"} className="nav-link">
//                 Add Request
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/student/StudentViewRequests"} className="nav-link">
//                 View Requests
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/Notifications"} className="nav-link">
//                 Notifications
//               </Link>
//             </li>
//             </>)}
//           {Session === 'admin' && (<><li className="nav-item">
//             <Link to={"/teacher/TeacherDashboard"} className="nav-link">
//               Dashboard
//             </Link>
//           </li>
//             <li className="nav-item">
//               <Link to={"/teacher/TeacherSearch"} className="nav-link">
//                 Manage
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/teacher/TeacherApproveRequests"} className="nav-link">
//                 Approve
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/teacher/TeacherPostAnnouncements"} className="nav-link">
//                 Post
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/Notifications"} className="nav-link">
//                 Notifications
//               </Link>
//             </li></>)}
//         </Nav>
//         <Nav>
//           {Session && (
//             <>
//               <li className="nav-item" style={{ marginRight: "10px" }}>
//                 <Button onClick={() => { handleShow() }} variant='info'>
//                   Log out
//                 </Button>
//               </li>
//               <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                   <Modal.Title style={{ color: "#802121" }}>Log Out</Modal.Title>
//                 </Modal.Header>

//                 <Modal.Body className=''>Are you sure you want to log out?</Modal.Body>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose}>
//                     Cancel
//                   </Button>
//                   <Button variant="primary" onClick={handleSubmit}>
//                     Yes, Proceed
//                   </Button>
//                 </Modal.Footer>
//               </Modal>
//             </>)}
//         </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     </Container>
//   )
// }

// export default CNavbar;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import { useSignOut } from "react-auth-kit";
import { logout } from "../../../services/Services";

function CNavbar() {
  const Session = localStorage.getItem("SessionInfo");
  const signOut = useSignOut();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDesktop, setIsDesktop] = useState(false);
  // this entire useEffect and this const above is to check whether the display is a desktop to apply 
  // the margins and keep signup login buttons on the right 
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768); // Adjust the breakpoint as needed
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSubmit(event) {
    logout(navigate, signOut);
  }

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar fixed-top navbar-dark bg-primary justify-content-between fs-5"
        // style={{
        //   fontSize: "18px",
        //   justifyContent: "space-between",
        //   display: "flex",
        // }}
      >
        <Navbar.Brand className="pl-5" style={{ paddingLeft: "10px" }}>
          <NavLink
            to="/"
            style={{
              color: "inherit",
              textDecoration: "none", // Adjust as needed
            }}
          >
            <img
              src="https://president.somaiya.edu.in/assets/oop/img/Homepage/Somaiya-logo-01.svg"
              width="40"
              height="40"
              className="d-inline-block align-center"
              alt="Logo"
              style={{ backgroundColor: "white", borderRadius: "4px" }}
            ></img>
            &nbsp; <b1>Internship Management Portal</b1>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ paddingLeft: "10px",flex:1 }}
        >
          <Nav className="me-auto" style={{flex:1}} >
            {!Session && (
              <>
                <NavDropdown
                  title="Login"
                  id="collasible-nav-dropdown"
                  style={{
                    marginLeft: isDesktop ? "950px" : "",
                    marginRight: isDesktop ? "40px" : "",
                    justifyContent: isDesktop ? "space-around" : "",
                    display: isDesktop ? "flex" : "block",
                    fontSize: "18px",
                    
                  }}
                >
                  <NavLink
                    to="/student/StudentLogin"
                    className="dropdown-item"
                  >
                    Student
                  </NavLink>
                  <NavLink
                    to="/teacher/TeacherLogin"
                    className="dropdown-item"
                  >
                    Teacher
                  </NavLink>
                </NavDropdown>
                <NavDropdown
                  title="Signup"
                  id="collasible-nav-dropdown"
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <NavLink to="/Signup" className="dropdown-item">
                    Student
                  </NavLink>
                  {/* <NavLink to="/admin/AdminSignup" className="dropdown-item">
                    Admin
                  </NavLink> */}
                </NavDropdown>
              </>
            )}
            {Session === "user" && (
              <>
                <li className="nav-item active" style={{ marginLeft: "35px" }}>
                  <NavLink
                    to={"/student/StudentDashboard"}
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/student/StudentCompletedInternship"}
                    className="nav-link"
                  >
                    Update
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/student/StudentAddRequest"}
                    className="nav-link"
                  >
                    Add Request
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/student/StudentViewRequests"}
                    className="nav-link"
                  >
                    View Requests
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/Announcements"} className="nav-link">
                    Announcements
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/student/StudentNotifications"} className="nav-link">
                    Notifications
                  </NavLink>
                </li>
              </>
            )}

            {Session === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink
                    to={"/teacher/TeacherDashboard"}
                    className="nav-link"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    to={"/teacher/TeacherSearch"}
                    className="nav-link"
                  >
                    Manage
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/teacher/TeacherApproveRequests"}
                    className="nav-link"
                  >
                    Approve
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"/teacher/TeacherPostAnnouncements"}
                    className="nav-link"
                  >
                    Post
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={"/Announcements"} className="nav-link">
                    Announcements
                  </NavLink>
                </li>
              </>
            )}
          </Nav>
          <Nav>
            {Session && (
              <>
                <li className="nav-item" style={{ marginRight: "10px" }}>
                  <Button onClick={() => handleShow()} variant="info">
                    Log out
                  </Button>
                </li>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ color: "#802121" }}>
                      Log Out
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="">
                    Are you sure you want to log out?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Yes, Proceed
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default CNavbar;
