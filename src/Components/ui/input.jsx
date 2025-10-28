import React from 'react';

export function Input({ 
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}