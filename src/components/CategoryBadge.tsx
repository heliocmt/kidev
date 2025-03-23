
import React from 'react';

interface CategoryBadgeProps {
  title: string;
  color: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ title, color }) => {
  return (
    <div className={`${color} font-medium py-2 px-4 rounded-full transition-transform hover:scale-105 cursor-pointer`}>
      {title}
    </div>
  );
};
