import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function InviteFriendScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-primary-brown">Invite a friend</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-8" showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
          {/* QR Code Container */}
          <View className="bg-primary-brown w-full aspect-square rounded-4xl items-center justify-center mt-10 shadow-lg p-10">
            <View className="bg-white w-full h-full rounded-2xl p-4 items-center justify-center">
              {/* Sample QR Image or Icon */}
              <Ionicons name="qr-code-outline" size={180} color="black" />
            </View>
          </View>

          {/* Invitation Text */}
          <View className="mt-12 items-center px-4">
            <Text className="font-abhaya-bold text-3xl text-primary-brown text-center leading-9">
              Invite friends to Face By You and help them become their own MUA.
            </Text>
            <Text className="font-inter text-primary-brown-light text-xl mt-6">
              Scan QR code to invite friends
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row w-full mt-12 gap-x-4 pb-10">
            <TouchableOpacity className="flex-1 bg-primary-brown h-24 rounded-3xl items-center justify-center shadow-md">
              <View className="flex-row items-center mb-1">
                <Ionicons name="arrow-redo-outline" size={28} color="white" />
              </View>
              <Text className="text-cream text-lg font-abhaya-bold">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-primary-brown h-24 rounded-3xl items-center justify-center shadow-md">
              <View className="flex-row items-center mb-1">
                <Ionicons name="link-outline" size={28} color="white" />
              </View>
              <Text className="text-cream text-lg font-abhaya-bold">Copy link</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
