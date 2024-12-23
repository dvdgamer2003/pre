import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, Mail, Lock } from 'lucide-react';
import { FormInput } from './FormInput';

interface LoginFormProps {
  onClose: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onClose, onForgotPassword }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      onClose();
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 animate-shake">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <FormInput
        icon={<Mail className="w-5 h-5" />}
        type="email"
        id="email"
        label="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <FormInput
        icon={<Lock className="w-5 h-5" />}
        type="password"
        id="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-dark transition-colors font-sans"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-serif"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}