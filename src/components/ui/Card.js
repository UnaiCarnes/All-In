import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 p-8 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;