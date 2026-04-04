import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "@/components/ui/Avatar";

interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

function ProfileMenuItem({ icon, title, onPress }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-cream h-20 rounded-3xl mb-4 px-4 shadow-sm border border-primary-brown/5"
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 rounded-2xl bg-primary-brown items-center justify-center">
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text className="flex-1 ml-4 font-inter text-xl text-primary-brown-light">
        {title}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="#A67B5B" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const userName = "Tina Joy";
  const userEmail = "tinajoy@gmail.com";
  const makeupScore = 64;

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-primary-brown">Profile</Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header Section */}
          <View className="items-center mt-4 mb-8 px-6">
            <Avatar 
              size="xxl" 
              source={require("@/assets/images/profile.png")} 
              showEdit={true}
              onEdit={() => console.log("Edit avatar")}
            />
            <Text className="font-abhaya-bold text-4xl text-primary-brown mt-4">
              {userName}
            </Text>
            <Text className="font-inter text-lg text-primary-brown-light mt-1">
              {userEmail}
            </Text>

            {/* Score Badge */}
            <View className="mt-4 bg-accent-tan-light rounded-full px-6 py-2 border border-primary-brown/10">
              <Text className="font-inter-medium text-lg text-primary-brown">
                Avg Make up score:{makeupScore}%
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="px-6">
            <ProfileMenuItem
              icon="person-outline"
              title="Personal Info"
              onPress={() => router.push("/personal-info")}
            />
            <ProfileMenuItem
              icon="shield-checkmark-outline"
              title="Privacy & Data"
              onPress={() => router.push("/privacy-data")}
            />
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => router.push("/help-support")}
            />
            <ProfileMenuItem
              icon="people-outline"
              title="Invite a friend"
              onPress={() => router.push("/invite-friend")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
