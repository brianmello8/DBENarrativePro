import React from 'react';

export function RadioGroup({ value, onValueChange, children, className = '' }) {
  // Function to recursively find and clone RadioGroupItem components
  const processChildren = (children) => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // If it's a RadioGroupItem, clone it with the props
      if (child.type === RadioGroupItem) {
        return React.cloneElement(child, { 
          selectedValue: value,
          onValueChange 
        });
      }

      // If it has children, recursively process them
      if (child.props && child.props.children) {
        return React.cloneElement(child, {
          children: processChildren(child.props.children)
        });
      }

      return child;
    });
  };

  return (
    <div className={className}>
      {processChildren(children)}
    </div>
  );
}

export function RadioGroupItem({ 
  id, 
  value, 
  selectedValue,
  onValueChange,
  disabled = false 
}) {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={selectedValue === value}
      onChange={(e) => onValueChange?.(e.target.value)}
      disabled={disabled}
      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed cursor-pointer"
    />
  );
}