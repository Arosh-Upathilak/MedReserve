import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";

function SpectialDoctors() {
  return (
    <div className="my-10">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl md:text-3xl font-semibold"> Find by Speciality </h1>
        <p className="text-center text-[12px] text-gray-600">
          Simply browse through our extensive list of trusted doctors,
          <br /> schedule your appointment hassle-free.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap  items-center justify-center gap-8 ">
        {specialityData.map((item,index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-4  hover:-translate-y-6 duration-300 cursor-pointer">
            <img src={item.image} alt={item.image} className="w-25 h-25" />
            <p className="text-[12px] ">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpectialDoctors;
