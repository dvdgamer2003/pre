import React, { useState, useEffect } from 'react';
import { Radio, Volume2, Pause } from 'lucide-react';
import { SpeedControl } from './SpeedControl';
import { RegionVoiceSelector } from './RegionVoiceSelector';
import { CategoryFilter } from './CategoryFilter';
import { HeadlinesList } from './HeadlinesList';
import { useNewsBulletin } from '@/hooks/useNewsBulletin';
import { usePreferences } from '@/hooks/usePreferences';
import { useNews } from '@/hooks/useNews';
import type { Article, Category } from '@/types';
import type { RegionCode } from '@/types/regions';

interface NewsBulletinProps {
  articles: Article[];
}

export function NewsBulletin({ articles }: NewsBulletinProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const { preferences, updatePreferences } = usePreferences();
  const { articles: categoryArticles } = useNews(selectedCategory);
  const { 
    speaking,
    speed,
    setSpeed,
    playHeadlines,
    stopBulletin,
    updateVoiceForRegion
  } = useNewsBulletin();

  // Use category-specific articles when a category is selected
  const displayedArticles = selectedCategory ? categoryArticles : articles;

  const handleRegionChange = async (region: RegionCode) => {
    if (!preferences) return;
    await updatePreferences({ ...preferences, region });
    updateVoiceForRegion(region);
  };

  const handlePlayAll = () => {
    const headlines = displayedArticles.map(article => article.title);
    const intro = selectedCategory 
      ? `Top headlines in ${selectedCategory}:`
      : 'Top headlines:';
    playHeadlines([intro, ...headlines]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">News Bulletin</h2>
        </div>
        <div className="flex items-center gap-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <RegionVoiceSelector
            selectedRegion={preferences?.region as RegionCode || 'us'}
            onRegionChange={handleRegionChange}
          />
          <SpeedControl speed={speed} onSpeedChange={setSpeed} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">
            {selectedCategory ? `${selectedCategory} Headlines` : 'Latest Headlines'}
          </h3>
          <button
            onClick={speaking ? stopBulletin : handlePlayAll}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            {speaking ? (
              <>
                <Pause className="w-5 h-5" />
                Stop Reading
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                Read All Headlines
              </>
            )}
          </button>
        </div>

        <HeadlinesList articles={displayedArticles} />
      </div>
    </div>
  );
}