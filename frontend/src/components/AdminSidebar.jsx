import React from 'react'
import { adminnavbar } from '../assets/assets_admin/assets'
import { NavLink } from "react-router-dom";


const AdminSidebar = () => {
    return (
        <div className='border-r border-r-gray-400 min-h-screen w-60'>
            <div className='flex flex-col items-center justify-center gap-4 my-8'>
                {adminnavbar.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.link}
                        className={({ isActive }) =>
                            `w-full transition-all duration-200 ${isActive
                                ? "bg-admin-active border-r-4 border-r-about-hover"
                                : ""
                            }`
                        }
                    >
                        <div className='flex items-center gap-3 px-3 py-2 w-full hover:bg-gray-100 '>
                            <img
                                src={item.icon}
                                alt="navbar icon"
                                className='w-6 h-6'
                            />
                            <p className='text-sm '>
                                {item.name}
                            </p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default AdminSidebar