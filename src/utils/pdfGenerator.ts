import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (p0: string, fileName: string) => {
  const element = document.getElementById("resume-preview");
  if (!element) return;

  // Increase sharpness using higher scale
  const scale = window.devicePixelRatio * 3; // dynamically high DPI scaling

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    scrollX: 0,
    scrollY: 0,
    backgroundColor: "#ffffff", // ensure white background
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  const yOffset = (pdfHeight - imgHeight) / 2; // center vertically if smaller
  pdf.addImage(imgData, "PNG", 0, yOffset > 0 ? yOffset : 0, imgWidth, imgHeight);
  pdf.save("resume.pdf");
};
