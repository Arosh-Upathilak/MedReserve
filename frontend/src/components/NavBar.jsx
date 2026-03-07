import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore.js';
import { navItems } from '../constants/constants.js';
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  return (
    <nav className='py-4 flex items-center justify-between border-b border-b-gray-400'>
      <Link to="/" className='flex items-center gap-2'>
        <img src={assets.Icon_Text} alt="Icon" className='w-44 ' />
      </Link>
      <ul className='hidden lg:flex gap-5 font-medium'>
        {navItems.map(item => <li key={item.to}><NavLink to={item.to} className={({ isActive }) => isActive ? "border-b-2 border-b-btn-bg" : "hover:text-btn-bg border-none transition-all duration-200"}>{item.label}</NavLink></li>)}
      </ul>
      {token ?
        <div className='relative group hidden lg:block'>
          <div className='flex items-center justify-center gap-2 '>
            <div className='w-9 h-9 rounded-full  flex items-center justify-center bg-gray-600 text-white font-semibold'>{user.name.slice(0,1)}</div>
            <img src={assets.dropdown_icon} className='w-2.5' />
            <div className='absolute top-0 right-0  pt-14 text-base  font-medium text-gray-400 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded-2xl flex flex-col gap-4 p-4'>
                <NavLink to='/my-profile' className={({ isActive }) => isActive ? "text-gray-950" : "hover:text-gray-950 transition-all duration-200"}>My Profile</NavLink>
                <NavLink to='/my-appointment' className={({ isActive }) => isActive ? "text-gray-950" : "hover:text-gray-950 transition-all duration-200"}>My Appointments</NavLink>
                <button className='flex items-center justify-center text-white bg-btn-bg  hover:bg-btn-bg-hover text-sm' onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        :
        <button className='hidden lg:block text-white bg-btn-bg  hover:bg-btn-bg-hover text-sm rounded-2xl px-4' onClick={() => navigate("/login" , { state: { backgroundLocation: location } })}>Login Account</button>
      }
      <button className='lg:hidden'><img src={assets.menu_icon} onClick={() => setShowMobileNav(prev => !prev)} /></button>

      {/*Mobile Nav bar */}
      <div
        className={`
          lg:hidden fixed inset-0 z-50 transition-opacity duration-400
          ${showMobileNav ? "opacity-100 " : "opacity-0  pointer-events-none"}
        `}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowMobileNav(false)}
        />

        <div
          className={`
            absolute top-0 bottom-0 right-0 w-[80%] bg-btn-bg-hover text-white
            transform transition-transform duration-300 ease-in-out
            ${showMobileNav ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-end mb-10">
              <img
                src={assets.cross_icon}
                alt="Close"
                className="w-7 h-7 cursor-pointer"
                onClick={() => setShowMobileNav(false)}
              />
            </div>

            <ul className="flex flex-col gap-8 text-lg font-medium">
              {navItems.map(item => <li key={item.to}><NavLink to={item.to} onClick={() => setShowMobileNav(false)} className={({ isActive }) => isActive ? "border-b-2 border-b-btn-bg pb-1" : "hover:text-btn-bg transition-all duration-200"}>{item.label}</NavLink></li>)}
              {
                token &&
                <>
                  <li>
                    <NavLink
                      to="/my-profile"
                      onClick={() => {
                        setShowMobileNav(false);
                      }}
                      className={({ isActive }) => isActive ? "border-b-2 border-b-btn-bg pb-1" : "hover:text-btn-bg transition-all duration-200"}
                    >
                      MY PROFILE
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-appointment"
                      onClick={() => {
                        setShowMobileNav(false);
                      }}
                      className={({ isActive }) => isActive ? "border-b-2 border-b-btn-bg pb-1" : "hover:text-btn-bg transition-all duration-200"}
                    >
                      MY APPOINTMENT
                    </NavLink>
                  </li>
                </>
              }
            </ul>

            <div className="mt-auto">
              {
                token ? <button  onClick={logout} className="w-full py-3.5 bg-white text-cyan-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                  Logout
                </button> :
                  <button className="w-full py-3.5 bg-white text-cyan-900 font-medium rounded-lg hover:bg-gray-100 transition-colors" onClick={() => { navigate("/login", { state: { backgroundLocation: location } }); setShowMobileNav(false) }}>
                    Login account
                  </button>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar