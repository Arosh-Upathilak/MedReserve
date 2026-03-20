import React, { useEffect, useState, useCallback } from 'react'
import { IoMdAdd } from "react-icons/io";
import AddAppointment from '../../components/AddAppointment';
import EditAppointment from '../../components/EditAppointment';
import { useDeleteStore } from "../../store/useDeleteStore";
import { useAuthStore } from '../../store/useAuthStore';
import { useAppointmentStore } from '../../store/useAppointmentStore';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";
import { timeConverter } from '../../utils/timeConverter.js'

const Appointment = () => {
  const [addAppointment, setAddAppointment] = useState(false);
  const [editAppointment, setEditAppointment] = useState(false);
  const openDelete = useDeleteStore((state) => state.openDelete);
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const doctorAppointment = useAppointmentStore((state) => state.doctorAppointment);
  const setDoctorAppointment = useAppointmentStore((state) => state.setDoctorAppointment);
  const [loading, setLoading] = useState(false);
  const [searchAppointment, setSearchAppointment] = useState("")
  const [searchAppointmentDate, setSearchAppointmentDate] = useState("")
  const [searchAppointmentTime, setSearchAppointmentTime] = useState("")
  const [updateAppointmentId, setUpdateAppointmentId] = useState("");

  const fetchAppointment = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/Appointment/GetAppointment`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDoctorAppointment(response.data.appointments || response.data)
    } catch (error) {
      console.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, token, setDoctorAppointment])

  useEffect(() => {
    if (doctorAppointment.length > 0) return;
    fetchAppointment();
  }, [fetchAppointment, doctorAppointment.length])


  const filterData = doctorAppointment.filter((item) => {

    const doctorMatch = item.doctorName
      .toLowerCase()
      .includes(searchAppointment.toLowerCase());

    const scheduleMatch =
      item.doctorScheduleTimes.length === 0
        ? true 
        : item.doctorScheduleTimes.some((schedule) => {

          const dateMatch =
            !searchAppointmentDate ||
            schedule.scheduleDate === searchAppointmentDate;

          const timeMatch =
            !searchAppointmentTime ||
            schedule.scheduleTime.startsWith(searchAppointmentTime);

          return dateMatch && timeMatch;
        });

    return doctorMatch && scheduleMatch;
  });

  const deleteAppointment = async (deleteAppointmentId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/Appointment/DeleteAppointment/${deleteAppointmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success(response.data.message);
      fetchAppointment();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <p className='py-4 text-2xl font-semibold'>Doctor Appointment Details</p>
      <div className='flex justify-end items-center'>
        <button className='flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-btn-bg hover:bg-btn-bg-hover text-white text-[14px]' onClick={() => setAddAppointment(true)}>
          <IoMdAdd /> Add Appointments
        </button>
      </div>

      <div className='mt-4 flex items-center gap-8 w-2/3 '>
        <div className='flex items-center gap-2 p-2 rounded-2xl border border-gray-300 flex-1'>
          <IoSearch className="text-gray-500" />
          <input
            type="text"
            placeholder='Enter the Appointment details to search'
            className='outline-none w-full'
            value={searchAppointment}
            onChange={(e) => setSearchAppointment(e.target.value)}
          />
        </div>
        <input
          type="date"
          className='p-2 rounded-2xl border border-gray-300 cursor-pointer'
          value={searchAppointmentDate}
          onChange={(e) => setSearchAppointmentDate(e.target.value)}
        />
        <input
          type="time"
          className='p-2 rounded-2xl border border-gray-300 cursor-pointer'
          value={searchAppointmentTime}
          onChange={(e) => setSearchAppointmentTime(e.target.value)}
        />

      </div>

      <div className='my-6'>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Id</th>
              <th className="p-3 border">Doctor Name</th>
              <th className="p-3 border">Schedule Details</th>
              <th className="p-3 border">Fees</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center p-6 ">
                  Loading...
                </td>
              </tr>
            )
              : filterData.length > 0 ? (
                filterData.map((doctor, index) => (
                  <tr key={doctor.doctorScheduleId} className="border hover:bg-gray-50">
                    <td className="p-3 border">
                      {index + 1}
                    </td>
                    <td className="p-3 border">
                      {doctor.doctorName}
                    </td>
                    <td className="p-3 border">
                      {doctor.doctorScheduleTimes.length > 0 ? doctor.doctorScheduleTimes.map((appointment, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <p className="font-medium">
                            {appointment.scheduleDate} , {timeConverter(appointment.scheduleTime)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Allowed: {appointment.allowedAppointments}
                          </p>
                        </div>
                      )) : (
                        <p className="text-gray-400 italic">No schedule available</p>
                      )}
                    </td>
                    <td className="p-3 border">
                      RS: {doctor.fee}/=
                    </td>
                    <td className="p-3 border">
                      <div className="flex items-center justify-center gap-4 text-white text-[14px]">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-2xl" onClick={() => { setUpdateAppointmentId(doctor.doctorScheduleId); setEditAppointment(true) }}>
                          Edit
                        </button>
                        <button className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-2xl" onClick={() => openDelete(() => deleteAppointment(doctor.doctorScheduleId))}>
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      {addAppointment && <AddAppointment setAddAppointment={setAddAppointment} refreshAppointment={fetchAppointment} />}
      {editAppointment && <EditAppointment setEditAppointment={setEditAppointment} refreshAppointment={fetchAppointment} updateAppointmentId={updateAppointmentId} />}

    </div>
  )
}

export default Appointment