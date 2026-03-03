import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { doctorsScheduleData } from '../../assets/assets_admin/assets';
import AddAppointment from '../../components/AddAppointment';
import EditAppointment from '../../components/EditAppointment';
import { useDeleteStore } from "../../store/useDeleteStore";


const Appointment = () => {
  const [addAppointment,setAddAppointment] = useState(false);
  const [editAppointment,setEditAppointment] = useState(false);
  const openDelete = useDeleteStore((state) => state.openDelete);
  return (
    <div>
      <p className='py-4 text-2xl font-semibold'>Doctor Appointment Details</p>
      <div className='flex justify-end items-center'>
        <button className='flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-btn-bg hover:bg-btn-bg-hover text-white text-[14px]' onClick={()=>setAddAppointment(true)}>
          <IoMdAdd /> Add Appointments
        </button>
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
            {doctorsScheduleData.length > 0 ? (
              doctorsScheduleData.map((doctor) => (
                <tr key={doctor.id} className="border hover:bg-gray-50">
                  <td className="p-3 border">
                    {doctor.id}
                  </td>
                  <td className="p-3 border">
                    {doctor.doctorName}
                  </td>
                  <td className="p-3 border">
                    {doctor.appointments.map((appt, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <p className="font-medium">
                          {appt.date} , {appt.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          Allowed: {appt.allowedAppointment}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border">
                    RS: {doctor.fees}/=
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center justify-center gap-4 text-white text-[14px]">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-2xl" onClick={()=>setEditAppointment(true)}>
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-2xl"  onClick={()=>openDelete()}>
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
      {addAppointment &&<AddAppointment setAddAppointment={setAddAppointment}/>}
      {editAppointment &&<EditAppointment setEditAppointment={setEditAppointment}/>}

    </div>
  )
}

export default Appointment