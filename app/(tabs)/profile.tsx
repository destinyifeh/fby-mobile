import { Avatar } from "@/components/ui/Avatar";
import { FbyIconName, fbyIcons } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/src/store/useAuthStore";
import { capitalize } from "@/constants/utils";

interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  fbyIcon: FbyIconName;
}

function ProfileMenuItem({
  icon,
  title,
  onPress,
  fbyIcon,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-v2-card-cream-subtle h-20 rounded-3xl mb-4 px-4 shadow-md"
      activeOpacity={0.7}
    >
      <View className="w-12 h-12 rounded-2xl bg-v2-purple items-center justify-center">
        <Image
          source={fbyIcons[fbyIcon]}
          className="w-7 h-7"
          resizeMode="contain"
        />
      </View>
      <Text className="flex-1 ml-4 font-inter text-xl text-v2-text-muted">
        {title}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="#b891f7" />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const rawName = user?.user_metadata?.username || user?.user_metadata?.full_name || user?.user_metadata?.name || "Tina Joy";
  const userName = capitalize(rawName);
  const userEmail = user?.email || "tinajoy@gmail.com";
  const makeupScore = 64;

  return (
    <View className="flex-1 bg-v2-bg-base">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <Ionicons name="arrow-back" size={24} color="#383643" />
          </TouchableOpacity>
          <Text className="font-abhaya-bold text-3xl text-v2-text-body">
            Profile
          </Text>
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
              name={userName}
              //source={require("@/assets/images/profile.png")}
              showEdit={true}
              onEdit={() => router.push("/personal-info")}
            />
            <Text className="font-abhaya-bold text-4xl text-v2-text-body mt-4">
              {userName}
            </Text>
            <Text className="font-inter text-lg text-v2-text-muted mt-1">
              {userEmail}
            </Text>

            {/* Score Badge */}
            <View className="mt-4 bg-v2-badge-pink rounded-full px-6 py-2 border border-v2-shadow-dark">
              <Text className="font-inter-medium text-lg text-v2-text-body">
                Avg Make up score:{makeupScore}%
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="px-6">
            <ProfileMenuItem
              fbyIcon="user"
              icon="person-outline"
              title="Personal Info"
              onPress={() => router.push("/personal-info")}
            />
            <ProfileMenuItem
              fbyIcon="shield"
              icon="shield-checkmark-outline"
              title="Privacy & Data"
              onPress={() => router.push("/privacy-data")}
            />
            <ProfileMenuItem
              fbyIcon="questionMark"
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => router.push("/help-support")}
            />
            <ProfileMenuItem
              fbyIcon="userDouble"
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
