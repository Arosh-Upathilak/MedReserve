import React from 'react'

const BookingTimeCard = ({active,onClick}) => {
    return (
        <div className={`p-4 rounded-2xl   cursor-pointer ${active? "bg-blue-600 text-white":"bg-gray-300 text-black/80"}`} onClick={onClick}>
            <div className='flex items-center gap-2'>
                <p >Date:</p>
                <p>2026/05/12</p>
            </div>
            <div className='flex items-center gap-2'>
                <p>Time:</p>
                <p>10.00 A.M.</p>
            </div>

        </div>
    )
}

export default BookingTimeCard