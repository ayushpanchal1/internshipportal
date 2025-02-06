import React from 'react'

// Genuinely don't know why but this bootstrap import used to be in the Dashboard.js file and if you removed it,
// the colors would switch back to default. It works fine here. Do not Touch.

import 'bootstrap/dist/css/bootstrap.css' // DO NOT remove this

import './style/custom.scss'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import StudentLogin from './pages/student/StudentLogin'
import Signup from './pages/common/Signup'
import StudentDashboard from './pages/student/StudentDashboard'
import Homepage from './pages/common/Homepage'
import Announcements from './pages/common/Announcements'
import StudentCompletedInternship from './pages/student/StudentCompletedInternship'
import StudentAddRequest from './pages/student/StudentAddRequest'
import StudentViewRequests from './pages/student/StudentViewRequests'
import StudentNotifications from './pages/student/StudentNotifications'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherLogin from './pages/teacher/TeacherLogin'
import TeacherPostAnnouncements from './pages/teacher/TeacherPostAnnouncements'
import TeacherApproveRequests from './pages/teacher/TeacherApproveRequests'
import TeacherSearch from './pages/teacher/TeacherSearch'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { ToastContainer } from 'react-toastify'
import UserProfile from './pages/teacher/components/StudentInfo'

// import { RoleProvider } from './services/RoleContext'
// import { RedirectStudent, RedirectTeacher } from './services/RedirectBasedOnRole'

const App = () => {
  return (
    <div>
      <ToastContainer position='top-center' autoClose={2000} hideProgressBar />
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        {/* <RoleProvider> */}
        <BrowserRouter>
          <Routes>
          <Route path='/student/*' element={<Navigate to='/student/StudentDashboard' />} />
            <Route path='/teacher/*' element={<Navigate to='/teacher/TeacherDashboard' />} />
            <Route path='/' exact element={<Homepage />} />
            <Route path='/Signup' exact element={<Signup />} />
            <Route path='/Signup*' exact element={<Navigate to = '' />} />
            <Route
              path='/Announcements'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <Announcements />
                </RequireAuth>
              }
            />
            <Route
              path='/student/StudentLogin'
              exact
              element={<StudentLogin />}
            />
            <Route
              path='/student/StudentDashboard'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <StudentDashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/student/StudentCompletedInternship'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <StudentCompletedInternship />
                </RequireAuth>
              }
            />
            <Route
              path='/student/StudentAddRequest'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <StudentAddRequest />
                </RequireAuth>
              }
            />
            <Route
              path='/student/StudentViewRequests'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <StudentViewRequests />
                </RequireAuth>
              }
            />
            <Route
              path='/student/StudentNotifications'
              exact
              element={
                <RequireAuth loginPath='/student/StudentLogin'>
                  <StudentNotifications />
                </RequireAuth>
              }
            />
            <Route
              path='/teacher/TeacherLogin'
              exact
              element={<TeacherLogin />}
            />
            <Route
              path='/teacher/TeacherDashboard'
              exact
              element={
                <RequireAuth loginPath='/teacher/TeacherLogin'>
                  <TeacherDashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/teacher/TeacherPostAnnouncements'
              exact
              element={
                <RequireAuth loginPath='/teacher/TeacherLogin'>
                  <TeacherPostAnnouncements />
                </RequireAuth>
              }
            />
            <Route
              path='/teacher/TeacherApproveRequests'
              exact
              element={
                <RequireAuth loginPath='/teacher/TeacherLogin'>
                  <TeacherApproveRequests />
                </RequireAuth>
              }
            />
            <Route
              path='/teacher/TeacherSearch'
              exact
              element={
                <RequireAuth loginPath='/teacher/TeacherLogin'>
                  <TeacherSearch />
                </RequireAuth>
              }
            />
            <Route
              path='/teacher/TeacherSearch/StudentInfo/:id'
              exact
              element={
                <RequireAuth loginPath='/teacher/TeacherLogin'>
                  <UserProfile />
                </RequireAuth>
              }
            />
          </Routes>
          
        </BrowserRouter>
        {/* </RoleProvider> */}
      </AuthProvider>
    </div>
  )
}

export default App
