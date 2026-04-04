import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DataPermisionsScreen() {
  const router = useRouter();
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const [allowImageStorage, setAllowImageStorage] = useState(true);

  const PermissionRow = ({
    title,
    value,
    onToggle,
    description,
  }: {
    title: string;
    value: boolean;
    onToggle: (v: boolean) => void;
    description: string;
  }) => (
    <View className="bg-cream-light rounded-3xl mb-4 p-8 shadow-sm border border-primary-brown/5">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="font-inter-bold text-xl text-primary-brown-light flex-1 pr-4">
          {title}
        </Text>
        <Switch
          trackColor={{ false: "#D1D1D1", true: "#8D5241" }}
          thumbColor={value ? "#FFF2DA" : "#f4f3f4"}
          onValueChange={onToggle}
          value={value}
        />
      </View>
      <Text className="font-inter text-lg text-primary-brown-light">
        {description}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-primary-brown">
            Data Permisions
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6 py-6"
          showsVerticalScrollIndicator={false}
        >
          <PermissionRow
            title="Anonymous Analytics"
            value={allowAnalytics}
            onToggle={setAllowAnalytics}
            description="Help us improve Face By You with anonymous usage data."
          />
          <PermissionRow
            title="Store Analysis Images"
            value={allowImageStorage}
            onToggle={setAllowImageStorage}
            description="Keep your past scans accessible in your look history."
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
