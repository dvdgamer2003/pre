import { useState, useEffect, useCallback } from 'react';
import { fetchTopNews } from '@/lib/api/newsApi';
import { newsHistoryCache } from '@/lib/api/newsCache';
import { usePreferences } from './usePreferences';
import { toast } from 'react-hot-toast';
import type { Article, Category } from '@/types';

const ARTICLES_PER_PAGE = 24;
const MAX_PAGES = 5;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useNews(category?: Category) {
  const { preferences } = usePreferences();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(MAX_PAGES);

  const fetchNews = useCallback(async (pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const region = preferences?.region || 'us';
      const data = await fetchTopNews(category, region, pageNum, ARTICLES_PER_PAGE);
      
      if (data.length > 0) {
        setArticles(data);
        if (pageNum === 1) {
          newsHistoryCache.add(category, data);
        }
        setLastRefresh(new Date());
      } else {
        setError('No articles found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      toast.error('Failed to refresh news');
    } finally {
      setLoading(false);
    }
  }, [category, preferences?.region]);

  // Initial fetch and category change handler
  useEffect(() => {
    let mounted = true;
    
    const loadNews = async () => {
      if (!mounted) return;
      setCurrentPage(1);
      await fetchNews(1);
    };

    loadNews();

    // Set up refresh interval
    const intervalId = setInterval(loadNews, REFRESH_INTERVAL);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [fetchNews, category]); // Added category as dependency

  const handlePageChange = useCallback(async (page: number) => {
    setCurrentPage(page);
    await fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [fetchNews]);

  const refreshNews = useCallback(async () => {
    const timeSinceLastRefresh = Date.now() - lastRefresh.getTime();
    if (timeSinceLastRefresh < 30000) {
      toast.error('Please wait before refreshing again');
      return;
    }

    setCurrentPage(1);
    await fetchNews(1);
    toast.success('News refreshed successfully');
  }, [fetchNews, lastRefresh]);

  return { 
    articles, 
    loading, 
    error,
    refreshNews,
    lastRefresh,
    currentPage,
    totalPages,
    onPageChange: handlePageChange
  };
}