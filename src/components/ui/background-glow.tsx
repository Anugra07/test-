
import React from 'react';

interface BackgroundGlowProps {
  children: React.ReactNode;
  className?: string;
}

const BackgroundGlow = ({ children, className = '' }: BackgroundGlowProps) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-700 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-300"></div>
      {children}
    </div>
  );
};

export default BackgroundGlow;
