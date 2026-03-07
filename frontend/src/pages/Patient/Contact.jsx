import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'

const contact = () => {
  return (
    <div className='my-10'>
      <h1 className='text-2xl text-gray-600 text-center'>CONTACT <span className='text-black font-medium'>US</span></h1>
      <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='flex items-end justify-end w-full'>
          <img src={assets.contact_image} alt={assets.contact_image} className="w-96 h-auto object-cover"/>
        </div>
        <div className='space-y-5 flex flex-col items-start justify-center'>
          <h1 className='font-semibold text-gray-600 '>OUR OFFICE</h1>
          <p className='text-[14px] text-gray-600'>00000 Willms Station<br/>Suite 000, Washington, USA</p>
          <p className='text-[14px] text-gray-600'>Tel: (000) 000-0000<br/>Email: greatstackdev@gmail.com</p>
          <h1 className='font-semibold text-gray-600'>CAREERS AT PRESCRIPTO</h1>
          <p className='text-[14px] text-gray-600'>Learn more about our teams and job openings.</p>
          <button className='border text-[14px] p-4 hover:text-white hover:bg-black cursor-pointer duration-200'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default contact