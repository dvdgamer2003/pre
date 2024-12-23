import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PDF_STYLES } from './pdfStyles';
import { generateTitlePage } from './pdfTitlePage';
import { generateTableOfContents } from './pdfTableOfContents';
import { generateArticleSection } from './pdfArticleSection';
import { isValidCategory, normalizeCategory } from './pdfCategories';
import type { Article } from '@/types';

export async function generateNewsPDF(articles: Article[]): Promise<jsPDF> {
  if (!articles?.length) {
    throw new Error('No articles provided for PDF generation');
  }

  const validArticles = articles.filter(article => 
    article?.url && 
    article?.title && 
    article?.description
  );

  if (!validArticles.length) {
    throw new Error('No valid articles available for PDF generation');
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  try {
    // Generate title page
    await generateTitlePage(doc);
    
    // Group articles by category
    const groupedArticles = validArticles.reduce((acc, article) => {
      const category = article.category && isValidCategory(article.category)
        ? normalizeCategory(article.category)
        : 'general';
        
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(article);
      return acc;
    }, {} as Record<string, Article[]>);

    // Generate table of contents
    doc.addPage();
    generateTableOfContents(doc, Object.keys(groupedArticles));

    // Generate article sections
    for (const [category, categoryArticles] of Object.entries(groupedArticles)) {
      if (!categoryArticles?.length) continue;
      
      try {
        doc.addPage();
        await generateArticleSection(doc, category, categoryArticles);
      } catch (sectionError) {
        console.error(`Error generating section for ${category}:`, sectionError);
      }
    }

    return doc;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate eNewspaper');
  }
}