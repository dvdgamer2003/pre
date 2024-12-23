import React, { useState } from 'react';
import { Download, Loader2, Newspaper } from 'lucide-react';
import { generateNewsPDF } from '@/lib/utils/pdfGenerator';
import { toast } from 'react-hot-toast';
import type { Article } from '@/types';

interface NewspaperDownloadProps {
  articles: Article[];
}

export function NewspaperDownload({ articles }: NewspaperDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading || !articles?.length) return;
    
    const toastId = 'pdf-generation';
    
    try {
      setLoading(true);
      toast.loading('Preparing your eNewspaper...', { id: toastId });
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const doc = await generateNewsPDF(articles);
      
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `samachar-enewspaper-${timestamp}.pdf`;
      
      try {
        doc.save(filename);
        toast.success('Your eNewspaper is ready!', { id: toastId });
      } catch (saveError) {
        console.error('Error saving PDF:', saveError);
        toast.error('Failed to download eNewspaper. Please try again.', { id: toastId });
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Unable to generate eNewspaper. Please try again later.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading || !articles?.length}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      title="Download eNewspaper"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden md:inline">Generating...</span>
        </>
      ) : (
        <>
          <Newspaper className="w-4 h-4" />
          <span className="hidden md:inline">Download eNewspaper</span>
          <span className="md:hidden">PDF</span>
        </>
      )}
    </button>
  );
}