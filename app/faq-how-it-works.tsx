import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function HowItWorksScreen() {
  const router = useRouter();

  const HowItem = ({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) => (
    <View className="flex-row items-center mb-8 px-2">
      <View className="w-12 h-12 rounded-2xl bg-primary-brown items-center justify-center mr-5 shadow-sm">
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text className="flex-1 font-inter-semibold text-xl text-primary-brown leading-7">
        {text}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-primary-brown">How it works</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-8 py-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          <View className="mt-4">
            <HowItem icon="camera-outline" text="Scan your makeup instantly" />
            <HowItem icon="stats-chart-outline" text="Get an AI-generated score for your makeup" />
            <HowItem icon="bulb-outline" text="Discover insights tailored to your look" />
            <HowItem icon="time-outline" text="Track your past scans" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
