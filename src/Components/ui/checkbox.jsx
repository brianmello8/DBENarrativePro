import React from 'react';

export function Checkbox({ 
  id,
  checked,
  onCheckedChange,
  disabled = false,
  className = ''
}) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      disabled={disabled}
      className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:cursor-not-allowed ${className}`}
    />
  );
}