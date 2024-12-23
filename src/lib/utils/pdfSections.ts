import { jsPDF } from 'jspdf';
import { generateTitlePage } from './pdfTitlePage';
import { generateArticleSection } from './pdfArticleSection';
import { generateTableOfContents } from './pdfTableOfContents';

export {
  generateTitlePage,
  generateArticleSection,
  generateTableOfContents
};