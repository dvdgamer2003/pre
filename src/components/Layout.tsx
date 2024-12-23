import React, { useState, useEffect } from 'react';
import { Menu, Moon, Sun, Search, RefreshCw } from 'lucide-react';
import { AuthModal } from './auth/AuthModal';
import { UserMenu } from './UserMenu';
import { UserPreferences } from './UserPreferences';
import { SearchBar } from './SearchBar';
import { CategoryNav } from './CategoryNav';
import { Footer } from './Footer';
import { useAuth } from '@/hooks/useAuth';
import { usePreferences } from '@/hooks/usePreferences';
import { useNews } from '@/hooks/useNews';
import type { Category } from '@/types/categories';

interface LayoutProps {
  children: React.ReactNode;
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category | undefined;
}

export function Layout({ children, onCategorySelect, selectedCategory }: LayoutProps) {
  const { user } = useAuth();
  const { preferences } = usePreferences();
  const { articles, refreshNews, loading } = useNews();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-background`}>
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6 text-primary" />
              </button>
              
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold bg-primary text-white px-3 py-1 rounded">S</span>
                <span className="text-xl font-serif font-bold text-primary hidden md:block">SAMACHAR</span>
              </a>
            </div>

            {/* Center section - Search */}
            <div className="hidden md:block flex-1 max-w-xl">
              <SearchBar articles={articles} />
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              <button
                onClick={refreshNews}
                disabled={loading}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Refresh news"
              >
                <RefreshCw className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : ''}`} />
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </button>

              {user ? (
                <UserMenu onShowPreferences={() => setIsPreferencesOpen(true)} />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>

          {/* Mobile search */}
          {isSearchVisible && (
            <div className="mt-3 pb-2 md:hidden">
              <SearchBar articles={articles} />
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-[280px] h-screen pt-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
      >
        <div className="h-full px-4 pb-4 overflow-y-auto">
          <CategoryNav
            onSelect={(category) => {
              onCategorySelect(category);
              setIsSidebarOpen(false);
            }}
            selectedCategory={selectedCategory}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-[280px] transition-[margin] duration-300">
        <div className="container mx-auto px-4 py-20 md:py-24 max-w-7xl">
          {children}
        </div>
        <Footer />
      </main>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <UserPreferences isOpen={isPreferencesOpen} onClose={() => setIsPreferencesOpen(false)} />
    </div>
  );
}