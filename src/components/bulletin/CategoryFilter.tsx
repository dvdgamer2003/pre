import React from 'react';
import { CATEGORIES, CategoryLabels } from '@/types/categories';
import type { Category } from '@/types';

interface CategoryFilterProps {
  selectedCategory: Category | undefined;
  onCategoryChange: (category: Category | undefined) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <select
      value={selectedCategory || ''}
      onChange={(e) => onCategoryChange(e.target.value as Category || undefined)}
      className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-primary"
    >
      <option value="">All Categories</option>
      {CATEGORIES.map(category => (
        <option key={category} value={category}>
          {CategoryLabels[category]}
        </option>
      ))}
    </select>
  );
}