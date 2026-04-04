import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function PrivacyDataScreen() {
  const router = useRouter();

  const MenuItem = ({ icon, title, isDanger = false, onPress }: { icon: keyof typeof Ionicons.glyphMap, title: string, isDanger?: boolean, onPress: () => void }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center bg-cream h-20 rounded-3xl mb-4 px-4 shadow-sm border border-primary-brown/5"
    >
      <View className={`w-12 h-12 rounded-2xl items-center justify-center ${isDanger ? 'bg-red-500' : 'bg-primary-brown'}`}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text className={`flex-1 ml-4 font-inter text-xl ${isDanger ? 'text-red-500' : 'text-primary-brown-light'}`}>{title}</Text>
      {!isDanger && <Ionicons name="chevron-forward" size={24} color="#8D5241" />}
    </TouchableOpacity>
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
          <Text className="font-abhaya-bold text-3xl text-primary-brown">Privacy & Data</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Account Privacy Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-2xl text-primary-brown mb-6">Account Privacy</Text>
            <MenuItem icon="person-outline" title="Privacy Settings" onPress={() => router.push("/privacy-settings")} />
            <MenuItem icon="shield-checkmark-outline" title="Data Permisions" onPress={() => router.push("/data-permisions")} />
          </View>

          {/* Legal Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-2xl text-primary-brown mb-6">Legal</Text>
            <MenuItem icon="person-outline" title="Term of use" onPress={() => router.push("/terms-of-use")} />
            <MenuItem icon="shield-checkmark-outline" title="Privacy Policy" onPress={() => router.push("/privacy-policy")} />
            <MenuItem icon="log-out-outline" title="Log out" isDanger={true} onPress={() => router.replace("/auth")} />
          </View>

          {/* Logo Section */}
          <View className="items-center mt-12">
            <Image source={require("@/assets/images/fby-logo.png")} className="w-48 h-12" resizeMode="contain" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
