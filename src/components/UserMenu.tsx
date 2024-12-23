import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserMenuProps {
  onShowPreferences: () => void;
}

export function UserMenu({ onShowPreferences }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) return null;

  // Get user's name from metadata, fallback to first part of email
  const displayName = user.user_metadata?.full_name || 
    user.email?.split('@')[0] || 
    'User';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <User className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium hidden md:block">
          {displayName}
        </span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50 animate-fade-in">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium truncate">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            <button
              onClick={() => {
                onShowPreferences();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </button>
            <button
              onClick={signOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}