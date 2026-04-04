import React from 'react';
import { View, Image, Text } from 'react-native';

interface AvatarProps {
  source?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnline?: boolean;
}

export function Avatar({
  source,
  name,
  size = 'md',
  showOnline = false,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-[50px] h-[50px]',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const onlineDotSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View className="relative">
      <View
        className={`
          ${sizeClasses[size]}
          rounded-full
          bg-primary-brown
          items-center
          justify-center
          overflow-hidden
        `}
      >
        {source ? (
          <Image
            source={{ uri: source }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text
            className={`
              text-cream
              font-inter-semibold
              ${textSizeClasses[size]}
            `}
          >
            {name ? getInitials(name) : 'U'}
          </Text>
        )}
      </View>
      {showOnline && (
        <View
          className={`
            absolute
            bottom-0
            right-0
            ${onlineDotSizes[size]}
            bg-green-500
            rounded-full
            border-2
            border-cream
          `}
        />
      )}
    </View>
  );
}
