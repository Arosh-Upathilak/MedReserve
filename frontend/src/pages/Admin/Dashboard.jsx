import React, { useEffect, useState, useCallback } from 'react'
import { assets } from '../../assets/assets_admin/assets';
import { IoSearch } from "react-icons/io5";
import { useAuthStore } from '../../store/useAuthStore';
import { useDashBoardStore } from '../../store/useDashBoardStore';
import axios from 'axios';
import { timeConverter } from '../../utils/timeConverter.js'
import { downloadExcel } from '../../utils/downloadExcel.js'


const Dashboard = () => {
  const [searchDate, setSearchDate] = useState("");
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchPatient, setSearchPatient] = useState("");
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const dashBoardStore = useDashBoardStore((state) => state.dashBoardStore);
  const setDashBoardStore = useDashBoardStore((state) => state.setDashBoardStore);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/Payment/GetAllPaymentDetails`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setDashBoardStore(response.data.payments || response.data)
    } catch (error) {
      console.error(error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, token, setDashBoardStore])

  useEffect(() => {
    if (dashBoardStore.length > 0) return;
    fetchDashboard();
  }, [fetchDashboard, dashBoardStore.length])



  const filterData = dashBoardStore.filter((item) => {

    const doctorMatch = item.doctorName
      .toLowerCase()
      .includes(searchDoctor.toLowerCase());

    const patientMatch = item.userName
      .toLowerCase()
      .includes(searchPatient.toLowerCase());

    const dateMatch =
      !searchDate || item.scheduleDate === searchDate;

    return doctorMatch && patientMatch && dateMatch;
  });


  return (
    <div>
      <div className='flex gap-4 items-center'>
        <div className='border rounded-lg border-gray-200 p-4 flex items-center gap-4'>
          <img src={assets.doctor_icon} alt="doctor image" />
          <div >
            <p>5</p>
            <p>doctors</p>
          </div>
        </div>

        <div className='border rounded-lg border-gray-200 p-4 flex items-center gap-4'>
          <img src={assets.appointments_icon} alt="appointments image" />
          <div >
            <p>2</p>
            <p>appointments</p>
          </div>
        </div>

        <div className='border rounded-lg border-gray-200 p-4 flex items-center gap-4'>
          <img src={assets.patients_icon} alt="patients image" />
          <div >
            <p>3</p>
            <p>patients</p>
          </div>
        </div>
      </div>

      <div className='py-4'>
        <p className='py-4 text-2xl font-semibold'>Filter the details</p>
        <div className='flex items-center justify-between '>
          <div className='flex items-center justify-center gap-4'>
            <input type="date" className='flex items-center p-2 rounded-2xl border border-gray-300 cursor-pointer' value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)} />
            <div className='flex items-center gap-2 p-2 rounded-2xl border border-gray-300'>
              <IoSearch />
              <input type="text" placeholder='Enter the doctor name' className='outline-0' value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} />
            </div>
            <div className='flex items-center gap-2 p-2 rounded-2xl border border-gray-300'>
              <IoSearch />
              <input type="text" placeholder='Enter the patient name' className='outline-0' value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)} />
            </div>
          </div>
          <button className='py-2 px-4 rounded-2xl bg-btn-bg hover:bg-btn-bg-hover text-white text-[14px]' onClick={()=>downloadExcel(filterData)}>Download the Report</button>
        </div>
      </div>

      <div className='mt-4'>
        <p className='py-4 text-2xl font-semibold'>All Appointment</p>


        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">Id</th>
                <th className="p-3 border">Patient Name</th>
                <th className="p-3 border">Date & Time</th>
                <th className="p-3 border">Doctor</th>
                <th className="p-3 border">Appointment Number</th>
                <th className="p-3 border">Fees</th>
              </tr>
            </thead>

            <tbody>
              {loading ? <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading.....
                </td>
              </tr> : filterData.length > 0 ? filterData.map((item, index) => (
                <tr key={item.id} className="border">

                  <td className="p-3 border">{index + 1}</td>

                  <td className="p-3 border">
                    <div className="flex items-center gap-2">
                      {item.userName}
                    </div>
                  </td>
                  <td className="p-3 border">{item.scheduleDate} , {timeConverter(item.scheduleTime)}</td>
                  <td className="p-3 border">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.doctorImageUrl}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      {item.doctorName}
                    </div>
                  </td>
                  <td className="p-3 border">{item.appointmentNumber}</td>
                  <td className="p-3 border">RS: {item.fee}/=</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default Dashboard