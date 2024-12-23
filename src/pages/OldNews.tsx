import React from 'react';
import { Layout } from '@/components/Layout';
import { NewsCard } from '@/components/NewsCard';
import { useNewsHistory } from '@/hooks/useNewsHistory';
import { History, Calendar } from 'lucide-react';
import type { Category } from '@/types/categories';

export function OldNews() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const { history, loading, lastUpdate } = useNewsHistory(selectedCategory);

  return (
    <Layout onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <History className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold">News Archive</h1>
              <div className="flex items-center gap-2 mt-2 text-secondary">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  Last updated: {new Date(lastUpdate).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        {/* News Grid */}
        <div className="space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {history.map((article, index) => (
                <div
                  key={article.id}
                  className="opacity-0 animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <NewsCard article={article} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm">
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Archived News</h3>
              <p className="text-secondary">
                {selectedCategory 
                  ? `No archived news found for ${selectedCategory}`
                  : 'Start browsing news to build your archive'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}