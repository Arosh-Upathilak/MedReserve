import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaPen, FaTrash } from "react-icons/fa";

const EditDoctor = ({ setEditDoctor }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setImage(null);
  };

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center 
                    px-4 py-8 overflow-y-auto'>

      <div className='relative bg-white rounded-2xl shadow-xl 
                      w-full max-w-2xl
                      max-h-[95vh] overflow-y-auto
                      p-8'>

        <form className='flex flex-col gap-8'>

          <button
            type="button"
            onClick={() => setEditDoctor(false)}
            className="absolute top-6 right-6"
          >
            <RxCross2 className="w-6 h-6" />
          </button>

          <h2 className='text-2xl font-semibold text-center'>
            Edit Doctor
          </h2>

          <div className='flex items-center justify-center relative'>
            <input
              type="file"
              className="hidden"
              id="profileUpload"
              accept="image/*"
              onChange={handleImageChange}
            />

            <label
              htmlFor="profileUpload"
              className="w-36 h-36 border border-gray-300 rounded-full 
                         flex items-center justify-center cursor-pointer 
                         overflow-hidden"
            >
              {image ? (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center gap-2">
                  <MdDriveFolderUpload className='w-8 h-8' />
                  <span className='font-semibold text-sm'>
                    Upload Image
                  </span>
                </div>
              )}
            </label>

            {image && (
              <div className="absolute bottom-2 right-1/2 translate-x-16 flex gap-2">
                <label
                  htmlFor="profileUpload"
                  className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
                >
                  <FaPen className="text-gray-700 text-sm" />
                </label>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-red-100 transition"
                >
                  <FaTrash className="text-red-500 text-sm" />
                </button>
              </div>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Doctor Name <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter doctor name"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Speciality <span className='text-red-500'>*</span>
              </label>
              <select className='p-3 border border-gray-300 rounded-lg outline-none'>
                <option value="">Select Speciality</option>
                <option>General Physician</option>
                <option>Cardiologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Doctor Email <span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Education <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter education"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Experience <span className='text-red-500'>*</span>
              </label>
              <select className='p-3 border border-gray-300 rounded-lg outline-none'>
                <option value="">Select Experience</option>
                <option>1 Year</option>
                <option>2 Years</option>
                <option>3 Years</option>
                <option>5+ Years</option>
              </select>
            </div>

          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium'>
              About Doctor
            </label>
            <textarea
              rows="4"
              placeholder="Write about doctor..."
              className='p-3 border border-gray-300 rounded-lg outline-none resize-none'
            />
          </div>

          <button
            type="submit"
            className='bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl'
          >
            Edit Doctor
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditDoctor