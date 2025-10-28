import React from 'react';

export function Textarea({ 
  id,
  value,
  onChange,
  placeholder = '',
  rows = 4,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}