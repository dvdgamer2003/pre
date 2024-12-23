// Helper functions for category handling
export function normalizeCategory(category: string): string {
  return category.toLowerCase().trim();
}

export function isValidCategory(category: string): boolean {
  return category && typeof category === 'string' && category.length > 0;
}

export function getCategoryDisplayName(category: string): string {
  // Capitalize first letter of each word
  return category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}