import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore';
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const setToken = useAuthStore((state) => state.setToken);
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev, [name]: value
    }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setError("Fill all the inputs.")
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/User/Login`, user);
      toast.success(response.data.message);
      const token = response.data.token;
      setUser({
        email: "",
        password: ""
      })
      setToken(token);
      if (response.data.role == "Admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/")
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setError(null);
    }
  }

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
      <div className='relative bg-white rounded-2xl p-6 shadow-xl w-[90%] sm:w-[70%] md:w-[40%] lg:w-[25%] max-w-md'>
        <form className='flex items-center justify-center flex-col' onSubmit={onSubmitHandler} >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4"
          >
            <RxCross2 className="w-4 h-4" />
          </button>
          <div className="flex flex-col  w-full">
            <div className='flex flex-col'>
              <h1 className="text-2xl font-semibold text-black ">Login</h1>
              <p className="text-black text-[13px]">
                Please log in to book appointment
              </p>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
              <div >
                <p className='text-gray-500 text-[13px]'>Email</p>
                <input placeholder='test@email.com' className='text-[14px] w-full outline-1 p-2 rounded-md outline-gray-400' name="email" type="email" required value={user.email} onChange={onChangeHandler} />
              </div>
              <div>
                <p className='text-gray-500 text-[13px]'>Password</p>
                <div className='text-[14px] w-full outline-1 rounded-md outline-gray-400 flex items-center justify-between'>
                  <input placeholder='password' type={showPassword ? 'text' : 'password'} name="password" value={user.password} required onChange={onChangeHandler} className='outline-none w-full  p-2' />
                  <button type="button" onClick={() => setShowPassword(prev => !prev)} >
                    {showPassword ? <FaRegEye className='w-4 h-4 text-gray-500' /> : <FaRegEyeSlash className='w-4 h-4 text-gray-500' />}
                  </button>
                </div>
              </div>
              <div>
                <p>
                  {error && <span className="text-base text-red-500">{error}</span>}
                </p>
              </div>
              <div className='flex text-[14px] justify-between items-center text-gray-700'>
                <p>Forgot Password ?</p>
                <Link to='/forgot-password' state={{ backgroundLocation: location.state?.backgroundLocation || location }}
                  className='underline text-blue-800 hover:text-blue-600'>Click here</Link>
              </div>
              {loading ?
                <div className='p-2  rounded-md bg-form-btn flex items-center justify-center'>
                  <ThreeDots
                    height="24"
                    width="40"
                    color="#ffffff"
                    visible={true}
                  /></div> :
                <button className='p-2  rounded-md text-[14px] text-white font-medium bg-form-btn hover:text-white/50' type='submit'>
                  Login
                </button>
              }
              <div className='flex text-[14px] justify-between items-center '>
                <p>Create an new account ? </p>
                <Link to='/signup' state={{ backgroundLocation: location.state?.backgroundLocation || location }}
                  className='underline text-blue-800 hover:text-blue-600'>Click here</Link>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Login