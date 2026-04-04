import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScanScreen() {
  const router = useRouter();

  const handleScoreYourLook = () => {
    router.push("/take-picture");
  };

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-6 py-4">
          <Text className="font-abhaya-bold text-3xl text-primary-brown text-center">
            Scan & score
          </Text>
        </View>

        <View className="flex-1 items-center justify-center -mt-20">
          {/* Viewfinder Container */}
          <View className="w-[300px] h-[300px] relative items-center justify-center">
            {/* Viewfinder Corners */}
            <View className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary-brown/40 rounded-tl-lg" />
            <View className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-primary-brown/40 rounded-tr-lg" />
            <View className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary-brown/40 rounded-bl-lg" />
            <View className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary-brown/40 rounded-br-lg" />

            {/* Score your look Button */}
            <TouchableOpacity
              onPress={handleScoreYourLook}
              className="bg-primary-brown h-16 px-8 rounded-full flex-row items-center justify-center absolute bottom-12 shadow-lg"
            >
              <Ionicons name="camera-outline" size={24} color="#FFF2DA" />
              <Text className="text-cream text-xl font-abhaya-bold ml-3 pt-1">
                Score your look
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
