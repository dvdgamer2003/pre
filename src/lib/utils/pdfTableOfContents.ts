import { jsPDF } from 'jspdf';
import { PDF_STYLES } from './pdfStyles';
import { CategoryLabels } from '@/types/categories';

export function generateTableOfContents(doc: jsPDF, categories: string[]): void {
  const margin = PDF_STYLES.margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = margin;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(PDF_STYLES.headingFontSize);
  doc.setTextColor(...PDF_STYLES.colors.primary);
  doc.text('Table of Contents', margin, yPos);
  yPos += PDF_STYLES.spacing.after.heading;

  // Separator line
  doc.setDrawColor(...PDF_STYLES.colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // List categories
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(PDF_STYLES.bodyFontSize);
  doc.setTextColor(...PDF_STYLES.colors.text);

  categories.forEach((category, index) => {
    const pageNumber = index + 3; // Title page is 1, TOC is 2
    const displayName = CategoryLabels[category as keyof typeof CategoryLabels] || category;
    
    // Category name
    doc.text(displayName, margin, yPos);
    
    // Page number
    doc.text(pageNumber.toString(), pageWidth - margin - 10, yPos, { align: 'right' });
    
    // Dotted line
    const textWidth = doc.getTextWidth(displayName);
    const numberWidth = doc.getTextWidth(pageNumber.toString());
    const dotsStart = margin + textWidth + 5;
    const dotsEnd = pageWidth - margin - numberWidth - 15;
    
    for (let x = dotsStart; x < dotsEnd; x += 3) {
      doc.text('.', x, yPos);
    }

    yPos += 10;
  });
}