import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import patient_icon from './patient_icon.svg'

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    patient_icon
}

export const adminnavbar = [
    {
        id:1,
        name:"Dashboard",
        icon:home_icon,
        link: "/admin/dashboard"
    },
    {
        id:2,
        name:"Appointment",
        icon:appointment_icon,
        link: "/admin/appointment"
    },
    {
        id:3,
        name:"Doctor List",
        icon:people_icon,
        link: "/admin/doctor-list"
    },
    {
        id:4,
        name:"Patient List",
        icon:patient_icon,
        link: "/admin/patient-list"
    },
    
]


export const appointmentsData = [
  {
    id: 1,
    patientName: "Richard James",
    speciality: "Cardiology",
    date: "2026-03-24",   
    time: "10:00 AM",
    doctorName: "Dr. Richard James",
    doctorImage: "https://randomuser.me/api/portraits/men/45.jpg",
    fees: 50,
  },
  {
    id: 2,
    patientName: "Sophia Williams",
    speciality: "Dermatology",
    date: "2026-03-25",   
    time: "10:00 AM",
    doctorName: "Dr. Sarah Parker",
    doctorImage: "https://randomuser.me/api/portraits/women/65.jpg",
    fees: 70,
  },
  {
    id: 3,
    patientName: "Michael Brown",
    speciality: "Orthopedics",
    date: "2026-03-25",   
    time: "10:00 AM",
    doctorName: "Dr. David Wilson",
    doctorImage: "https://randomuser.me/api/portraits/men/51.jpg",
    fees: 65,
  },
  {
    id: 4,
    patientName: "Emma Johnson",
    patientImage: "https://randomuser.me/api/portraits/women/30.jpg",
    department: "Neurology",
    age: 29,
    date: "2026-03-26",   
    time: "10:00 AM",
    doctorName: "Dr. Olivia Smith",
    doctorImage: "https://randomuser.me/api/portraits/women/48.jpg",
    fees: 80,
  }
];

export const doctorsScheduleData = [
  {
    id: 1,
    doctorName: "Dr. Richard James",
    fees: 50,
    appointments: [
      {
        date: "2024-07-24",
        time: "10:00 AM",
        allowedAppointment: 5,
      },
      {
        date: "2024-07-25",
        time: "02:00 PM",
        allowedAppointment: 3,
      },
    ],
  },
  {
    id: 2,
    doctorName: "Dr. Sarah Parker",
    fees: 70,
    appointments: [
      {
        date: "2024-07-26",
        time: "09:00 AM",
        allowedAppointment: 4,
      },
      {
        date: "2024-07-27",
        time: "01:30 PM",
        allowedAppointment: 6,
      },
    ],
  },
  {
    id: 3,
    doctorName: "Dr. David Wilson",
    fees: 65,
    appointments: [
      {
        date: "2024-07-28",
        time: "11:00 AM",
        allowedAppointment: 2,
      },
      {
        date: "2024-07-29",
        time: "03:00 PM",
        allowedAppointment: 5,
      },
    ],
  },
];

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Richard James",
    email: "richard.james@gmail.com",
    speciality: "General Physician",
    education: "MBBS, MD",
    experience: "5 Years",
    about: "Experienced general physician with expertise in internal medicine.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Dr. Sarah Parker",
    email: "sarah.parker@gmail.com",
    speciality: "Cardiologist",
    education: "MBBS, DM Cardiology",
    experience: "8 Years",
    about: "Specialist in heart-related diseases and preventive cardiology.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Dr. David Wilson",
    email: "david.wilson@gmail.com",
    speciality: "Dermatologist",
    education: "MBBS, MD Dermatology",
    experience: "6 Years",
    about: "Expert in skin treatments and cosmetic dermatology.",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: 4,
    name: "Dr. Emily Watson",
    email: "emily.watson@gmail.com",
    speciality: "Pediatrician",
    education: "MBBS, MD Pediatrics",
    experience: "7 Years",
    about: "Child specialist focused on newborn and adolescent care.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];


export const patientsData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@gmail.com",
    age: 28,
    gender: "Male",
    phone: "+94 77 123 4567",
    registeredDate: "2024-07-20",
    address: "123 Main Street, Colombo",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Emma Johnson",
    email: "emma.johnson@gmail.com",
    age: 32,
    gender: "Female",
    phone: "+94 71 456 7890",
    registeredDate: "2024-07-22",
    address: "45 Lake Road, Kandy",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@gmail.com",
    age: 45,
    gender: "Male",
    phone: "+94 76 987 6543",
    registeredDate: "2024-07-23",
    address: "78 Hill Street, Galle",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  },
  {
    id: 4,
    name: "Sophia Taylor",
    email: "sophia.taylor@gmail.com",
    age: 19,
    gender: "Female",
    phone: "+94 75 234 5678",
    registeredDate: "2024-07-25",
    address: "12 Beach Avenue, Negombo",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];