import React from 'react'
import { assets } from '../../assets/assets_frontend/assets.js';

const About = () => {
  return (
    <div className='my-10'>
      <h1 className='text-2xl text-gray-600 text-center'>ABOUT <span className='text-black font-medium'>US</span></h1>
      <div className='mt-10 flex items-center justify-center flex-col lg:flex-row gap-20'>
        <div className='lg:w-1/3'>
          <img src={assets.about_image} alt={assets.about_image} className='w-full' />
        </div>
        <div className='lg:w-2/3 text-[14px] text-gray-600 flex flex-col items-start justify-center gap-8'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and<br />
            efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling<br />
            doctor appointments and managing their health records.
          </p>

          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance<br />
            our platform, integrating the latest advancements to improve user experience and deliver superior<br />
            service. Whether you're booking your first appointment or managing ongoing care, Prescripto is<br />
            here to support you every step of the way.
          </p>
          <div className='flex flex-col gap-5'>
            <span className='text-black font-semibold'>Our Vision</span>
            <p>
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim<br />
              to bridge the gap between patients and healthcare providers, making it easier for you to access the<br />
              care you need, when you need it.
            </p>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <span >WHY <span className='font-medium'>CHOOSE US</span></span>
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 border border-gray-300">
          <div className="px-10 py-15 border-b md:border-b-0 md:border-r last:border-r-0 border-gray-300 text-gray-600  hover:bg-about-hover hover:text-white flex flex-col gap-3 cursor-pointer" >
            <h1 className='font-semibold  '>EFFICIENCY:</h1>
            <p className='text-[12px] '>Streamlined appointment scheduling<br />
              that fits into your busy lifestyle.
            </p>
          </div>
          <div className="px-10 py-15 border-b md:border-b-0 md:border-r last:border-r-0 border-gray-300 text-gray-600 hover:bg-about-hover hover:text-white flex flex-col gap-3 cursor-pointer">
            <h1 className='font-semibold'>CONVENIENCE:</h1>
            <p className='text-[12px]'>Access to a network of trusted<br />
              healthcare professionals in your area.
            </p>
          </div>
          <div className="px-10 py-15 border-b md:border-b-0 md:border-r last:border-r-0 border-gray-300 text-gray-600 hover:bg-about-hover hover:text-white flex flex-col gap-3 cursor-pointer">
            <h1 className='font-semibold'>PERSONALIZATION:</h1>
            <p className='text-[12px]'>Tailored recommendations and reminders to<br />
              help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About