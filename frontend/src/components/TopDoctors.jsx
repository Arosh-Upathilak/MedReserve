import React, { useState, useEffect, useCallback } from 'react'
import DoctorCart from './DoctorCart'
import { useAuthStore } from '../store/useAuthStore';
import { useDoctorStore } from '../store/useDoctorStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const TopDoctors = () => {
    const token = useAuthStore((state) => state.token);
    const backendUrl = useAuthStore((state) => state.backendUrl);
    const doctors = useDoctorStore((state) => state.doctors);
    const setDoctors = useDoctorStore((state) => state.setDoctors);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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

    return (
        <div className='my-10'>
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl md:text-3xl font-semibold"> Top Doctors to Book </h1>
                <p className="text-center text-[12px] text-gray-600">
                    Simply browse through our extensive list of trusted doctors.
                </p>
            </div>
            <div className='mt-10 flex items-center justify-center flex-wrap gap-4'>
                {loading ? <div>Loading....</div> :
                    doctors.slice(0, 5).map(item => <DoctorCart key={item.doctorId} item={item} loading={loading} onClick={() => navigate(`/doctors/${item.doctorId}`)}/>)
                }
            </div>
            <div className='mt-10 flex items-center justify-center'>
                <a href='/doctors' className=' px-4 py-2 text-[14px] text-gray-500 hover:text-gray-800 cursor-pointer bg-doctor-cart-bg rounded-2xl'>more</a>
            </div>
        </div>
    )
}

export default TopDoctors