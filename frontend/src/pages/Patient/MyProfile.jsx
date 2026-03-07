import React, { useEffect, useState } from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdDriveFolderUpload } from "react-icons/md";
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';
import toast from "react-hot-toast";
import { ThreeDots } from 'react-loader-spinner';
import { uploadImages } from '../../utils/cloudinaryUpload.js'

const MyProfile = () => {
  const [imageFile, setImageFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({
    profileImageUrl: "",
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    birthday: ""
  });
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDelete = () => {
    setImageFile(null);
    setUserData(prev => ({
      ...prev,
      profileImageUrl: ""
    }));
  };

  useEffect(() => {
    if (!token) return;
    const initialProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/User/Profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = response.data.user;
        setUserData({
          profileImageUrl: user.userImageUrl ?? "",
          userName: user.userName ?? "",
          email: user.email ?? "",
          phoneNumber: user.phoneNumber ?? "",
          address: user.address ?? "",
          gender: user.gender ?? "",
          birthday: user.birthDay ?? ""
        });

      } catch (error) {
        console.error(error);
      }
    };

    initialProfile();

  }, [backendUrl, token]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const onSubmitHandler = async () => {
    if (!isEdit) return;
    try {
      setLoading(true);

      let imageUrl = userData.profileImageUrl;

      if (imageFile) {
        const result = await uploadImages("MedReserve/profile", [imageFile]);
        imageUrl = result[0]?.url;
      }

      const payload = {
        phoneNumber: userData.phoneNumber,
        address: userData.address,
        profileImageUrl: imageUrl,
        birthday: userData.birthday || null,
        gender: userData.gender || null
      };

      console.log(payload)
      const response = await axios.put(
        `${backendUrl}/User/ChangeProfile`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success(response.data.message);
      setIsEdit(false);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='my-10'>
      <form className='flex items-center justify-center flex-col' >
        <div className="relative w-40 h-40 my-4">
          <div className="w-40 h-40 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
            {isEdit && <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileUpload"
              onChange={handleImageChange}
            />}

            <label
              htmlFor={isEdit ? "profileUpload" : undefined}
              className="w-full h-full flex items-center justify-center cursor-pointer"
            >
              {imageFile || userData.profileImageUrl ? (
                <img
                  src={imageFile ? URL.createObjectURL(imageFile) : userData.profileImageUrl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : isEdit ? (
                <div className="text-gray-500 text-sm flex flex-col items-center gap-2 p-2">
                  <MdDriveFolderUpload className="w-8 h-8" />
                  <span className="font-semibold text-[18px]">
                    Upload Image
                  </span>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">No Image</div>
              )}
            </label>
          </div>
          {imageFile || userData.profileImageUrl && isEdit && (
            <div className="absolute bottom-2 right-0 flex gap-2">
              <label
                htmlFor="profileUpload"
                className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100 transition"
              >
                <FaPen className="text-gray-700 text-sm" />
              </label>

              <button
                type='button'
                onClick={handleDelete}
                className="bg-white p-2 rounded-full shadow cursor-pointer hover:bg-red-100 transition"
              >
                <FaTrash className="text-red-500 text-sm" />
              </button>

            </div>
          )}
        </div>
        <p className='text-3xl py-2'>{userData.userName}</p>

        <div className='border-t border-gray-500 w-full lg:w-[60%] py-6 flex flex-col gap-4'>

          <p className='underline text-gray-500 text-center font-medium'>
            CONTACT INFORMATION
          </p>

          <div className='flex flex-col md:flex-row items-center gap-2'>
            <p className='md:w-40'>Email :</p>
            <input
              type="text"
              value={userData.email}
              disabled
              className="outline-none p-2 bg-transparent text-gray-500 cursor-default w-full text-center md:text-start"
            />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-2'>
            <p className='md:w-40'>Phone Number :</p>
            <input
              name='phoneNumber'
              value={userData.phoneNumber}
              onChange={onChangeHandler}
              disabled={!isEdit}
              className={`outline-none p-2 rounded-xl w-full text-center md:text-start ${!isEdit
                ? "bg-transparent text-gray-500 cursor-default"
                : "bg-gray-200"
                }`}
            />
          </div>

          <div className='flex flex-col md:flex-row items-center md:items-start  gap-2'>
            <p className='md:w-40 pt-1'>Address :</p>
            <textarea
              value={userData.address}
              name="address"
              onChange={onChangeHandler}
              disabled={!isEdit}
              rows={3}
              className={`outline-none p-2 rounded-xl resize-none w-full text-center md:text-start ${!isEdit
                ? "bg-transparent text-gray-500 cursor-default"
                : "bg-gray-200"
                }`}
            />
          </div>

          <p className='mt-6 underline text-gray-500 text-center font-medium'>
            BASIC INFORMATION
          </p>

          <div className='flex flex-col md:flex-row items-center gap-2'>
            <p className='md:w-40'>Gender :</p>
            <select
              name="gender"
              value={userData.gender}
              onChange={onChangeHandler}
              disabled={!isEdit}
              className={`outline-none p-2 rounded-xl w-full text-center md:text-start ${!isEdit
                ? "bg-transparent text-gray-500 cursor-default appearance-none"
                : "bg-gray-200"
                }`}
            >
              <option value="NotPrefer">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>

            </select>
          </div>

          <div className='flex flex-col md:flex-row items-center gap-2'>
            <p className='md:w-40'>Birthday :</p>

            <div className='flex items-center justify-center w-full'>
              {isEdit ?
                <input
                  type="date"
                  name='birthday'
                  value={userData.birthday}
                  onChange={onChangeHandler}
                  disabled={!isEdit}
                  className={`outline-none p-2 rounded-xl w-full ${!isEdit
                    ? "bg-transparent text-gray-500 cursor-default"
                    : "bg-gray-200"
                    }`}
                /> : <div className='p-2 bg-transparent text-gray-500  w-full text-center md:text-start'>{userData.birthday} </div>}
            </div>
          </div>


          <div className='mt-6 flex items-center justify-center gap-4'>

            {!isEdit && (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="p-2 bg-btn-bg rounded-2xl text-white w-80"
              >
                Edit Details
              </button>
            )}

            {isEdit && (
              <>
                <button
                  type="button"
                  onClick={onSubmitHandler}
                  disabled={loading}
                  className="p-2 bg-btn-bg rounded-2xl text-white md:w-80 flex justify-center w-full"
                >
                  {loading ? (
                    <ThreeDots
                      height="24"
                      width="40"
                      color="#ffffff"
                      visible={true}
                    />
                  ) : (
                    "Save Details"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEdit(false);
                    setImageFile(null);
                  }}
                  className="p-2 bg-gray-400 rounded-2xl text-white"
                >
                  Cancel
                </button>
              </>
            )}

          </div>

        </div>
      </form>
    </div>

  )
}

export default MyProfile