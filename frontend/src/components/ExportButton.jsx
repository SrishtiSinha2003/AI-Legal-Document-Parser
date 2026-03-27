import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExportButton() {
  const handleExport = async () => {
    const element = document.getElementById("report");
    if (!element) {
      alert("Nothing to export yet. Analyze a document first.");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 400));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#faf8f5",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("legal-analysis-report.pdf");
  };

  return (
    <button type="button" onClick={handleExport} className="btn-export">
      <span className="btn-export-icon" aria-hidden="true" />
      Export PDF
    </button>
  );
}
