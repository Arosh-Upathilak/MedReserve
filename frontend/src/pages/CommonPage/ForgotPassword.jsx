import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useAuthStore } from '../../store/useAuthStore';
import axios from "axios";
import toast from "react-hot-toast";


const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const backendUrl = useAuthStore((state) => state.backendUrl);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please Enter the valid Email");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/User/Forgot-Password`, { email });
      toast.success(response.data.message);
      setEmail("");
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
        <form className='flex items-center justify-center flex-col ' onSubmit={onSubmitHandler}>
          <button type="button"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 flex items-center">
            <BsArrowLeft />&nbsp; Back
          </button>
          <div className="mt-8 flex flex-col  w-full">
            <div className='flex flex-col'>
              <h1 className="text-2xl font-semibold text-black ">ForgotPassword</h1>
              <p className="text-black text-[13px]">
                Please enter the email to forgotpassword
              </p>
            </div>
            <div className='mt-4 flex flex-col gap-4'>
              <div >
                <p className='text-gray-500 text-[13px]'>Email</p>
                <input placeholder='test@email.com' required value={email} onChange={(e) => setEmail(e.target.value)} className='text-[14px] w-full outline-1 p-2 rounded-md outline-gray-400' type='email' />
              </div>
              <div>
                <p>
                  {error && <span className="text-base text-red-500">{error}</span>}
                </p>
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
                  Send the OTP
                </button>
              }

            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default ForgotPassword