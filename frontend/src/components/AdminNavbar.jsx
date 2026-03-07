import React from 'react'
import { Link } from "react-router-dom";
import { assets } from '../assets/assets_admin/assets';
import { useAuthStore } from '../store/useAuthStore';


const AdminNavbar = () => {
    const logout = useAuthStore((state) => state.logout);
    return (
        <nav className='py-4  border-b border-b-gray-400 '>
            <div className='md:mx-[5%] mx-4 flex items-center justify-between'>
                <Link to="/admin/dashboard" className='flex items-center gap-2'>
                    <img src={assets.admin_logo} alt="Icon" className='w-44 ' />
                </Link>
                <button onClick={logout} className='flex items-center justify-center text-white bg-btn-bg px-4 hover:bg-btn-bg-hover text-sm rounded-2xl'>
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default AdminNavbar