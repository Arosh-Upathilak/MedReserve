import React from 'react'

const DoctorCart = ({item,onClick}) => {
  return (
    <div className='border border-doctor-cart-border rounded-lg w-52 hover:-translate-y-2 duration-200 cursor-pointer'  onClick={onClick}>
       <div>
        <img src={item.doctorImageUrl} alt="doctor image" className='bg-doctor-cart-bg rounded-t-lg w-52 h-52'/>
        <div className='p-4'>
            <p className='font-semibold text-md'>{item.doctorName}</p>
            <p className='text-gray-500 text-[12px]'>{item.speciality}</p>
        </div>
       </div>
    </div>
  )
}

export default DoctorCart