import type { Article } from '@/types';

class ArticleCache {
  private cache: Map<string, { article: Article; timestamp: number }>;
  private readonly TTL: number;

  constructor(ttl: number = 5 * 60 * 1000) {
    this.cache = new Map();
    this.TTL = ttl;
  }

  set(id: string, article: Article): void {
    this.cache.set(id, {
      article,
      timestamp: Date.now()
    });
  }

  get(id: string): Article | undefined {
    const cached = this.cache.get(id);
    if (!cached) return undefined;

    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(id);
      return undefined;
    }

    return cached.article;
  }

  getAll(): Article[] {
    const now = Date.now();
    const articles: Article[] = [];

    for (const [id, { article, timestamp }] of this.cache.entries()) {
      if (now - timestamp > this.TTL) {
        this.cache.delete(id);
        continue;
      }
      articles.push(article);
    }

    return articles;
  }

  clear(): void {
    this.cache.clear();
  }

  // New method to check if cache is stale
  isStale(): boolean {
    if (this.cache.size === 0) return true;
    
    const now = Date.now();
    for (const { timestamp } of this.cache.values()) {
      if (now - timestamp < this.TTL) {
        return false;
      }
    }
    return true;
  }
}

export const articleCache = new ArticleCache();