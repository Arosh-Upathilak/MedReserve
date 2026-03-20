import React, { useState, useEffect, useCallback } from 'react'
import { IoMdAdd } from "react-icons/io";
import AddDoctor from '../../components/AddDoctor';
import EditDoctor from '../../components/EditDoctor';
import { useDeleteStore } from "../../store/useDeleteStore";
import { useAuthStore } from '../../store/useAuthStore';
import { useDoctorStore } from '../../store/useDoctorStore';
import axios from 'axios';
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";


const DoctorList = () => {
  const [addDoctor, setAddDoctor] = useState(false)
  const [editDoctor, setEditDoctor] = useState(false)
  const openDelete = useDeleteStore((state) => state.openDelete);
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const doctors = useDoctorStore((state) => state.doctors);
  const setDoctors = useDoctorStore((state) => state.setDoctors);
  const [loading, setLoading] = useState(false);
  const [doctorEditId, setDoctorEditId] = useState();
  const [searchDoctor, setSearchDoctor] = useState("");

  const fetchDoctors = useCallback(async () => { 
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/Doctor/GetDoctors`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDoctors(response.data.doctors || response.data);


    } catch (error) {
      console.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  },[backendUrl, token, setDoctors]);

  useEffect(() => {
  if (doctors.length > 0) return;
  fetchDoctors();
}, [fetchDoctors, doctors.length]);

  const deleteDoctor = async (deleteDoctorId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/Doctor/DeleteDoctor/${deleteDoctorId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success(response.data.message);
      fetchDoctors();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } 
  }

  const filterData = doctors.filter((item) =>{
      const filterDoctorName =item.doctorName?.toLowerCase().includes(searchDoctor.toLowerCase())
      return filterDoctorName
});

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Doctor List</h1>
      <div className='flex justify-end items-center'>
        <button onClick={() => setAddDoctor(true)} className='flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-btn-bg hover:bg-btn-bg-hover text-white text-[14px]' >
          <IoMdAdd /> Add Doctors
        </button>
      </div>

      <div className='flex items-center my-4 gap-4 p-2 rounded-2xl border border-gray-300'>
        <IoSearch />
        <input type="text" placeholder='Enter the doctor name' className='outline-0' value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
      </div>

      <div className='mt-2 flex flex-col'>
        {loading ? <div> Loading ... </div> : filterData.length>0 ?
          filterData.map((item, index) => (
            <div
              key={item.doctorId}
              className={`flex justify-between items-center gap-4 flex-col md:flex-row border-b border-gray-300 py-3 ${index === 0 ? 'border-t border-gray-300' : ''}`}
            >
              <div className='flex items-center sm:items-start flex-col sm:flex-row gap-4 '>

                <div className='bg-doctor-cart-bg  rounded-md shrink-0'>
                  <img
                    src={item.doctorImageUrl}
                    alt={item.doctorName}
                    className='w-40 h-40 object-cover rounded-md'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-[16px]'>{item.doctorName}</p>
                  <p className='text-[14px] text-gray-600'>{item.speciality}</p>
                  <p className='text-[13px] font-medium'>
                    Education: <span className='text-gray-600'>{item.education}</span>
                  </p>
                  <p className='text-[13px] font-medium'>
                    Experience: <span className='text-gray-600'>{item.experience}</span>
                  </p>
                  <p className='text-[13px] font-medium'>
                    Email: <span className='text-gray-600'>{item.doctorEmail}</span>
                  </p>
                  <p className='text-[13px] text-gray-600 mt-2 line-clamp-3 leading-relaxed'>
                    {item.about}
                  </p>

                </div>

              </div>

              <div className='flex flex-col justify-end gap-4 shrink-0'>
                <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-blue-600 hover:text-white rounded-md' onClick={() => { setDoctorEditId(item.doctorId); setEditDoctor(true) }}>
                  Edit Details
                </button>
                <button onClick={() => openDelete(() => deleteDoctor(item.doctorId))}
                  className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-red-500 hover:text-white rounded-md'>
                  Remove
                </button>
              </div>

            </div>
          ))
        :<p>No doctors founded</p>}
      </div>
      {addDoctor && <AddDoctor setAddDoctor={setAddDoctor} refreshDoctors={fetchDoctors} />}
      {editDoctor && <EditDoctor setEditDoctor={setEditDoctor} doctorEditId={doctorEditId} refreshDoctors={fetchDoctors} />}
    </div>
  )
}

export default DoctorList