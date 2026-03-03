import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Patient/Home';
import Doctors from './pages/Patient/Doctors';
import About from './pages/Patient/About';
import Contact from './pages/Patient/Contact';
import MyAppointments from './pages/Patient/MyAppointments';
import MyProfile from './pages/Patient/MyProfile';
import DoctorDetails from './pages/Patient/DoctorDetails';
import Auth from './pages/CommonPage/Auth';
import Dashboard from './pages/Admin/Dashboard';
import Appointment from './pages/Admin/Appointment';
import PatientList from './pages/Admin/PatientList';
import DoctorList from './pages/Admin/DoctorList';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

function App() {
  const location = useLocation();
  const backgroundLocation = location.state && location.state.backgroundLocation;

  return (
    <Routes location={backgroundLocation || location}>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointment" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Route>

      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/reset-password" element={<Auth />} />
      <Route path="/forgot-password" element={<Auth />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/appointment" element={<Appointment />} />
        <Route path="/admin/doctor-list" element={<DoctorList />} />
         <Route path="/admin/patient-list" element={<PatientList />} />
      </Route>

    </Routes>
  )
}

export default App;