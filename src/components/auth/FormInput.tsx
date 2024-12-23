import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
}

export function FormInput({ icon, label, ...props }: FormInputProps) {
  return (
    <div className="group animate-slide-in" style={{ '--delay': `${props.id?.length}00ms` } as any}>
      <label htmlFor={props.id} className="block text-sm font-medium text-foreground mb-1.5 font-serif">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
          {icon}
        </div>
        <input
          {...props}
          className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 font-sans"
        />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-focus-within:w-full" />
      </div>
    </div>
  );
}