import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Patient/Home';
import Doctors from './pages/Patient/Doctors';
import About from './pages/Patient/About';
import Contact from './pages/Patient/Contact';
import NavBar from './components/NavBar';
import MyAppointments from './pages/Patient/MyAppointments'
import MyProfile from './pages/Patient/MyProfile'
import Fotter from './components/Fotter';
import DoctorDetails from './pages/Patient/DoctorDetails';
import Auth from './pages/CommonPage/Auth'

function App() {
  const location = useLocation();

  const backgroundLocation = location.state && location.state.backgroundLocation;
  console.log(backgroundLocation)
  return (
    <>
      <div className='sm:mx-[10%] mx-4'>
        <NavBar />
        <Routes location={backgroundLocation || location}>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-appointment" element={<MyAppointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
        <Fotter />
      </div>

      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/reset-password" element={<Auth />} />
        <Route path="/forgot-password" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App