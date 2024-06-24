// components/buttons/BaseButton.tsx
import React from 'react';
import clsx from 'clsx';

export interface BaseButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  customFontClass?: string;
  customStyles?: string;
  gradientStyle?: 'horizontal' | 'vertical';
  onClick?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  before = null,
  after = null,
  className = '',
  style = {},
  customFontClass = '',
  customStyles = '',
  gradientStyle = 'horizontal',
  onClick = () => {},
}) => {
  const baseClasses = 'font-header flex items-center justify-center text-white italic h-fit transition-opacity duration-20 hover:opacity-70';
  let variantClasses = '';
  let sizeClasses = '';
  let disabledClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = gradientStyle === 'horizontal' ? 'bg-gradient-h-fire' : 'bg-gradient-v-fire';
      break;
    case 'secondary':
      variantClasses = 'bg-transparent border border-white';
      break;
    default:
      variantClasses = '';
  }

  switch (size) {
    case 'small':
      sizeClasses = 'text-md py-2 px-5';
      break;
    case 'medium':
      sizeClasses = 'text-xl py-2 px-5';
      break;
    case 'large':
      sizeClasses = 'text-2xl py-2 px-6';
      break;
    default:
      sizeClasses = '';
  }

  if (disabled) {
    disabledClasses = 'opacity-40 cursor-not-allowed shadow-disabled';
  }

  return (
    <button
      className={clsx(baseClasses, variantClasses, sizeClasses, disabledClasses, customFontClass, customStyles, className, 'font-bold')}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {before && <span className="mr-2 flex items-center -translate-y-0.5" style={{ fontSize: 'inherit' }}>{before}</span>}
      <span className="flex items-center uppercase">{children}</span>
      {after && <span className="ml-2 flex items-center -translate-y-0.5" style={{ fontSize: 'inherit' }}>{after}</span>}
    </button>
  );
};

export default BaseButton;
