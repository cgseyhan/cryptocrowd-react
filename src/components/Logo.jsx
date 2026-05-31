import React from 'react';

/**
 * Image-based logo from public/assets.
 */
export default function Logo({ className = '' }) {
  return (
    <img 
      src="/assets/logo.png" 
      alt="CryptoCrowd Logo" 
      className={`h-8 md:h-10 lg:h-12 w-auto object-contain select-none ${className}`} 
    />
  );
}
