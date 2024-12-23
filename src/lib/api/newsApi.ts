import { NEWS_API_KEY, NEWS_API_BASE_URL } from '@/config/constants';
import type { Article, Category } from '@/types';
import type { RegionCode } from '@/types/regions';
import type { NewsApiResponse } from './types';
import { transformArticle } from './transformers';
import { articleCache } from './cache';

const CORS_PROXY = import.meta.env.DEV 
  ? 'https://api.allorigins.win/raw?url=' 
  : '';

export async function fetchTopNews(
  category?: Category,
  region: RegionCode = 'us',
  page: number = 1,
  pageSize: number = 24
): Promise<Article[]> {
  try {
    // Check cache for first page only
    if (page === 1 && !articleCache.isStale()) {
      const cachedArticles = articleCache.getAll();
      if (cachedArticles.length > 0) {
        const filtered = category
          ? cachedArticles.filter(article => article.category === category)
          : cachedArticles;
        if (filtered.length > 0) {
          return filtered;
        }
      }
    }

    const params = new URLSearchParams({
      apiKey: NEWS_API_KEY,
      country: region.toLowerCase(),
      page: page.toString(),
      pageSize: pageSize.toString(),
      language: 'en',
      ...(category && { category }),
    });

    const apiUrl = `${NEWS_API_BASE_URL}/top-headlines?${params}`;
    const url = CORS_PROXY ? `${CORS_PROXY}${encodeURIComponent(apiUrl)}` : apiUrl;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Samachar News App',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }

    const data: NewsApiResponse = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch news');
    }

    const articles = data.articles
      .filter(article => 
        article.urlToImage && 
        article.description && 
        article.title && 
        article.url
      )
      .map(article => {
        const transformed = transformArticle(article, category);
        if (page === 1) {
          articleCache.set(transformed.id, transformed);
        }
        return transformed;
      });

    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}