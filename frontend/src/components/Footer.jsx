import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js';

const Footer = () => {
    return (
        <div className='mt-20'>
            <div className='flex justify-between flex-col lg:flex-row py-10 border-b border-b-fotter-border gap-8 md:gap-0'>
                <div className='flex flex-col gap-2 md:gap-6'>
                    <img src={assets.Icon_Text} alt={assets.Icon_Text} className=' w-32'/>
                    <p className='text-gray-600 text-[14px]'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting <br />
                        industry. Lorem Ipsum has been the industry's standard dummy<br />
                        text ever since the 1500s, when an unknown printer took a galley of<br />
                        type and scrambled it to make a type specimen book.
                    </p>
                </div>
                <div  className='flex flex-col gap-2 md:gap-6'>
                    <h1 className='text-xl font-semibold leading-5'>Company</h1>
                    <ul className='text-gray-600 text-[14px] flex flex-col gap-1 md:gap-2'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>

                </div>
                <div className='flex flex-col md:gap-6'>
                    <h1 className='text-xl font-semibold leading-5'>GET IN TOUCH</h1>
                    <ul className='text-gray-600 text-[14px] flex flex-col gap-1 md:gap-2'>
                        <li>+0-000-000-000</li>
                        <li>email@gmail.com</li>
                    </ul>
                </div>

            </div>
            <div className='py-6 text-center'>
                <p className='text-[14px]'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
            </div>

        </div>
    )
}

export default Footer