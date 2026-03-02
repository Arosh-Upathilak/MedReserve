import React, { useContext, useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { RxCross2 } from "react-icons/rx";
import PhoneInput from 'react-phone-input-2';
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState("")
    return (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center'>
            <div className='relative bg-white rounded-2xl p-6 shadow-xl w-[90%] sm:w-[70%] md:w-[40%] lg:w-[25%] max-w-md'>
                <form className='flex items-center justify-center flex-col ' >
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="absolute top-4 right-4"
                    >
                        <RxCross2 className="w-4 h-4" />
                    </button>
                    <div className="flex flex-col  w-full">
                        <div className='flex flex-col'>
                            <h1 className="text-2xl font-semibold text-black ">Create Account</h1>
                            <p className="text-black text-[13px]">
                                Please sign up to book appointment
                            </p>
                        </div>
                        <div className='mt-4 flex flex-col gap-4'>
                            <div >
                                <p className='text-gray-500 text-[13px]'>User Name</p>
                                <input placeholder='user name' className='text-[14px] w-full outline-1 p-2 rounded-md outline-gray-400' type='text' />
                            </div>
                            <div >
                                <p className='text-gray-500 text-[13px]'>Email</p>
                                <input placeholder='test@email.com' className='text-[14px] w-full outline-1 p-2 rounded-md outline-gray-400' type='text' />
                            </div>
                            <div >
                                <p className='text-gray-500 text-[13px]'>Phone Number</p>
                                <PhoneInput
                                    country="lk"
                                    onlyCountries={['lk']}
                                    disableDropdown={true}
                                    countryCodeEditable={false}
                                    value={phone}
                                    onChange={(value) => {
                                        if (value.length <= 11) {
                                            setPhone(value);
                                        }
                                    }}
                                    inputClass="!w-full !text-[14px] !border-gray-400 !rounded-md"
                                    containerClass="w-full"
                                    buttonClass="!border !border-gray-400 !rounded-l-md"
                                />
                            </div>
                            <div>
                                <p className='text-gray-500 text-[13px]'>Password</p>
                                <div className='text-[14px] w-full outline-1 rounded-md outline-gray-400 flex items-center justify-between'>
                                    <input placeholder='password' type={showPassword ? 'text' : 'password'} className='outline-none w-full  p-2' />
                                    <button type="button" onClick={() => setShowPassword(prev => !prev)} >
                                        {showPassword ? <FaRegEye className='w-4 h-4 text-gray-500' /> : <FaRegEyeSlash className='w-4 h-4 text-gray-500' />}
                                    </button>
                                </div>

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
                                    Create Account
                                </button>
                            }
                            <div className='flex text-[14px] justify-between items-center '>
                                <p>Already have an account?  </p>
                                <Link to='/login' state={{ backgroundLocation: location.state?.backgroundLocation || location }} className='underline text-blue-800 hover:text-blue-600'>Click here</Link>
                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp