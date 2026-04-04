import React from 'react';
import { View, Text } from 'react-native';
import { ChatBubble } from './ChatBubble';
import { Avatar } from '../ui/Avatar';

const PREVIEW_MESSAGES = [
  {
    id: '1',
    message: "Hey girl I know your birthday is coming up, do you want to book an appointment?",
    isUser: false,
  },
  {
    id: '2',
    message: "Hey no I'm ok thanks for asking",
    isUser: true,
  },
  {
    id: '3',
    message: "Really? I always do your make up did you find a new MUA?",
    isUser: false,
  },
  {
    id: '4',
    message: "Actually I did, I'm sorry girl",
    isUser: true,
  },
];

export function ChatPreview() {
  return (
    <View className="w-[293px] h-[400px] bg-cream-light border-[5px] border-black rounded-[40px] overflow-hidden">
      {/* Phone notch */}
      <View className="w-full h-[40px] bg-black rounded-b-[20px]" />

      {/* Chat header */}
      <View className="bg-cream border-b border-black/10 px-4 py-2 flex-row items-center justify-center">
        <Avatar size="sm" showOnline name="MUA" />
        <Text className="ml-2 font-inter-semibold text-base text-black">MUA</Text>
      </View>

      {/* Chat messages */}
      <View className="flex-1 bg-cream-peach px-3 py-4">
        <View className="gap-4">
          {PREVIEW_MESSAGES.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.message}
              isUser={msg.isUser}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
