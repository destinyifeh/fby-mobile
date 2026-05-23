import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'flex-row items-center justify-center rounded-[44px]';

  const variantClasses = {
    primary: 'bg-v2-purple',
    secondary: 'bg-v2-purple-subtle',
    outline: 'border-2 border-v2-purple bg-transparent',
  };

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4 h-[50px]',
  };

  const textVariantClasses = {
    primary: 'text-v2-bg-base',
    secondary: 'text-v2-text-body',
    outline: 'text-v2-purple',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <TouchableOpacity
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-60' : ''}
        shadow-md
        ${className || ''}
      `}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#f4f0e8' : '#b891f7'}
          size="small"
        />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon}
          <Text
            className={`
              font-inter-semibold
              ${textVariantClasses[variant]}
              ${textSizeClasses[size]}
            `}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
