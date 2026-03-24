import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { timeConverter } from "./timeConverter.js"

export const downloadExcel = (filterData) => {
  if (filterData.length === 0) {
    alert("No data to export");
    return;
  }

  const excelData = filterData.map((item) => ({
    ID: item.paymentId,
    PatientName: item.userName,
    Date: item.scheduleDate,
    Time: timeConverter(item.scheduleTime),
    Doctor: item.doctorName,
    AppointmentNumber: item.appointmentNumber,
    Fee: item.fee
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  worksheet["!cols"] = [
    { wch: 25 }, 
    { wch: 20 }, 
    { wch: 15 }, 
    { wch: 10 }, 
    { wch: 20 }, 
    { wch: 20 }, 
    { wch: 10 }  
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });

  saveAs(file, "appointments_report.xlsx");
};