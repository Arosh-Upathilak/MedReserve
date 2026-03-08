import React from 'react'
import { patientsData } from '../../assets/assets_admin/assets';

const PatientList = () => {
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
            {patientsData.map((patient) => (
              <tr key={patient.id} className='hover:bg-gray-50'>

                <td className='p-3 border'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={patient.image}
                      alt={patient.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <span className='font-medium'>{patient.name}</span>
                  </div>
                </td>

                <td className='p-3 border'>{patient.email}</td>
                <td className='p-3 border'>{patient.age}</td>
                <td className='p-3 border'>{patient.gender}</td>
                <td className='p-3 border'>{patient.phone}</td>
                <td className='p-3 border'>{patient.registeredDate}</td>
                <td className='p-3 border'>{patient.address}</td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default PatientList