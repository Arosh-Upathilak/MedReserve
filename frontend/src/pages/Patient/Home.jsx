import React from 'react'
import Header from '../../components/Header'
import SpectialDoctors from '../../components/SpectialDoctors'
import TopDoctors from '../../components/TopDoctors'
import DoctorAppointment from '../../components/DoctorAppointment'

const Home = () => {
  return (
    <div>
      <Header />
      <SpectialDoctors />
      <TopDoctors />
      <DoctorAppointment />
    </div>
  )
}

export default Home