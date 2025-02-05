import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-full py-2 rounded bg-yellow-500 hover:bg-yellow-400 
        text-gray-900 font-bold transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;