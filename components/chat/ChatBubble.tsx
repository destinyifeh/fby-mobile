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
        px-4
        py-2
        ${isUser
          ? 'self-end rounded-[20px] rounded-tr-none'
          : 'self-start rounded-[20px] rounded-tl-none'
        }
      `}
      style={{
        backgroundColor: isUser ? '#007aff' : '#e9e9eb',
      }}
    >
      <Text
        className="font-inter text-[15px] leading-tight"
        style={{
          color: isUser ? '#FFFFFF' : '#000000',
        }}
      >
        {message}
      </Text>
    </View>
  );
}
