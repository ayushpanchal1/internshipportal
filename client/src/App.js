import React from 'react'

    // Genuinely don't know why but this bootstrap import used to be in the Dashboard.js file and if you removed it, 
    // the colors would switch back to default. It works fine here. Do not Touch.

import 'bootstrap/dist/css/bootstrap.css'; // DO NOT remove this


import './style/custom.scss'
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import StudentLogin from './pages/student/StudentLogin'
import Signup from './pages/common/Signup'
import StudentDashboard from './pages/student/StudentDashboard'
import Homepage from './pages/common/Homepage'
import Notifs from './pages/common/Notifs'
import StudentCompletedInternship from './pages/student/StudentCompletedInternship'
import StudentAddRequest from './pages/student/StudentAddRequest'
import StudentViewRequests from './pages/student/StudentViewRequests'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherLogin from './pages/teacher/TeacherLogin'
import TeacherPostNotifs from './pages/teacher/TeacherPostNotifs'
import TeacherSearch from './pages/teacher/TeacherSearch'
import { AuthProvider, RequireAuth } from 'react-auth-kit';
// import { RoleProvider } from './services/RoleContext'
// import { RedirectStudent, RedirectTeacher } from './services/RedirectBasedOnRole'

const App = () => {
  return (
    <div>
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
      {/* <RoleProvider> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/Signup" exact element={<Signup/>} />
          <Route path="/Notifications" exact element={<RequireAuth loginPath='/student/StudentLogin'><Notifs/></RequireAuth>} />
          <Route path="/student/StudentLogin" exact element={<StudentLogin/>} />
          <Route path="/student/StudentDashboard" exact element={<RequireAuth loginPath='/student/StudentLogin'><StudentDashboard/></RequireAuth>} />
          <Route path="/student/StudentCompletedInternship" exact element={<RequireAuth loginPath='/student/StudentLogin'><StudentCompletedInternship/></RequireAuth>} />
          <Route path="/student/StudentAddRequest" exact element={<RequireAuth loginPath='/student/StudentLogin'><StudentAddRequest/></RequireAuth>} />
          <Route path="/student/StudentViewRequests" exact element={<RequireAuth loginPath='/student/StudentLogin'><StudentViewRequests/></RequireAuth>} />
          <Route path="/teacher/TeacherLogin" exact element={<TeacherLogin/>} />          
          <Route path="/teacher/TeacherDashboard" exact element={<RequireAuth loginPath='/teacher/TeacherLogin'><TeacherDashboard/></RequireAuth>} />
          <Route path="/teacher/TeacherPostNotifs" exact element={<RequireAuth loginPath='/teacher/TeacherLogin'><TeacherPostNotifs/></RequireAuth>} />
          <Route path="/teacher/TeacherSearch" exact element={<RequireAuth loginPath='/teacher/TeacherLogin'><TeacherSearch/></RequireAuth>} />
        </Routes>
        </BrowserRouter>
        {/* </RoleProvider> */}
      </AuthProvider>
    </div>
  )
}

export default App
