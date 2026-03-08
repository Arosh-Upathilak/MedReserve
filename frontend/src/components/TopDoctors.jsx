import React from 'react'
import DoctorCart from './DoctorCart'
import { doctors } from "../assets/assets_frontend/assets";

const TopDoctors = () => {
    return (
        <div className='my-10'>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl md:text-3xl font-semibold"> Top Doctors to Book </h1>
                <p className="text-center text-[12px] text-gray-600">
                    Simply browse through our extensive list of trusted doctors.
                </p>
            </div>
            <div className='mt-10 flex items-center justify-center flex-wrap gap-4'>
                {
                    doctors.slice(0, 5).map(item => <DoctorCart key={item._id} item={item} />)
                }
            </div>
            <div className='mt-10 flex items-center justify-center'>
                <a href='/doctors' className=' px-4 py-2 text-[14px] text-gray-500 hover:text-gray-800 cursor-pointer bg-doctor-cart-bg rounded-2xl'>more</a>
            </div>
        </div>
    )
}

export default TopDoctors