import React from 'react';

export function Alert({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    info: 'bg-blue-50 border-blue-400 text-blue-700',
    success: 'bg-green-50 border-green-400 text-green-700',
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-700',
    error: 'bg-red-50 border-red-400 text-red-700',
  };

  return (
    <div className={`border-l-4 p-4 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = '' }) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}