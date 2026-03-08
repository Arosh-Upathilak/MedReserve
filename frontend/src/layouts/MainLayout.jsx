import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className='sm:mx-[10%] mx-4'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;