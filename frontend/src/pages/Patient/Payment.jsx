import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { timeConverter } from '../../utils/timeConverter.js'
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_PK_TEST_STRIPE);

const PaymentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const backendUrl = useAuthStore((state) => state.backendUrl);
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState({
        appointmentId: "",
        appointmentNumber: 0,
        createdAt: "",
        doctorId: "",
        doctorImageUrl: "",
        doctorName: "",
        doctorScheduleTimeId: "",
        fee: 0,
        scheduleDate: "",
        scheduleTime: "",
        status: ""
    });

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${backendUrl}/Appointment/GetAppointmentByAppointmentId/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setAppointment(response.data.appointment);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id, token, backendUrl]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardNumberElement);

        if (!cardElement) {
            alert("Card element not loaded");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${backendUrl}/Payment/create-payment/${id}`,
                { amount: appointment.fee },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const clientSecret = response.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: "Customer"
                    }
                }
            });

            if (result.error) {
                console.error(result.error.message);
                alert(result.error.message);
                return;
            }

            if (result.paymentIntent.status === "succeeded") {
                const response = await axios.post(
                    `${backendUrl}/Payment/confirm-payment/${id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                toast.success(response.data.message);
                navigate(`/success/${response.data.paymentId}`)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='my-10 '>
            <div
                className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-gray-800"
                onClick={() => navigate(-1)}
            >
                <FaLongArrowAltLeft />
                <p>Back</p>
            </div>

            {!appointment ? <div>Loading.....</div> : appointment && (
                <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-8'>

                    <div className='flex items-center flex-col'>
                        <h2 className='text-xl font-semibold mb-4 underline underline-offset-2'>Appointment Details</h2>
                        <div className="rounded-md bg-header-bg w-1/2 overflow-hidden">
                            <img
                                src={appointment.doctorImageUrl}
                                alt="doctor"
                                className='w-full h-full object-cover rounded-md'
                            />
                        </div>

                        <p className='font-medium'>{appointment.doctorName}</p>
                        <p>{appointment.speciality}</p>

                        <div className='mt-4 space-y-2 text-sm text-black text-center'>
                            <p><span className='font-medium text-gray-600'>Date:</span> {appointment.scheduleDate}</p>
                            <p><span className='font-medium text-gray-600'>Time:</span> {timeConverter(appointment.scheduleTime)}</p>
                            <p><span className='font-medium text-gray-600'>Appointment No:</span> {appointment.appointmentNumber}</p>
                            <p className='text-sm font-semibold'>Rs. {appointment.fee}</p>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-lg border border-gray-100 shadow-[0_10px_25px_rgba(0,0,0,0.08),0_-4px_10px_rgba(0,0,0,0.05)]">

                        <div className="flex items-center gap-4 mb-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-6 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6 object-contain" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg" className="h-4 object-contain" />
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">
                                    <span className="text-red-500">*</span> Name on card
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Name on card"
                                    className="w-full border border-gray-300 focus:border-blue-500 outline-none p-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-1 text-gray-700">
                                    <span className="text-red-500">*</span> Card Number
                                </label>
                                <div className="border border-gray-300 p-2 rounded-md">
                                    <CardNumberElement />
                                </div>
                            </div>

                            <div className="flex gap-4 mb-4">
                                <div className="w-1/2">
                                    <label className="block text-sm mb-1 text-gray-700">
                                        <span className="text-red-500">*</span> Expiry
                                    </label>
                                    <div className="border border-gray-300 p-2 rounded-md">
                                        <CardExpiryElement />
                                    </div>
                                </div>

                                <div className="w-1/2">
                                    <label className="block text-sm mb-1 text-gray-700">
                                        <span className="text-red-500">*</span> CVV
                                    </label>
                                    <div className="border border-gray-300 p-2 rounded-md">
                                        <CardCvcElement />
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 mb-6">
                                We will save this card for your convenience. If required, you can remove the card in the
                                "Payment Options" section in the "Account" menu.
                            </p>

                            <button
                                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
                                type="submit"
                                disabled={!stripe || loading}
                            >
                                {loading ? "Processing..." : `Pay Rs. ${appointment.fee}`}
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}
