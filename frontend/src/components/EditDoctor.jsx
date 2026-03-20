import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { MdDriveFolderUpload } from "react-icons/md";
import { FaPen, FaTrash } from "react-icons/fa";
import { useAuthStore } from '../store/useAuthStore.js';
import axios from 'axios';
import toast from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner';
import { uploadImages } from '../utils/cloudinaryUpload.js'


const EditDoctor = ({ setEditDoctor, doctorEditId,refreshDoctors }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    doctorImageUrl: "",
    doctorName: "",
    speciality: "",
    doctorEmail: "",
    education: "",
    experience: "",
    about: ""
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setImage(null);
  };

  useEffect(() => {
    const initializeDoctors = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${backendUrl}/Doctor/GetDoctor/${doctorEditId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        const doctor = response.data.currentDoctor || response.data;
        setUserData(doctor)
        setImage(doctor.doctorImageUrl)
      } catch (error) {
        console.error(error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    initializeDoctors();
  }, [backendUrl, token, doctorEditId])

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      let imageUrl = userData.doctorImageUrl;

      if (image && typeof image !== "string") {
        const result = await uploadImages("MedReserve/doctor", [image]);
        imageUrl = result[0]?.url;
      }

      if (!image) {
        setError("Image required");
        setLoading(false);
        return;
      }
      const payload = {
        doctorProfileLink: imageUrl,
        doctorName: userData.doctorName,
        doctorSpeciality: userData.speciality,
        doctorEmail: userData.doctorEmail,
        doctorEducation: userData.education,
        doctorExperience: userData.experience,
        doctorAbout: userData.about
      };

      const response = await axios.put(
        `${backendUrl}/Doctor/EditDoctor/${doctorEditId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setUserData({
        doctorImageUrl: "",
        doctorName: "",
        speciality: "",
        doctorEmail: "",
        education: "",
        experience: "",
        about: ""
      });


      toast.success(response.data.message);
      refreshDoctors();
      setEditDoctor(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setError("");
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center 
                    px-4 py-8 overflow-y-auto'>

      <div className='relative bg-white rounded-2xl shadow-xl 
                      w-full max-w-2xl
                      max-h-[95vh] overflow-y-auto
                      p-8'>

        <form className='flex flex-col gap-8' onSubmit={onSubmit}>

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
                  src={typeof image === "string" ? image : URL.createObjectURL(image)}
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
                name='doctorName'
                onChange={onChangeHandler}
                value={userData.doctorName}
                placeholder="Enter doctor name"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Speciality <span className='text-red-500'>*</span>
              </label>
              <select name='speciality' className='p-3 border border-gray-300 rounded-lg outline-none' value={userData.speciality} onChange={onChangeHandler}>
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
                name='doctorEmail'
                onChange={onChangeHandler}
                type="email"
                value={userData.doctorEmail}
                placeholder="Enter email"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Education <span className='text-red-500'>*</span>
              </label>
              <input
                name='education'
                onChange={onChangeHandler}
                type="text"
                value={userData.education}
                placeholder="Enter education"
                className='p-3 border border-gray-300 rounded-lg outline-none'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-medium'>
                Experience <span className='text-red-500'>*</span>
              </label>
              <select name='experience' value={userData.experience} className='p-3 border border-gray-300 rounded-lg outline-none' onChange={onChangeHandler}>
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
              name='about'
              onChange={onChangeHandler}
              value={userData.about}
              rows="4"
              placeholder="Write about doctor..."
              className='p-3 border border-gray-300 rounded-lg outline-none resize-none'
            />
          </div>
          <div>
            <p>
              {error && <span className="text-base text-red-500">{error}</span>}
            </p>
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
              "Edit Doctor"
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default EditDoctor