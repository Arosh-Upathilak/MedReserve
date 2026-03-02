import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
    return (
        <div className='my-5 bg-header-bg flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20'>
            <div className='md:w-1/2 flex md:items-start flex-col justify-center gap-6 m-auto md:py-[10vw] md:-mb-10 py-10 items-center'>
                <p className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight '>
                    Book Appointment <br />
                    With Trusted Doctors
                </p>
                <div className='flex items-center justify-center flex-col md:flex-row gap-4'>
                    <img src={assets.group_profiles} alt="group profile" />
                    <p className='text-[12px] text-white font-light'>
                        Simply browse through our extensive list of trusted doctors,<br />
                        schedule your appointment hassle-free.
                    </p>
                </div>
                <a href='' className='flex items-center justify-center gap-2 text-gray-500 md:text-sm text-[12px] bg-white py-2 px-4 rounded-4xl hover:scale-105 transition-transform duration-200'>
                    <p>Book Appointment</p>
                    <img src={assets.arrow_icon} alt="arrow" className='w-3 h-3' />
                </a>
            </div>
            <div className='md:w-1/2 relative flex items-center justify-center'>
                <img src={assets.header_img} alt='header image' className='w-full md:absolute bottom-0 h-auto rounded-lg'/>
            </div>
        </div>
    )
}

export default Header