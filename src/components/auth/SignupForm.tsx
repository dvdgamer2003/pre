import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle, User, Mail, Lock } from 'lucide-react';
import { FormInput } from './FormInput';

interface SignupFormProps {
  onClose: () => void;
}

export function SignupForm({ onClose }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create account';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <FormInput
        icon={<User className="w-5 h-5" />}
        type="text"
        id="name"
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        minLength={2}
        maxLength={50}
        placeholder="John Doe"
      />

      <FormInput
        icon={<Mail className="w-5 h-5" />}
        type="email"
        id="email"
        label="Email Address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
        placeholder="john@example.com"
      />

      <FormInput
        icon={<Lock className="w-5 h-5" />}
        type="password"
        id="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        minLength={6}
        placeholder="••••••••"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-serif"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}