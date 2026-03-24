import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useMessagePopUpStore } from "../store/useMessagePopUpStore";

const MessageShowBox = () => {
    const { isMassageBoxOpen, setMessageBoxClose, loading, setLoading, callBackFunction, message, isConfirm } = useMessagePopUpStore();
    if (!isMassageBoxOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/50 z-50 flex justify-center items-center 
                        px-4 py-8 overflow-y-auto'>

            <div className='relative bg-white rounded-2xl shadow-xl 
                          w-full max-w-md
                          p-8'>

                <button
                    type="button"
                    className="absolute top-4 right-4"
                    onClick={() => setMessageBoxClose()}
                >
                    <RxCross2 className="w-6 h-6" />
                </button>

                <div className='flex flex-col items-center gap-6 text-center'>

                    <h2 className='text-xl font-semibold text-blue-600'>
                        Message Box
                    </h2>

                    <p className='text-gray-600 text-[14px]'>
                        {message}
                    </p>

                    <div className={` flex gap-4 w-full items-center ${isConfirm ? 'justify-between' : 'justify-center'}`}>

                        <button
                            type="button"
                            className='px-6 py-2 border border-gray-400 rounded-lg 
                             hover:bg-gray-100 transition'
                            onClick={() => setMessageBoxClose()}
                        >
                            Cancel
                        </button>

                        {isConfirm ? <button
                            type="button"
                            className='px-6 py-2 bg-blue-600 text-white rounded-lg 
                             hover:bg-blue-700 transition'
                            onClick={async () => {
                                if (!callBackFunction) return;

                                try {
                                    setLoading(true);
                                    await callBackFunction();
                                } catch (error) {
                                    console.error(error);
                                } finally {
                                    setLoading(false);
                                    setMessageBoxClose();
                                }
                            }}
                        >{loading ? <p>Confirming....</p> : <p>Confirm</p>}
                        </button> : ""}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MessageShowBox