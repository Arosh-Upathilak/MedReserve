import React, { useState } from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";


const MyProfile = () => {
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    phone: "0788946468",
    address: "Colombo, Sri Lanka",
    gender: "Male",
    birthday: "2000-01-01"
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setImage(null);
  };


  return (
    <div className='my-10 flex items-center justify-center flex-col'>
      <div className="relative w-40 h-40 my-4">
        <div className="w-40 h-40 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
          <input
            type="file"
            className="hidden "
            id="profileUpload"
            onChange={handleImageChange}
          />

          <label htmlFor="profileUpload" className="w-full h-full flex items-center justify-center cursor-pointer">
            {image ? (
              <img
                src={image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-500 text-sm flex flex-col items-center gap-2 p-2">
                <MdDriveFolderUpload className='w-8 h-8' />
                <span className='font-semibold text-[18px]'>
                  Upload Image
                </span>
              </div>
            )}
          </label>
        </div>
        {image && (
          <div className="absolute bottom-2 right-0 flex gap-2">
            <label
              htmlFor="profileUpload"
              className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
            >
              <FaPen className="text-gray-700 text-sm" />
            </label>

            <button
              onClick={handleDelete}
              className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-red-100 transition"
            >
              <FaTrash className="text-red-500 text-sm" />
            </button>

          </div>
        )}
      </div>
      <p className='text-3xl'>AAU</p>
      <div className='border-t border-gray-500 w-full md:w-[50%] py-4 flex flex-col gap-4'>

        <p className='underline text-gray-500 text-center'>
          CONTACT INFORMATION
        </p>

        <div className='grid grid-cols-[140px_1fr] text-[14px] items-center'>
          <p>Email :</p>
          <p className='text-gray-500'>text@email.com</p>
        </div>

        <div className='grid grid-cols-[140px_1fr] text-[14px] items-center'>
          <p>Phone Number :</p>
          <input
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            disabled={!isEdit}
            className={`outline-none p-2 rounded-xl ${!isEdit
              ? "bg-transparent text-gray-500 cursor-default appearance-none"
              : "bg-gray-200"
              }`}
          />
        </div>

        <div className='grid grid-cols-[140px_1fr] text-[14px] items-start'>
          <p className='pt-2'>Address :</p>
          <textarea
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            disabled={!isEdit}
            rows={3}
            className={`outline-none p-2 rounded-xl resize-none ${!isEdit
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-gray-200"
              }`}
          />
        </div>

        <p className='mt-4 underline text-gray-500 text-center'>
          BASIC INFORMATION
        </p>

        <div className='grid grid-cols-[140px_1fr] text-[14px] items-center'>
          <p>Gender :</p>
          <select
            value={userData.gender}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
            disabled={!isEdit}
            className={`outline-none p-2 rounded-xl ${!isEdit
              ? "bg-transparent text-gray-500 cursor-default appearance-none"
              : "bg-gray-200"
              }`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className='grid grid-cols-[140px_1fr] text-[14px] items-center'>
          <p>Birthday :</p>
          <input
            type="date"
            value={userData.birthday}
            onChange={(e) =>
              setUserData({ ...userData, birthday: e.target.value })
            }
            disabled={!isEdit}
            className={`outline-none p-2 rounded-xl ${!isEdit
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-gray-200"
              }`}
          />
        </div>

        <div className='mt-4 flex items-center justify-center'>
          <button
            onClick={() => setIsEdit(!isEdit)}
            className='p-2 bg-btn-bg rounded-2xl text-white w-80'
          >
            {isEdit ? "Save Details" : "Edit Details"}
          </button>
        </div>
      </div>
    </div>

  )
}

export default MyProfile