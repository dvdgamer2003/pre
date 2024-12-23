import React from 'react';
import { Bookmark } from 'lucide-react';
import { SpeakButton } from '../SpeakButton';

interface ArticleActionsProps {
  isBookmarked?: boolean;
  onBookmark?: () => void;
  title: string;
}

export function ArticleActions({ isBookmarked, onBookmark, title }: ArticleActionsProps) {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent event bubbling
    onBookmark?.();
  };

  return (
    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
      <SpeakButton text={title} />
      {onBookmark && (
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-full backdrop-blur-md ${
            isBookmarked
              ? 'bg-primary/90 text-white'
              : 'bg-white/90 text-gray-600 hover:bg-gray-100/90'
          } transition-colors`}
          title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          <Bookmark className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}