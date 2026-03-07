import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore';
import axios from "axios";
import toast from "react-hot-toast";


const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { token } = useParams();
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const backendUrl = useAuthStore((state) => state.backendUrl);
    const navigate = useNavigate();
    const [userPassword, setUserPassword] = useState({
        password: "",
        retypepassword: ""
    })

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUserPassword((prev) => ({ ...prev, [name]: value }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (userPassword.password !== userPassword.retypepassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/User/Reset-Password`, {
                token: decodeURIComponent(token),
                newPassword: userPassword.password
            });
            toast.success(response.data.message);
            setUserPassword({
                password: "",
                retypepassword: ""
            })
            navigate("/")
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
                    <div className="flex flex-col  w-full">
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-semibold text-black ">Reset the password</h1>
                            <p className="text-black text-[13px]">
                                Enter the same password two times
                            </p>
                        </div>
                        <div className='mt-4 flex flex-col gap-4'>
                            <div>
                                <p className='text-gray-500 text-[13px]'>Password</p>
                                <div className='text-[14px] w-full outline-1 rounded-md outline-gray-400 flex items-center justify-between'>
                                    <input name="password" onChange={onChangeHandler} required value={userPassword.password} placeholder='password' type={showPassword ? 'text' : 'password'} className='outline-none w-full  p-2' />
                                    <button type="button" onClick={() => setShowPassword(prev => !prev)} >
                                        {showPassword ? <FaRegEye className='w-4 h-4 text-gray-500' /> : <FaRegEyeSlash className='w-4 h-4 text-gray-500' />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <p className='text-gray-500 text-[13px]'>Re-Enter Password</p>
                                <div className='text-[14px] w-full outline-1 rounded-md outline-gray-400 flex items-center justify-between'>
                                    <input name="retypepassword" onChange={onChangeHandler} required value={userPassword.retypepassword} placeholder='password' type={showResetPassword ? 'text' : 'password'} className='outline-none w-full  p-2' />
                                    <button type="button" onClick={() => setShowResetPassword(prev => !prev)} >
                                        {showResetPassword ? <FaRegEye className='w-4 h-4 text-gray-500' /> : <FaRegEyeSlash className='w-4 h-4 text-gray-500' />}
                                    </button>
                                </div>
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
                                    Reset the Password
                                </button>
                            }

                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword