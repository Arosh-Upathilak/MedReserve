import React from 'react'
import { dummyAppointments } from '../../assets/assets_frontend/assets'

const MyAppointments = () => {
  return (
    <div className='my-10'>
      <h1>My Appointments</h1>
      <div className='mt-4 flex flex-col '>
        {
          dummyAppointments.map((item, index) => (
            <div className={`flex justify-between items-center gap-4 flex-col md:flex-row border-b border-gray-300 py-3 ${index === 0 ? 'border-t border-gray-300' : ''}`}>
              <div className='flex items-center sm:items-start flex-col sm:flex-row gap-4'>
                <div className='bg-doctor-cart-bg'>
                  <img src={item.image} alt="doctor image" className='w-40 h-40' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-[15px]'>{item.doctorName}</p>
                  <p className='text-[13px] text-gray-600'>{item.speciality}</p>
                  <p className='text-[13px] font-medium'>Date & Time: <span className='text-gray-600 '>{item.date}</span></p>
                  <p className='text-[13px] font-medium'>Appontment Number: <span className='text-gray-600 '>{item.date}</span></p>
                  <p className='text-[13px] font-medium'>Price: <span className='text-gray-600 '>{item.date}</span></p>
                </div>
              </div>

              <div className='flex flex-col justify-between md:justify-end  gap-4'>
                <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-about-hover hover:text-white rounded-md'>
                  Pay Online
                </button>
                <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-cancel-btn hover:text-white rounded-md'>
                    Cancel Appointment
                </button>
              </div>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default MyAppointments