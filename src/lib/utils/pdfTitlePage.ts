import { jsPDF } from 'jspdf';
import { PDF_STYLES } from './pdfStyles';
import { formatDate } from './pdfHelpers';

export async function generateTitlePage(doc: jsPDF): Promise<void> {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = PDF_STYLES.margin;
  let yPos = margin * 2;

  // Masthead
  doc.setFont('times', 'bold');
  doc.setFontSize(PDF_STYLES.titleFontSize);
  doc.setTextColor(...PDF_STYLES.colors.primary);
  doc.text('SAMACHAR', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Subtitle
  doc.setFont('times', 'italic');
  doc.setFontSize(PDF_STYLES.smallFontSize);
  doc.text('The Digital Times of India', pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Date line
  doc.setFont('times', 'bold');
  doc.setFontSize(PDF_STYLES.subheadingFontSize);
  doc.text(formatDate(), pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Decorative lines
  doc.setDrawColor(...PDF_STYLES.colors.primary);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  doc.line(margin, yPos + 3, pageWidth - margin, yPos + 3);

  // Edition info
  yPos += 20;
  doc.setFont('times', 'normal');
  doc.setFontSize(PDF_STYLES.bodyFontSize);
  doc.text('DIGITAL EDITION', pageWidth / 2, yPos, { align: 'center' });
}