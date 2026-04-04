import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function PersonalInfoScreen() {
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
          <Text className="font-abhaya-bold text-3xl text-primary-brown">Personal Info</Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Avatar Section */}
          <View className="items-center mt-6 mb-8">
            <View className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-brown">
              <Image source={require("@/assets/images/profile.png")} className="w-full h-full" resizeMode="cover" />
            </View>
            <TouchableOpacity className="mt-2">
              <Text className="font-inter-medium text-primary-brown text-lg">Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="gap-y-6">
            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">Username</Text>
              <View className="flex-row items-center bg-cream-dark h-16 rounded-3xl px-6 border border-primary-brown/10">
                <Text className="font-inter text-primary-brown-light text-base">Tina Joy</Text>
              </View>
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">Email</Text>
              <View className="flex-row items-center bg-cream-dark h-16 rounded-3xl px-6 border border-primary-brown/10">
                <Text className="font-inter text-primary-brown-light text-base">Tinajoy@gmail.com</Text>
              </View>
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">Date of birth</Text>
              <View className="flex-row items-center bg-cream-dark h-16 rounded-3xl px-6 border border-primary-brown/10">
                <Text className="font-inter text-primary-brown-light text-base">09/04/2004</Text>
              </View>
            </View>

            <View>
              <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">Nationality</Text>
              <View className="flex-row items-center bg-cream-dark h-16 rounded-3xl px-6 border border-primary-brown/10">
                <Text className="font-inter text-primary-brown-light text-base">Nigerian</Text>
              </View>
            </View>
          </View>

          {/* Update Button */}
          <TouchableOpacity className="bg-primary-brown h-16 rounded-3xl items-center justify-center mt-12 mb-8 shadow-sm">
            <Text className="text-cream text-xl font-abhaya-bold">Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
