import jsPDF from "jspdf";

export const downloadPdf = (qrCode, paymentId) => {
    if (!qrCode) {
        alert("No QR available");
        return;
    }

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(16);
    const title = "Appointment QR Code";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;

    doc.text(title, titleX, 20);

    const imgWidth = 100;
    const imgHeight = 100;
    const imgX = (pageWidth - imgWidth) / 2;

    doc.addImage(
        `data:image/png;base64,${qrCode}`,
        "PNG",
        imgX,
        40,
        imgWidth,
        imgHeight
    );

    doc.setFontSize(12);
    const paymentText = `Payment ID: ${paymentId}`;
    const paymentWidth = doc.getTextWidth(paymentText);
    const paymentX = (pageWidth - paymentWidth) / 2;

    doc.text(paymentText, paymentX, 160);

    doc.setFontSize(10);
    doc.text("MedReserve", pageWidth / 2, pageHeight - 10, {
        align: "center"
    });

    doc.save(`appointment-qr-${paymentId}.pdf`);
};