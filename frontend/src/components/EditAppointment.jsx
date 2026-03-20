import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { useAuthStore } from '../store/useAuthStore.js';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import toast from "react-hot-toast";


const EditAppointment = ({ setEditAppointment, refreshAppointment, updateAppointmentId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    doctorId: "",
    fee: "",
    doctorScheduleTimes: []
  })
  const [appointmentDetails, setAppointmentDetails] = useState({
    scheduleDate: "",
    scheduleTime: "",
    allowedAppointments: ""
  });
  const [doctorList, setDoctorList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    const InitializeDoctors = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Doctor/GetDoctorList`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setDoctorList(response.data.doctorList || response.data)
      } catch (error) {
        console.error(error.response?.data?.message || "Something went wrong");
      }
    }

    const initializeAppointment = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${backendUrl}/Appointment/GetAppointment/${updateAppointmentId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const appointment = response.data.appointment || response.data;
        setForm(appointment)
        setAppointmentsList(appointment.doctorScheduleTimes)

      } catch (error) {
        console.error(error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    InitializeDoctors();
    initializeAppointment();
  }, [backendUrl, token, updateAppointmentId])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDetail = () => {
    if (!appointmentDetails.scheduleDate || !appointmentDetails.scheduleTime || !appointmentDetails.allowedAppointments) {
      setError("Please fill all fields");
      return;
    }

    const today = new Date()
    const tommorow = new Date()
    tommorow.setDate(today.getDate() + 7)

    const appointmentDateandTime = new Date(appointmentDetails.scheduleDate)
    if (appointmentDateandTime < tommorow) {
      setError("Please fill the future times more than week");
      return;
    }

    setError("")
    if (editIndex !== null) {
      const updatedList = [...appointmentsList];
      updatedList[editIndex] = appointmentDetails;
      setAppointmentsList(updatedList);
      setEditIndex(null);
    } else {
      setAppointmentsList(prev => [...prev, appointmentDetails]);
    }

    setAppointmentDetails({
      scheduleDate: "",
      scheduleTime: "",
      allowedAppointments: ""
    });

    setShowForm(false);
  };

  const handleDelete = (index) => {
    setAppointmentsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setAppointmentDetails(appointmentsList[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const updatedList = appointmentsList.map((item, index) => ({
        appointmentId: index + 1,
        appointmentDate: item.scheduleDate,
        appointmentTime: item.scheduleTime,
        appointmentSlot: Number(item.allowedAppointments)
      }));
      if (updatedList.length === 0) {
        setError("Must be add the appointment date and time");
        return;
      }

      const payload = { ...form, doctorAppointmentList: updatedList };
      const response = await axios.put(
        `${backendUrl}/Appointment/UpdateAppointment/${updateAppointmentId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setForm({
        doctorId: "",
        doctorFree: "",
        doctorAppointmentList: []
      });
      setAppointmentDetails({
        appointmentDate: "",
        appointmentTime: "",
        appointmentSlot: ""
      });
      toast.success(response.data.message);
      setEditAppointment(false)
      refreshAppointment()

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center overflow-y-auto p-4'>
      <div className='relative bg-white rounded-2xl p-6 shadow-xl 
                      w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%]
                      max-h-[90vh] overflow-y-auto'>
        <form className='flex flex-col gap-6' onSubmit={onSubmitHandler}>
          <button
            type="button"
            onClick={() => { setError(""); setEditAppointment(false) }}
            className="absolute top-4 right-4"
          >
            <RxCross2 className="w-6 h-6" />
          </button>
          <p className='font-semibold text-2xl'>
            Edit The Appointment
          </p>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Doctor Name <span className='text-red-500'>*</span>
            </label>
            <select className="p-2 border border-gray-300 rounded-lg outline-none" value={form.doctorId} name="doctorId" onChange={onChangeHandler}>
              <option value="" disabled>Select Doctor</option>
              {
                doctorList.map(item =>
                  <option key={item.doctorId} value={item.doctorId}>{item.doctorName}</option>
                )
              }
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">
              Fee <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              onChange={onChangeHandler}
              value={form.fee}
              name="fee"
              placeholder='Enter the fee'
              className='p-2 border border-gray-300 rounded-lg outline-none'
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="font-medium">
                Appointment Details
              </label>

              <button
                type="button"
                onClick={() => {
                  setShowForm(true);
                  setEditIndex(null);
                  setAppointmentDetails({
                    scheduleDate: "",
                    scheduleTime: "",
                    allowedAppointments: ""
                  });
                }}
                className="flex items-center gap-1 text-blue-600"
              >
                <IoMdAdd />
                Add Details
              </button>
            </div>

            <div className='grid grid-cols-5 bg-gray-100 p-2 rounded-md text-sm font-medium'>
              <p className='text-center'>Id</p>
              <p className='text-center'>Date</p>
              <p className='text-center'>Time</p>
              <p className='text-center'>Appointments</p>
              <p className='text-center'>Actions</p>
            </div>

            {appointmentsList.length > 0 ? (
              appointmentsList.map((item, index) => (
                <div key={index} className='grid grid-cols-5 text-sm items-center py-2 '>

                  <p className='text-center'>{index + 1}</p>
                  <p className='text-center'>{item.scheduleDate}</p>
                  <p className='text-center'>{item.scheduleTime}</p>
                  <p className='text-center'>{item.allowedAppointments}</p>

                  <div className="flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-2">
                No appointment details added
              </p>
            )}

          </div>

          {showForm && (
            <div className='px-4 py-4 rounded-xl bg-gray-100 flex flex-col gap-4 relative'>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className='absolute top-0 right-0'
              >
                <RxCross2 className="w-4 h-4" />
              </button>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                <div className='flex flex-col gap-2'>
                  <label className="font-medium">
                    Date <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type="date"
                    name="scheduleDate"
                    value={appointmentDetails.scheduleDate}
                    onChange={handleChange}
                    className='p-2 border border-gray-300 rounded-lg outline-none'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className="font-medium">
                    Time <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type="time"
                    name="scheduleTime"
                    value={appointmentDetails.scheduleTime}
                    onChange={handleChange}
                    className='p-2 border border-gray-300 rounded-lg outline-none'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className="font-medium">
                    Appointments <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type="number"
                    name="allowedAppointments"
                    placeholder='Enter number'
                    value={appointmentDetails.allowedAppointments}
                    onChange={handleChange}
                    className='p-2 border border-gray-300 rounded-lg outline-none'
                  />
                </div>

              </div>

              <button
                type="button"
                onClick={handleAddDetail}
                className='bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg'
              >
                {editIndex !== null ? "Update Details" : "Save Details"}
              </button>

            </div>
          )}

          <div>
            <p>
              {error && <span className="text-base text-red-500">{error}</span>}
            </p>
          </div>
          <button
            type="submit"
            className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl'
          >
            {loading ? (
              <div className='flex items-center justify-center'>
                <ThreeDots
                  height="24"
                  width="40"
                  color="#ffffff"
                  visible={true}
                />
              </div>
            ) : (
              "Edit Appointment"
            )}
          </button>
        </form>

      </div>
    </div>
  )
}

export default EditAppointment