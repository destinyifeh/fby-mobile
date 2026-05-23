import React from 'react';
import { View, Text, Image } from 'react-native';

interface ScoreCardProps {
  name: string;
  score: number;
  iconUrl?: string;
}

export function ScoreCard({ name, score, iconUrl }: ScoreCardProps) {
  return (
    <View
      className="
        bg-v2-badge-pink
        border
        border-cream
        rounded-xl
        h-[59px]
        w-[168px]
        flex-row
        items-center
        px-2
      "
    >
      {iconUrl && (
        <View className="w-10 h-10 rounded-full overflow-hidden mr-2">
          <Image
            source={{ uri: iconUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      )}
      <View className="flex-1">
        <Text className="text-v2-bg-base font-inter-medium text-base text-center">
          {name}
        </Text>
        <Text className="text-v2-bg-base font-inter-semibold text-sm">
          {score}%
        </Text>
      </View>
    </View>
  );
}
