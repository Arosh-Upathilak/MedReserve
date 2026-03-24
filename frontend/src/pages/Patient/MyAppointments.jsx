import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';
import toast from "react-hot-toast";
import { useDeleteStore } from "../../store/useDeleteStore";
import { timeConverter } from '../../utils/timeConverter.js'
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const MyAppointments = () => {
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const token = useAuthStore((state) => state.token);
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const openDelete = useDeleteStore((state) => state.openDelete);
  const navigate = useNavigate();

  useEffect(() => {
    const initialMyAppointments = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backendUrl}/Appointment/GetDoctorAppointmentByUser`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMyAppointments(response.data.appointments)
        setLoading(false)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    initialMyAppointments()
  }, [backendUrl, token])


  const removeAppointFromCart = async (appointmentId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/Appointment/DeleteDoctorAppointment/${appointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMyAppointments((prev) =>
        prev.filter((item) => item.appointmentId !== appointmentId)
      );

      toast.success(response.data.message);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='my-10'>
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft />
        <p>Back</p>
      </div>
      <h1 className='mt-4'>My Appointments</h1>
      <div className='mt-4 flex flex-col '>
        {loading ? <p>Loading....</p> : myAppointments.length > 0 ?
          myAppointments.map((item, index) => (
            <div key={index} className={`flex justify-between items-center gap-4 flex-col md:flex-row border-b border-gray-300 py-3 ${index === 0 ? 'border-t border-gray-300' : ''}`}>
              <div className='flex items-center sm:items-start flex-col sm:flex-row gap-4'>
                <div className='bg-doctor-cart-bg'>
                  <img src={item.doctorImageUrl} alt="doctor image" className='w-40 h-40' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-[15px]'>{item.doctorName}</p>
                  <p className='text-[13px] text-gray-600'>{item.speciality}</p>
                  <p className='text-[13px] font-medium'>Date & Time: <span className='text-gray-600 '>{item.scheduleDate} at {timeConverter(item.scheduleTime)}</span></p>
                  <p className='text-[13px] font-medium'>Appontment Number: <span className='text-gray-600 '>{item.appointmentNumber}</span></p>
                  <p className='text-[13px] font-medium'>Price: <span className='text-gray-600 '>RS: {item.fee} /=</span></p>
                </div>
              </div>

              <div className='flex flex-col justify-between md:justify-end  gap-4'>
                {item.status == "Completed" ?
                  <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:border-none hover:bg-amber-500 hover:text-white rounded-md' onClick={() => navigate(`/success/${item.paymentId}`)}>
                    View Appointment
                  </button>
                  : <>
                    <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-about-hover hover:text-white rounded-md' onClick={() => navigate(`/payment/${item.appointmentId}`)}>
                      Pay Online
                    </button>
                    <button className='text-[13px] py-2 px-4 border text-gray-600 border-gray-400 hover:bg-cancel-btn hover:text-white rounded-md' onClick={() => openDelete(() => removeAppointFromCart(item.appointmentId))}>
                      Cancel Appointment
                    </button>
                  </>}
              </div>
            </div>
          )) : <p className='text-gray-500'>No appointment available</p>

        }
      </div>
    </div>
  )
}

export default MyAppointments