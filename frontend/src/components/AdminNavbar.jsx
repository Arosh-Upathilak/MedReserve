import React from 'react'
import { Link } from "react-router-dom";
import { assets } from '../assets/assets_admin/assets';


const AdminNavbar = () => {
    return (
        <nav className='py-4  border-b border-b-gray-400 '>
            <div className='md:mx-[5%] mx-4 flex items-center justify-between'>
                <Link to="/admin/dashboard" className='flex items-center gap-2'>
                    <img src={assets.admin_logo} alt="Icon" className='w-44 ' />
                </Link>
                <button className='flex items-center justify-center text-white bg-btn-bg px-4 hover:bg-btn-bg-hover text-sm rounded-2xl'>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar