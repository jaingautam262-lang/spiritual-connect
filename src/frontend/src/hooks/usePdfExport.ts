import { jsPDF } from "jspdf";

export function exportToPdf(
  elementId: string,
  filename: string,
  title: string,
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`exportToPdf: element with id "${elementId}" not found`);
    return;
  }

  const rawText = element.textContent ?? "";
  const cleaned = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 15;
  const marginRight = 15;
  const marginTop = 20;
  const marginBottom = 20;
  const usableWidth = pageWidth - marginLeft - marginRight;

  let cursorY = marginTop;

  // Header bar
  doc.setFillColor(180, 90, 20);
  doc.rect(0, 0, pageWidth, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Spiritual Connect", marginLeft, 8);
  doc.text("spiritualconnect.app", pageWidth - marginRight, 8, {
    align: "right",
  });

  cursorY = 22;

  // Title
  doc.setTextColor(120, 53, 15);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(title, usableWidth) as string[];
  doc.text(titleLines, marginLeft, cursorY);
  cursorY += titleLines.length * 8 + 2;

  // Subtitle
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120, 70, 30);
  doc.text("Spiritual Connect — Calculator Result", marginLeft, cursorY);
  cursorY += 7;

  // Date
  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${dateStr}`, marginLeft, cursorY);
  cursorY += 6;

  // Divider
  doc.setDrawColor(180, 90, 20);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, cursorY, pageWidth - marginRight, cursorY);
  cursorY += 8;

  // Body text
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);

  const bodyLines = doc.splitTextToSize(cleaned, usableWidth) as string[];
  const lineHeight = 5.5;
  const footerHeight = 14;

  for (const line of bodyLines) {
    if (cursorY + lineHeight > pageHeight - marginBottom - footerHeight) {
      addFooter(doc, pageWidth, pageHeight);
      doc.addPage();
      cursorY = marginTop;
    }
    doc.text(line, marginLeft, cursorY);
    cursorY += lineHeight;
  }

  addFooter(doc, pageWidth, pageHeight);

  const safeName = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  doc.save(safeName);
}

function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number): void {
  const footerY = pageHeight - 10;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(15, footerY - 4, pageWidth - 15, footerY - 4);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120, 80, 30);
  doc.text(
    "Visit spiritualconnect.app for more spiritual tools",
    pageWidth / 2,
    footerY,
    { align: "center" },
  );
}

export function usePdfExport(): { exportToPdf: typeof exportToPdf } {
  return { exportToPdf };
}
