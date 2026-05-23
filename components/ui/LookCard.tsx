import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface LookCardProps {
  name: string;
  image: string;
  onPress?: () => void;
}

export function LookCard({ name, image, onPress }: LookCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="
        bg-v2-purple-light
        rounded-xl
        w-[90px]
        h-[111px]
        overflow-hidden
      "
    >
      <View className="w-[80px] h-[79px] mx-auto mt-1.5 rounded-lg overflow-hidden">
        <Image
          source={{ uri: image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>
      <Text
        className="
          text-v2-text-muted
          font-inter-semibold
          text-base
          px-1.5
          mt-0.5
        "
        numberOfLines={1}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
