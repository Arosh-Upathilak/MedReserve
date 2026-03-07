import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Home from './pages/Patient/Home'
import Doctors from './pages/Patient/Doctors'
import About from './pages/Patient/About'
import Contact from './pages/Patient/Contact'
import MyAppointments from './pages/Patient/MyAppointments'
import MyProfile from './pages/Patient/MyProfile'
import DoctorDetails from './pages/Patient/DoctorDetails'

import Auth from './pages/CommonPage/Auth'

import Dashboard from './pages/Admin/Dashboard'
import Appointment from './pages/Admin/Appointment'
import PatientList from './pages/Admin/PatientList'
import DoctorList from './pages/Admin/DoctorList'

import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

import DeletePopUp from './components/DeletePopUp'
import PrivateRoute from './components/PrivateRoute'
import ResetPassword from './pages/CommonPage/ResetPassword';

function App() {
  const location = useLocation()
  const state = location.state

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes location={state?.backgroundLocation || location}>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-appointment" element={ <PrivateRoute> <MyAppointments /></PrivateRoute>} />
          <Route path="/my-profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<PrivateRoute role="Admin"><Dashboard /></PrivateRoute>} />
          <Route path="/admin/appointment" element={<PrivateRoute role="Admin"><Appointment /></PrivateRoute>} />
          <Route path="/admin/doctor-list" element={<PrivateRoute role="Admin"><DoctorList /></PrivateRoute>} />
          <Route path="/admin/patient-list" element={<PrivateRoute role="Admin"><PatientList /></PrivateRoute>} />
        </Route>

         <Route path="/resetpassword/:token" element={<ResetPassword />} />

      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/forgot-password" element={<Auth />} />
          <Route path="/verify" element={<Auth />} />
        </Routes>
      )}
      

      <DeletePopUp />
    </>
  )
}

export default App