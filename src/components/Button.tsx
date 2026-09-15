import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Requirement 40: Button System
  // Primary: Deep green background, Cream/white text
  // Secondary: Cream/transparent background, Green border, Green text
  // Accent: Warm orange or mustard yellow
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#243B2E] text-[#FFFDF9] hover:bg-[#182C20] active:bg-[#122319] shadow-xs hover:shadow-md border border-[#243B2E]',
    secondary:
      'bg-transparent hover:bg-[#FAF6F0] text-[#243B2E] border-2 border-[#243B2E] shadow-2xs',
    accent:
      'bg-[#C8572D] text-white hover:bg-[#B34A23] active:bg-[#993E1B] shadow-xs hover:shadow-md border border-[#C8572D]',
    outline:
      'bg-transparent border border-[#D5CFBF] text-[#243B2E] hover:bg-[#FAF6F0]',
    ghost:
      'bg-transparent text-[#243B2E] hover:bg-[#FAF6F0] hover:text-[#182C20]',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider gap-1.5 min-h-[36px]',
    md: 'text-xs sm:text-sm px-6 py-3 rounded-full font-bold uppercase tracking-wider gap-2 min-h-[44px]',
    lg: 'text-sm sm:text-base px-8 py-3.5 rounded-full font-bold uppercase tracking-wider gap-2.5 min-h-[48px]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-hidden ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
