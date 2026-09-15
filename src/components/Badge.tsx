import React from 'react';
import { CategoryId } from '../types';

interface BadgeProps {
  children: React.ReactNode;
  category?: CategoryId;
  variant?: 'solid' | 'subtle' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  category,
  variant = 'subtle',
  size = 'sm',
  icon,
  className = '',
}) => {
  // Grounded, natural food brand color palette
  let colorClass = 'bg-[#FAF6EE] text-[#415347] border-[#E5DFD4]';

  if (category === 'juices') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#B85331] text-white border-[#B85331]'
        : 'bg-[#FCF2ED] text-[#993E1F] border-[#F2D7CB]';
  } else if (category === 'nuts') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#C27E23] text-white border-[#C27E23]'
        : 'bg-[#FAF4E8] text-[#8C5812] border-[#EEDDBF]';
  } else if (category === 'olive-oil') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#4B6854] text-white border-[#4B6854]'
        : 'bg-[#EEF4F0] text-[#2F4E39] border-[#CADDCF]';
  } else if (category === 'sunflower-oil') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#D9962A] text-[#18261E] border-[#D9962A]'
        : 'bg-[#FDF7EB] text-[#825611] border-[#F3DFC1]';
  } else if (category === 'seaweed') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#1E4334] text-white border-[#1E4334]'
        : 'bg-[#EAF2ED] text-[#18392C] border-[#BFD6C8]';
  } else if (category === 'water') {
    colorClass =
      variant === 'solid'
        ? 'bg-[#2A5C75] text-white border-[#2A5C75]'
        : 'bg-[#EEF5F8] text-[#1C465D] border-[#C3DAE5]';
  }

  const sizeClass =
    size === 'sm'
      ? 'text-[10px] sm:text-[11px] px-2.5 py-0.5 font-semibold tracking-wider uppercase'
      : 'text-xs px-3.5 py-1 font-semibold tracking-wider uppercase';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs ${colorClass} ${sizeClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
