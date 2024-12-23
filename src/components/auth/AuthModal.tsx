import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot-password';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<AuthView>('login');

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => setView('login'), 300);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl w-full max-w-md relative animate-slide-in">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-serif mb-2">
                {view === 'login' && 'Welcome Back'}
                {view === 'signup' && 'Join Samachar'}
                {view === 'forgot-password' && 'Reset Password'}
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto" />
            </div>

            {view === 'login' && (
              <LoginForm 
                onClose={handleClose} 
                onForgotPassword={() => setView('forgot-password')} 
              />
            )}
            {view === 'signup' && <SignupForm onClose={handleClose} />}
            {view === 'forgot-password' && (
              <ForgotPasswordForm onBack={() => setView('login')} />
            )}

            {view !== 'forgot-password' && (
              <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400 font-sans">
                {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                  className="text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  {view === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}