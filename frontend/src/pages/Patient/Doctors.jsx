import React, { useState, useCallback, useEffect } from 'react'
import { FaSearch } from "react-icons/fa"
import { doctorSpeciality } from '../../assets/assets_frontend/assets'
import DoctorCart from '../../components/DoctorCart'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore';
import { useDoctorStore } from '../../store/useDoctorStore';
import axios from 'axios';

const Doctors = () => {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const doctors = useDoctorStore((state) => state.doctors);
  const setDoctors = useDoctorStore((state) => state.setDoctors);
  const [loading, setLoading] = useState(false);

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
  }, [backendUrl, token, setDoctors]);

  useEffect(() => {
    if (doctors.length > 0) return;
    fetchDoctors();
  }, [fetchDoctors, doctors.length]);

  const filterData = doctors.filter((doctor) => {
    const matchSpeciality = active ? doctor.speciality === active : true;
    const searchSpeciality = doctor.doctorName.toLowerCase().includes(search.toLowerCase())
    return matchSpeciality && searchSpeciality
  });



  return (
    <div className='my-10'>
      <p className='text-gray-700'>Browse through the doctors specialist.</p>
      <div className='flex lg:flex-row flex-col'>
        <div className='mt-4 lg:w-1/6 flex flex-col gap-3 text-gray-600'>
          {doctorSpeciality.map((value) => (
            <p key={value} className={`${active === value ? "bg-doctor-cart-border text-black" : ""} doctor-type`} onClick={() => setActive(active === value ? null : value)}>{value}</p>
          ))}

        </div>
        <div className='lg:w-5/6 py-4 lg:px-8'>
          <div className='flex flex-row items-center justify-start gap-4 px-4  py-2 border border-doctor-border lg:w-1/3 rounded-md'>
            <FaSearch className='text-gray-600 w-4 h-4' />
            <input placeholder='Enter the doctor name.....' className='outline-0 text-gray-600' value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className='flex  md:justify-start items-center justify-center'>
            <div className='mt-5  gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
              { loading ? <div>Loading....</div> :
                filterData.map(item => <DoctorCart key={item.doctorId} item={item} onClick={() => navigate(`/doctors/${item.doctorId}`)} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors