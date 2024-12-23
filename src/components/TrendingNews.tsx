import React from 'react';
import { TrendingUp } from 'lucide-react';
import { NewsCard } from './NewsCard';
import { useNews } from '@/hooks/useNews';

export function TrendingNews() {
  const { articles, loading } = useNews();
  
  if (loading || !articles.length) return null;

  const trendingArticles = articles.slice(0, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp className="w-8 h-8 text-primary animate-pulse" />
        <div>
          <h2 className="text-3xl font-serif font-bold">Trending Now</h2>
          <div className="h-1 w-12 bg-primary mt-2 transform origin-left transition-all duration-500 hover:w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendingArticles.map((article, index) => (
          <div 
            key={article.id}
            className="opacity-0 animate-slide-in"
            style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
          >
            <NewsCard article={article} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}