# 🏥 MedReserve – Doctor Appointment & Payment System

A full-stack web application for managing doctor appointments, secure online payments, QR-based check-ins, and reporting dashboard.

---

## 🚀 Features

- Doctor appointment booking  
- Stripe payment integration  
- QR code generation  
- Download QR as PDF  
- Admin dashboard with filters  
- Export filtered data to Excel  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Vite
- Tailwind CSS  
- Axios (API requests)  
- jsPDF (PDF generation)  
- xlsx (Excel export)  

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Stripe API
- QRCoder

---

## 📦 Installation

### Backend
```
cd backend
dotnet restore
dotnet run
```

### Frontend
```
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

⚠️ **Do NOT expose real credentials in public repositories**

---

### 🔹 Backend (appsettings.json)

```yaml
ConnectionStrings:
  MedReserve: <your_database_connection>

Jwt:
  Key: <your_secret_key>

Email:
  Host: smtp.gmail.com
  Port: 587

Cloudinary:
  CloudName: <your_cloud_name>

Stripe:
  SecretKey: <your_stripe_key>
```

---

### 🔹 Frontend (.env)

```env
VITE_BACKEND_URL=http://localhost:5280/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
VITE_PK_TEST_STRIPE=your_publishable_key
```

---

## 💳 Payment Flow

1. Create appointment  
2. Create PaymentIntent  
3. Complete payment  
4. Verify in backend  
5. Generate QR  
6. Show + download PDF  

---

## 📊 Admin Dashboard

- Filter by date  
- Filter by doctor  
- Filter by patient  
- Export Excel report  

---

## 👨‍💻 Author

MedReserve Project  
📧 [aroshupathilak@gmail.com](mailto:aroshupathilak@gmail.com)

---

## 📄 License

Educational use only
