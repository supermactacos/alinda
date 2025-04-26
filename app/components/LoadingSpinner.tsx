import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'text-green-800'
}) => {
  // Size mapping
  const sizeMap = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="flex justify-center items-center">
      <div className={`${spinnerSize} ${color} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 