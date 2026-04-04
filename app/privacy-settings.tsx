import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacySettingsScreen() {
  const router = useRouter();
  const [isFaceDetectionOn, setIsFaceDetectionOn] = useState(true);
  const [allowPersonalization, setAllowPersonalization] = useState(true);

  const SettingRow = ({ title, value, onToggle }: { title: string; value: boolean; onToggle: (v: boolean) => void }) => (
    <View className="flex-row items-center justify-between bg-cream h-20 rounded-3xl mb-4 px-8 shadow-sm border border-primary-brown/5">
      <Text className="font-inter-medium text-primary-brown text-xl flex-1 pr-4">{title}</Text>
      <Switch
        trackColor={{ false: "#D1D1D1", true: "#8D5241" }}
        thumbColor={value ? "#FFF2DA" : "#f4f3f4"}
        onValueChange={onToggle}
        value={value}
      />
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
          <Text className="font-abhaya-bold text-3xl text-primary-brown">Privacy Settings</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
          <SettingRow title="Automatic Face Detection" value={isFaceDetectionOn} onToggle={setIsFaceDetectionOn} />
          <SettingRow title="Personalized Recommendations" value={allowPersonalization} onToggle={setAllowPersonalization} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
