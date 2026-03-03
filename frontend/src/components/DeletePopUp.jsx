import React from 'react'
import { RxCross2 } from "react-icons/rx";

const DeletePopUp = ({ setDeletePopUp, onConfirm }) => {
    return (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center 
                    px-4 py-8 overflow-y-auto'>

            <div className='relative bg-white rounded-2xl shadow-xl 
                      w-full max-w-md
                      p-8'>

                <button
                    type="button"
                    onClick={setDeletePopUp}
                    className="absolute top-4 right-4"
                >
                    <RxCross2 className="w-6 h-6" />
                </button>

                <div className='flex flex-col items-center gap-6 text-center'>

                    <h2 className='text-xl font-semibold text-red-600'>
                        Delete Confirmation
                    </h2>

                    <p className='text-gray-600 text-[14px]'>
                        Are you sure you want to delete this record?
                        This action cannot be undone.
                    </p>

                    <div className='flex gap-4 w-full items-center justify-between'>

                        <button
                            type="button"
                            onClick={setDeletePopUp}
                            className='px-6 py-2 border border-gray-400 rounded-lg 
                         hover:bg-gray-100 transition'
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className='px-6 py-2 bg-red-600 text-white rounded-lg 
                         hover:bg-red-700 transition'
                        >
                            Delete
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeletePopUp