import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiCheckBadge } from "react-icons/hi2";
import BookingTimeCard from "../../components/BookingTimeCard";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const DoctorDetails = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const [activeTimeSlot, setActiveTimeSlot] = useState(false);
  const [loading, setLoading] = useState(false)
  const { id } = useParams();
  const [doctorDetails, setDoctorDetails] = useState({
    doctorId: "",
    doctorEmail: "",
    doctorImageUrl: "",
    doctorName: "",
    education: "",
    speciality: "",
    experience: "",
    about: "",
    schedules: []
  })
  useEffect(() => {
    const initializeDoctor = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${backendUrl}/Appointment/DoctorDetailsGetById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(response)
        setDoctorDetails(response.data.doctor || response.data)
      } catch (error) {
        console.error(error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    initializeDoctor();
  }, [token, backendUrl,id])

  return (
    <div className="my-10">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft />
        <p>Back</p>
      </div>
      {loading ? <div>Loading... </div> :
        <>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            <div className="md:col-span-1 ">
              <div className="rounded-md bg-header-bg h-full">
                <img
                  src={doctorDetails.doctorImageUrl}
                  alt="doctor"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>

            <div className="md:col-span-3 rounded-md border border-gray-400 p-8 md:p-10 flex flex-col gap-4 ">
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-3xl font-medium text-gray-700">
                  {doctorDetails.doctorName}
                </h1>
                <HiCheckBadge className="text-blue-800 w-6 h-6" />
              </div>

              <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm text-gray-600">
                <p>{doctorDetails.speciality}</p>
                <p className="px-3 py-1 border border-gray-400 rounded-full text-xs">
                  {doctorDetails.experience}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">About</p>
                  <AiOutlineInfoCircle className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{doctorDetails.about}</p>
              </div>


            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 hidden md:block" />
            <div className="md:col-span-3">
              <div className="flex flex-wrap py-4 gap-4">

                {doctorDetails?.schedules?.map(schedules => schedules.scheduleTimes.map((item, index) => <BookingTimeCard
                  key={index}
                  fee={schedules.fee}
                  scheduleTimes={item}
                  active={activeTimeSlot === item.doctorScheduleTimeId}
                  onClick={() =>setActiveTimeSlot(prev => prev === item.doctorScheduleTimeId? null:item.doctorScheduleTimeId)}
                />))}

              </div>
              <button className="py-2 px-4 bg-form-btn text-white rounded-lg hover:text-white/50">
                Book Appointment
              </button>
            </div>
          </div>
        </>}
    </div>
  );
};

export default DoctorDetails;
