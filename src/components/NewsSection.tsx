import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Article } from '@/types';
import type { PaginationType } from '@/types/pagination';

interface NewsSectionProps {
  title: string;
  articles: Article[];
  loading: boolean;
  error: string | null;
  onRefresh?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  paginationType?: PaginationType;
}

export function NewsSection({ 
  title, 
  articles, 
  loading, 
  error, 
  onRefresh,
  currentPage,
  totalPages,
  onPageChange,
  paginationType = 'pagination'
}: NewsSectionProps) {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold font-serif">{title}</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh news"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              ))}
            </div>
          ) : (
            articles.map((article, index) => (
              <article 
                key={article.id}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
              >
                <Link 
                  to={`/article/${article.id}`}
                  className="group block"
                >
                  <h3 className="text-lg font-serif font-bold mb-2 group-hover:text-primary">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-secondary">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
                    <span>•</span>
                    <span className="capitalize">{article.category}</span>
                  </div>
                  <p className="mt-2 text-secondary line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              </article>
            ))
          )}
        </div>
      )}
    </section>
  );
}