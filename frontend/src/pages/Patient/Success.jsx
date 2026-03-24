import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from '../../store/useAuthStore';
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { downloadPdf } from "../../utils/downloadPdf.js"



const Success = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = useAuthStore((state) => state.backendUrl);
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentId: "",
    appointmentId: "",
    amount: 0,
    status: "",
    qrCode: "",
    createdAt: ""
  });

  useEffect(() => {
    const initializeQr = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${backendUrl}/Payment/get-qrCode/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPaymentData(response.data.payment)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    initializeQr();
  }, [backendUrl, token, id])

  return (
    <div className='my-10'>
      <div
        className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <FaLongArrowAltLeft />
        <p>Back</p>
      </div>
      <div className="flex flex-col items-center ">

        <h1 className="text-2xl font-bold mb-4">
          Payment Successful
        </h1>

        {loading ? <p>Loading.....</p> : !paymentData.paymentId ? (
          <p>No QR code found</p>
        ) : (
          <div className='flex items-center flex-col'>
            <img
              src={`data:image/png;base64,${paymentData.qrCode}`}
              alt="QR Code"
              className="w-64 h-64"
            />

            <button
              onClick={()=>downloadPdf(paymentData.qrCode,paymentData.appointmentId)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>

          </div>
        )}

      </div>
    </div>
  )
}

export default Success