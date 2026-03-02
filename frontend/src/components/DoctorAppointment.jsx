import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const DoctorAppointment = () => {
    const navigate = useNavigate()
    return (
        <div className='mt-40 bg-header-bg flex rounded-lg px-6 md:px-10 lg:px-20'>
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-20'>
                <h1 className='text-white font-semibold text-xl sm:text-2xl  md:text-3xl lg:text-5xl '>Book Appointment <br />
                    With 100+ Trusted Doctors</h1>
                <button onClick={() => { navigate('/'); scrollTo(0, 0) }} className='mt-4 px-4 py-2 bg-white rounded-4xl text-gray-500 hover:text-gray-700 cursor-pointer text-[14px]'>Create Account</button>
            </div>
            <div className='hidden md:block relative lg:w-2/5'>
                <img src={assets.appointment_img} alt={assets.appointment_img} className='w-full md:absolute -bottom-0.5 h-auto rounded-lg' />
            </div>
        </div>
    )
}

export default DoctorAppointment