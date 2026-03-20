import React from 'react'
import { timeConverter } from '../utils/timeConverter.js'

const BookingTimeCard = ({ active, onClick, fee, scheduleTimes }) => {
    return (
        <div className={`p-4 rounded-2xl   cursor-pointer ${active ? "bg-blue-600 text-white" : "bg-gray-300 text-black/80"}`} onClick={onClick}>
            <div className="flex items-center gap-2 ">
                <p >Appointment fee:</p>
                <p>RS. {fee} /-</p>
            </div>
            <div className='flex items-center gap-2'>
                <p >Date:</p>
                <p>{scheduleTimes.scheduleDate}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p>Time:</p>
                <p>{timeConverter(scheduleTimes.scheduleTime)}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p >Available Booking slots :</p>
                <p>{scheduleTimes.allowedAppointments}</p>
            </div>
            <div className='flex items-center gap-2'>
                <p >Booking slots : </p>
                <p>{scheduleTimes.allowedAppointments}</p>
            </div>

        </div>
    )
}

export default BookingTimeCard