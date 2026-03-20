import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaPen, FaTrash } from "react-icons/fa";
import axios from 'axios';
import toast from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner';
import { uploadImages } from '../utils/cloudinaryUpload.js'
import { useAuthStore } from '../store/useAuthStore.js';

const AddDoctor = ({ setAddDoctor, refreshDoctors }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    doctorProfileLink: "",
    doctorName: "",
    doctorSpeciality: "",
    doctorEmail: "",
    doctorEducation: "",
    doctorExperience: "",
    doctorAbout: ""
  })
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const token = useAuthStore((state) => state.token);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDelete = () => {
    setImage(null);
    setUserData(prev => ({
      ...prev,
      profileImageUrl: ""
    }));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageUrl = userData.profileImageUrl;
      if (image) {
        const result = await uploadImages("MedReserve/doctor", [image]);
        imageUrl = result[0]?.url;
      }

      const payload = {
        doctorProfileLink: imageUrl,
        doctorName: userData.doctorName,
        doctorSpeciality: userData.doctorSpeciality,
        doctorEmail: userData.doctorEmail,
        doctorEducation: userData.doctorEducation,
        doctorExperience: userData.doctorExperience,
        doctorAbout: userData.doctorAbout || null
      };
      const response = await axios.post(
        `${backendUrl}/Doctor/AddDoctor`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUserData({
        doctorProfileLink: "",
        doctorName: "",
        doctorSpeciality: "",
        doctorEmail: "",
        doctorEducation: "",
        doctorExperience: "",
        doctorAbout: ""
      });

      toast.success(response.data.message);
      refreshDoctors();
      setAddDoctor(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center 
                    px-4 py-8 overflow-y-auto'>

      <div className='relative bg-white rounded-2xl shadow-xl 
                      w-full max-w-2xl
                      max-h-[95vh] overflow-y-auto
                      p-8'>

        <form className='flex flex-col gap-8' onSubmit={onSubmitHandler}>

          <button
            type="button"
            onClick={() => setAddDoctor(false)}
            className="absolute top-6 right-6"
          >
            <RxCross2 className="w-6 h-6" />
          </button>

          <h2 className='text-2xl font-semibold text-center'>
            Add Doctor
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
                  src={URL.createObjectURL(image)}
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

            {(image || userData.doctorProfileLink) && (
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
                value={userData.doctorName}
                name="doctorName"
                onChange={onChangeHandler}
                placeholder="Enter doctor name"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Speciality <span className='text-red-500'>*</span>
              </label>
              <select value={userData.doctorSpeciality}
                name="doctorSpeciality"
                onChange={onChangeHandler} className='p-3 border border-gray-300 rounded-lg outline-none'>
                <option value="" disabled>Select Speciality</option>
                <option value="GeneralPhysician" >General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatrician</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Doctor Email <span className='text-red-500'>*</span>
              </label>
              <input
                type="email"
                value={userData.doctorEmail}
                name="doctorEmail"
                onChange={onChangeHandler}
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
                value={userData.doctorEducation}
                name="doctorEducation"
                onChange={onChangeHandler}
                placeholder="Enter education"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Experience <span className='text-red-500'>*</span>
              </label>
              <select
                value={userData.doctorExperience}
                name="doctorExperience"
                onChange={onChangeHandler}
                className='p-3 border border-gray-300 rounded-lg outline-none'>
                <option value="" disabled>Select Experience</option>
                <option value="LessThanOneYear">Less Than 1 Year</option>
                <option value="OneYear">1 Year</option>
                <option value="TwoYears">2 Years</option>
                <option value="ThreeYears">3 Years</option>
                <option value="FourYears">4 Years</option>
                <option value="FiveYears">5 Years</option>
                <option value="MoreThanFiveYears">5+ Years</option>
              </select>
            </div>

          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium'>
              About Doctor
            </label>
            <textarea
              value={userData.doctorAbout}
              name="doctorAbout"
              onChange={onChangeHandler}
              rows="4"
              placeholder="Write about doctor..."
              className='p-3 border border-gray-300 rounded-lg outline-none resize-none'
            />
          </div>

          <button
            type="submit"
            className='bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl'
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
              "Add Doctor"
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddDoctor