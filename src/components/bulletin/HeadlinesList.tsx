import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import type { Article } from '@/types';

interface HeadlinesListProps {
  articles: Article[];
}

export function HeadlinesList({ articles }: HeadlinesListProps) {
  const { speak, stop, speaking: isSpeaking } = useSpeech();
  const [activeHeadline, setActiveHeadline] = React.useState<string | null>(null);

  const handleSpeak = (headline: string) => {
    if (activeHeadline === headline && isSpeaking) {
      stop();
      setActiveHeadline(null);
    } else {
      speak(headline);
      setActiveHeadline(headline);
    }
  };

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
        >
          <p className="flex-1 font-medium">{article.title}</p>
          <button
            onClick={() => handleSpeak(article.title)}
            className="p-2 text-gray-500 hover:text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title={activeHeadline === article.title && isSpeaking ? 'Stop speaking' : 'Listen to headline'}
          >
            {activeHeadline === article.title && isSpeaking ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}