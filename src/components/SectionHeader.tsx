import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  description,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`space-y-3 ${
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left max-w-2xl'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF3ED] text-[#243B2E] text-xs font-semibold border border-[#243B2E]/20 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {badgeIcon}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1E2721] tracking-tight leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-[#4E5C52] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
