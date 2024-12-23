import React from 'react';
import { Layout } from '@/components/Layout';
import { NewsBulletin } from '@/components/bulletin/NewsBulletin';
import { useNews } from '@/hooks/useNews';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export function NewsBulletinPage() {
  const { articles, loading } = useNews();

  return (
    <Layout onCategorySelect={() => {}} selectedCategory={undefined}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">News Bulletin</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <NewsBulletin articles={articles} />
        )}
      </div>
    </Layout>
  );
}