import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { ArticleActions } from './article/ArticleActions';
import type { Article } from '@/types';

interface NewsCardProps {
  article: Article;
  index?: number;
  isBookmarked?: boolean;
  onBookmark?: () => void;
}

export function NewsCard({ article, index = 0, isBookmarked, onBookmark }: NewsCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/article/${article.id}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
      style={{
        '--delay': `${index * 100}ms`,
      } as React.CSSProperties}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 ${imageLoaded ? 'opacity-0' : 'animate-pulse'}`} />
        <img
          src={article.imageUrl}
          alt={article.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <ArticleActions
            title={article.title}
            isBookmarked={isBookmarked}
            onBookmark={onBookmark}
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {article.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-xl font-serif font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-primary font-medium">{article.source}</span>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            {new Date(article.publishedAt).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}