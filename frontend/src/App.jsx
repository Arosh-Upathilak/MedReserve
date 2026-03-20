import React, { useEffect } from 'react'
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
import { useAuthStore } from './store/useAuthStore';
import axios from 'axios';


function App() {
  const location = useLocation()
  const state = location.state;
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const backendUrl = useAuthStore((state) => state.backendUrl);


  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(`${backendUrl}/Auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
      } catch (error) {
        logout();
        window.location.href = "/";
        console.error(error)
      }
    };

    if (token) verifyToken();
    // eslint-disable-next-line 
  }, [token, backendUrl]);

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
          <Route path="/my-appointment" element={<PrivateRoute> <MyAppointments /></PrivateRoute>} />
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