import React from 'react';
import { View, Text } from 'react-native';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <View
      className={`
        max-w-[85%]
        px-3
        py-3
        ${isUser
          ? 'bg-primary-brown self-end rounded-tl-[22px] rounded-tr-[22px] rounded-bl-[22px]'
          : 'bg-cream-dark self-start rounded-tr-[22px] rounded-br-[22px] rounded-bl-[22px]'
        }
      `}
      style={isUser ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
      } : undefined}
    >
      <Text
        className={`
          font-inter
          text-base
          ${isUser ? 'text-cream-dark' : 'text-primary-brown'}
        `}
      >
        {message}
      </Text>
    </View>
  );
}
