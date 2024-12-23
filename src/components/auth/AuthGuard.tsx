import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from './AuthModal';
import { LoadingSpinner } from '../LoadingSpinner';
import { AuthBackground } from './AuthBackground';
import { NewsPreview } from './NewsPreview';
import { Newspaper } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowAuth(true);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden font-serif">
        <AuthBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
          {/* Masthead */}
          <div className="text-center mb-16">
            <div className="inline-block border-x-4 border-primary px-8 py-4 mb-4">
              <div className="flex items-center justify-center gap-4">
                <Newspaper className="w-12 h-12 text-primary" />
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">SAMACHAR</h1>
              </div>
              <p className="text-lg text-secondary mt-2 font-sans italic">
                The Digital Times of India
              </p>
            </div>
            <div className="flex justify-center gap-4 text-sm text-secondary font-sans">
              <span>Est. 2024</span>
              <span>|</span>
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>

          <NewsPreview />

          {/* Auth Card */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center font-serif">
                Premium Access Required
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto mb-6" />
              <p className="text-secondary text-center mb-8 font-sans">
                Subscribe to access exclusive content, breaking news alerts, and personalized news recommendations.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 font-sans"
                >
                  Sign in to Continue Reading
                </button>
              </div>
            </div>
          </div>
        </div>

        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    );
  }

  return <>{children}</>;
}