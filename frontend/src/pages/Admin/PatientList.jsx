import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import { usePatientStore } from '../../store/usePatientStore';
import axios from 'axios';

const PatientList = () => {
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const patients = usePatientStore((state) => state.patients);
  const setPatients = usePatientStore((state) => state.setPatients);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  const initializePatient = async () => {
    if (patients.length > 0) return;  

    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/User/Get-Patient`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setPatients(response.data.patients || response.data);

    } finally {
      setLoading(false);
    }
  };

  initializePatient();
}, [token, backendUrl, patients.length , setPatients]);

  return (
    <div className='p-6'>

      <h1 className='text-2xl font-semibold mb-6'>
        Patient List
      </h1>

      <div className='overflow-x-auto'>
        <table className='w-full border-collapse bg-white shadow-md overflow-hidden'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='p-3 border'>Patient</th>
              <th className='p-3 border'>Email</th>
              <th className='p-3 border'>Age</th>
              <th className='p-3 border'>Gender</th>
              <th className='p-3 border'>Phone</th>
              <th className='p-3 border'>Registered Date</th>
              <th className='p-3 border'>Address</th>
            </tr>
          </thead>


          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-6">
                  No Data Found
                </td>
              </tr>
            ) : (
              patients.map((patient,index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='p-3 border'>
                    <div className='flex items-center gap-3'>
                      <img
                        src={patient.profileImageUrl}
                        alt={patient.name}
                        className='w-10 h-10 rounded-full object-cover'
                      />
                      <span className='font-medium'>{patient.name}</span>
                    </div>
                  </td>

                  <td className='p-3 border'>{patient.email}</td>
                  <td className='p-3 border'> {new Date().getFullYear() - new Date(patient.birthday).getFullYear()}</td>
                  <td className='p-3 border'>{patient.gender}</td>
                  <td className='p-3 border'>{patient.phoneNumber.slice(2).padStart(10,'0')}</td>
                  <td className='p-3 border'> {new Date(patient.registeredDate).toLocaleString()}</td>
                  <td className='p-3 border'>{patient.address}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default PatientList