import React, { useState } from 'react'
import { doctorsData } from '../../assets/assets_admin/assets';
import { IoMdAdd } from "react-icons/io";
import AddDoctor from '../../components/AddDoctor';
import EditDoctor from '../../components/EditDoctor';
import { useDeleteStore } from "../../store/useDeleteStore";


const DoctorList = () => {
  const [addDoctor,setAddDoctor] = useState(false)
  const [editDoctor,setEditDoctor] = useState(false)
  const openDelete = useDeleteStore((state) => state.openDelete);
  return (
    <div>
      <h1 className='text-2xl font-semibold'>Doctor List</h1>
      <div className='flex justify-end items-center'>
        <button onClick={()=>setAddDoctor(true)} className='flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-btn-bg hover:bg-btn-bg-hover text-white text-[14px]' >
          <IoMdAdd /> Add Appointments
        </button>
      </div>

      <div className='mt-2 flex flex-col'>
        {
          doctorsData.map((item, index) => (
            <div
              key={item.id}
              className={`flex justify-between items-center gap-4 flex-col md:flex-row border-b border-gray-300 py-3 ${index === 0 ? 'border-t border-gray-300' : ''}`}
            >
              <div className='flex items-center sm:items-start flex-col sm:flex-row gap-4'>

                <div className='bg-doctor-cart-bg  rounded-md'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-40 h-40 object-cover rounded-md'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-[16px]'>{item.name}</p>
                  <p className='text-[14px] text-gray-600'>{item.speciality}</p>
                  <p className='text-[13px] font-medium'>
                    Education: <span className='text-gray-600'>{item.education}</span>
                  </p>
                  <p className='text-[13px] font-medium'>
                    Experience: <span className='text-gray-600'>{item.experience}</span>
                  </p>
                  <p className='text-[13px] font-medium'>
                    Email: <span className='text-gray-600'>{item.email}</span>
                  </p>
                  <p className='text-[13px] text-gray-600 mt-2'>
                    {item.about}
                  </p>
                </div>

              </div>

              <div className='flex flex-col justify-end gap-4'>
                <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-blue-600 hover:text-white rounded-md' onClick={()=>setEditDoctor(true)}>
                  Edit Details
                </button>
                <button  onClick={()=>openDelete()}
                className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-red-500 hover:text-white rounded-md'>
                  Remove
                </button>
              </div>

            </div>
          ))
        }
      </div>
      {addDoctor && <AddDoctor setAddDoctor={setAddDoctor}/>}
      {editDoctor && <EditDoctor setEditDoctor={setEditDoctor}/>}
    </div>
  )
}

export default DoctorList