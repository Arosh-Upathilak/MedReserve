import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-screen ">
        <AdminSidebar />
        <div className="flex-1 p-6 overflow-y-auto bg-admin-bg">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;