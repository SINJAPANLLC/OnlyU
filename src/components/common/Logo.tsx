import React from 'react';

type LogoProps = {
  className?: string;
  variant?: 'full' | 'mark';
  imageUrl?: string; // optional external logo asset (e.g., /onlyu-logo.png)
};

const Logo: React.FC<LogoProps> = ({ className, variant = 'full', imageUrl }) => {
  if (imageUrl) {
    // Render raster/vector image if provided, fall back to SVG mark on error
    return (
      <img
        src={imageUrl}
        alt="OnlyU"
        className={className}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="OnlyU"
    >
      {variant === 'full' && (
        <>
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <rect rx="12" ry="12" width="48" height="48" fill="url(#g)" />
        </>
      )}
      <path
        d="M14 24c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c-2.652 0-5.067-1.03-6.871-2.813l2.828-2.828A6.999 6.999 0 0 0 24 31a7 7 0 1 0-7-7h-3z"
        fill="#fff"
      />
    </svg>
  );
};

export default Logo;


