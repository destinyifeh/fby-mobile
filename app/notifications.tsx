import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface NotificationItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  time: string;
  isNew?: boolean;
}

function NotificationItem({
  icon,
  title,
  time,
  isNew = false,
}: NotificationItemProps) {
  return (
    <View className="flex-row items-center bg-v2-card-cream-subtle h-24 rounded-3xl mb-4 px-5 border border-v2-shadow-dark shadow-md">
      <View className="w-14 h-14 rounded-2xl bg-v2-purple items-center justify-center">
        <Ionicons name={icon} size={28} color="#f4f0e8" />
      </View>
      <View className="flex-1 ml-4 justify-center">
        <Text
          className="font-inter-medium text-lg text-v2-text-body leading-6"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text className="font-inter text-sm text-v2-text-muted mt-1">
          {time}
        </Text>
      </View>
      {isNew && <View className="w-3 h-3 rounded-full bg-v2-coral ml-2" />}
    </View>
  );
}

export default function NotificationsScreen() {
  const router = useRouter();

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
            Notifications
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* New Section */}
          <View className="mt-6">
            <Text className="font-inter-bold text-xl text-v2-text-body mb-5">
              New
            </Text>
            <NotificationItem
              icon="notifications-outline"
              title="You have a new score on your last glam"
              time="2 min ago"
              isNew={true}
            />
            <NotificationItem
              icon="sparkles-outline"
              title="Your personalized tutorial is ready"
              time="10 min ago"
              isNew={true}
            />
          </View>

          {/* Earlier Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-xl text-v2-text-body mb-5">
              Earlier
            </Text>
            <NotificationItem
              icon="calendar-outline"
              title="Don't forget to track your looks this week"
              time="2 days ago"
            />
            <NotificationItem
              icon="heart-outline"
              title="Welcome to Face By You! Let's start your beauty journey."
              time="1 week ago"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
