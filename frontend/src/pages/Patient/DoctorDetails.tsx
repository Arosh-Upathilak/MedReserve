import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiCheckBadge } from "react-icons/hi2";
import { doctors } from "../../assets/assets_frontend/assets";
import BookingTimeCard from "../../components/BookingTimeCard";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const doctor = doctors[0];
  const [activeTimeSlot, setActiveTimeSlot] = useState(false);

  return (
    <div className="my-10">
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft />
        <p>Back</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        <div className="md:col-span-1 ">
          <div className="rounded-md bg-header-bg h-full">
            <img
              src={doctor.image}
              alt="doctor"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        <div className="md:col-span-3 rounded-md border border-gray-400 p-8 md:p-10 flex flex-col gap-4 ">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-3xl font-medium text-gray-700">
              {doctor.name}
            </h1>
            <HiCheckBadge className="text-blue-800 w-6 h-6" />
          </div>

          <div className="flex flex-wrap gap-2 items-center text-xs md:text-sm text-gray-600">
            <p>{doctor.degree}</p>
            <p>-</p>
            <p>{doctor.speciality}</p>
            <p className="px-3 py-1 border border-gray-400 rounded-full text-xs">
              {doctor.experience}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">About</p>
              <AiOutlineInfoCircle className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 mt-1">{doctor.about}</p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium">
            <p className="text-gray-600">Appointment fee:</p>
            <p>RS. {doctor.fees} /-</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 hidden md:block" />
        <div className="md:col-span-3">
          <div>
             <p className="text-gray-700 font-medium">Available Booking slots :</p>
          </div>
          <div>
            <p className="text-gray-700 font-medium">Booking slots : </p>
            <div className="flex flex-wrap py-4 gap-4">
              <BookingTimeCard
                active={activeTimeSlot}
                onClick={() => setActiveTimeSlot((prev) => !prev)}
              />
              <BookingTimeCard
                active={activeTimeSlot}
                onClick={() => setActiveTimeSlot((prev) => !prev)}
              />
            </div>
          </div>
          <button className="py-2 px-4 bg-form-btn text-white rounded-lg hover:text-white/50">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
