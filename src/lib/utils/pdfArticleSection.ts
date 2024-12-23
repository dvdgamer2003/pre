import { jsPDF } from 'jspdf';
import { PDF_STYLES } from './pdfStyles';
import { normalizeCategory, getCategoryDisplayName } from './pdfCategories';
import { addClickableLink } from './pdfHelpers';
import type { Article } from '@/types';

export async function generateArticleSection(
  doc: jsPDF, 
  category: string, 
  articles: Article[]
): Promise<void> {
  if (!articles?.length) return;

  try {
    const margin = PDF_STYLES.margin;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;

    // Category header
    const displayName = getCategoryDisplayName(normalizeCategory(category || 'general'));
    doc.setFont('times', 'bold');
    doc.setFontSize(PDF_STYLES.headingFontSize);
    doc.setTextColor(...PDF_STYLES.colors.primary);
    doc.text(displayName, margin, yPos);
    yPos += PDF_STYLES.spacing.after.heading;

    // Articles in newspaper style
    for (const article of articles) {
      if (!article?.title) continue;

      // Check page space and add new page if needed
      if (yPos > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPos = margin;
      }

      // Article headline
      doc.setFont('times', 'bold');
      doc.setFontSize(PDF_STYLES.subheadingFontSize);
      const titleLines = doc.splitTextToSize(article.title, contentWidth);
      doc.text(titleLines, margin, yPos);
      yPos += titleLines.length * 7;

      // Byline (source and date)
      doc.setFont('times', 'italic');
      doc.setFontSize(PDF_STYLES.smallFontSize);
      doc.setTextColor(...PDF_STYLES.colors.secondary);
      const byline = [
        article.source,
        new Date(article.publishedAt).toLocaleDateString()
      ].filter(Boolean).join(' • ');
      doc.text(byline, margin, yPos);
      yPos += 6;

      // Article content
      doc.setFont('times', 'normal');
      doc.setFontSize(PDF_STYLES.bodyFontSize);
      doc.setTextColor(...PDF_STYLES.colors.text);
      const contentLines = doc.splitTextToSize(article.description, contentWidth);
      doc.text(contentLines, margin, yPos);
      yPos += contentLines.length * 5;

      // Read more link
      if (article.url) {
        yPos += 4;
        doc.setFont('times', 'italic');
        doc.setFontSize(PDF_STYLES.smallFontSize);
        addClickableLink(
          doc,
          'Read full article online',
          article.url,
          margin,
          yPos,
          { color: PDF_STYLES.colors.link }
        );
      }

      // Separator between articles
      yPos += 12;
      if (articles.indexOf(article) !== articles.length - 1) {
        doc.setDrawColor(...PDF_STYLES.colors.secondary);
        doc.setLineWidth(0.2);
        doc.line(margin, yPos - 6, pageWidth - margin, yPos - 6);
        yPos += 6;
      }
    }
  } catch (error) {
    console.error(`Error in generateArticleSection for ${category}:`, error);
    throw error;
  }
}