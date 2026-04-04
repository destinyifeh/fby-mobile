import { FbyIconName, fbyIcons } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyDataScreen() {
  const router = useRouter();

  const MenuItem = ({
    icon,
    imgIcon,
    title,
    isDanger = false,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    isDanger?: boolean;
    onPress: () => void;
    imgIcon: FbyIconName;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center h-20 rounded-[10px] mb-4 px-4 bg-cream-light shadow-md"
    >
      <View
        className={`w-12 h-12 rounded-2xl items-center justify-center ${isDanger ? "bg-red-500" : "bg-primary-brown"}`}
      >
        <Image
          source={fbyIcons[imgIcon]}
          className="w-7 h-7"
          resizeMode="contain"
        />
        {/* <Ionicons name={icon} size={24} color="#FFF2DA" /> */}
      </View>
      <Text
        className={`flex-1 ml-4 font-inter text-xl ${isDanger ? "text-red-500" : "text-primary-brown-light"}`}
      >
        {title}
      </Text>
      {!isDanger && (
        <Ionicons name="chevron-forward" size={24} color="#A67B5B" />
      )}
    </TouchableOpacity>
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
            Privacy & Data
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Account Privacy Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-2xl text-primary-brown-light mb-6">
              Account Privacy
            </Text>
            <MenuItem
              imgIcon="user"
              icon="person-outline"
              title="Privacy Settings"
              onPress={() => router.push("/privacy-settings")}
            />
            <MenuItem
              icon="shield"
              imgIcon="shield"
              title="Data Permisions"
              onPress={() => router.push("/data-permisions")}
            />
          </View>

          {/* Legal Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-2xl text-primary-brown-light mb-6">
              Legal
            </Text>
            <MenuItem
              icon="person-outline"
              imgIcon="user"
              title="Term of use"
              onPress={() => router.push("/terms-of-use")}
            />
            <MenuItem
              icon="shield-checkmark-outline"
              imgIcon="shield"
              title="Privacy Policy"
              onPress={() => router.push("/privacy-policy")}
            />
            <MenuItem
              icon="log-out-outline"
              imgIcon="logout"
              title="Log out"
              isDanger={true}
              onPress={() => router.replace("/auth")}
            />
          </View>

          {/* Logo Section */}
          <View className="items-center mt-12">
            <Image
              source={require("@/assets/images/fby-logo.png")}
              className="w-48 h-12"
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
