import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  const variantClasses = {
    default: 'bg-v2-bg-base',
    elevated: 'bg-v2-bg-base shadow-md',
    outlined: 'bg-transparent border border-accent-pink',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <View
      className={`
        rounded-[20px]
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${className || ''}
      `}
      {...props}
    >
      {children}
    </View>
  );
}
