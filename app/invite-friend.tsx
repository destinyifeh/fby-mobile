import { fbyIcons } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import { SITE_LINK } from "@/constants/utils";

export default function InviteFriendScreen() {
  const router = useRouter();
  const inviteLink = SITE_LINK;

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Join me on Face By You and become your own MUA! Check it out here: ${inviteLink}`,
        url: inviteLink, // iOS only
      });
    } catch (error: any) {
      Alert.alert("Share Error", error.message);
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(inviteLink);
    Alert.alert("Success", "Invitation link copied to clipboard!");
  };

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
            Invite a friend
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-8"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {/* QR Code Container */}
          <View
            style={{ width: 299, height: 264 }}
            className="items-center justify-center"
          >
            {/* QR Image */}
            <Image
              source={fbyIcons["qrcode"]}
              resizeMode="contain"
              className="w-[216px] h-[216px] z-10"
            />

            {/* Color overlay */}
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: "#383643",
                  opacity: 0.9,
                  borderRadius: 20,
                },
              ]}
            />
          </View>

          {/* Invitation Text */}
          <View className="mt-12 items-center px-4">
            <Text className="font-abhaya-bold text-3xl text-v2-text-body text-center leading-9">
              Invite friends to Face By You and help them become their own MUA.
            </Text>
            <Text className="font-inter text-v2-purple text-xl mt-6">
              Scan QR code to invite friends
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="flex-row w-full mt-12 gap-x-4 pb-10">
            <TouchableOpacity 
              onPress={handleShare}
              className="flex-1 bg-v2-card-dark h-24 rounded-3xl items-center justify-center shadow-md active:opacity-80"
            >
              <View className="flex-row items-center mb-1">
                <Image
                  source={fbyIcons["share"]}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-v2-bg-base text-xl font-abhaya-bold">Share</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleCopy}
              className="flex-1 bg-v2-card-dark h-24 rounded-3xl items-center justify-center shadow-md active:opacity-80"
            >
              <View className="flex-row items-center mb-1">
                <Image
                  source={fbyIcons["copy"]}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-v2-bg-base text-xl font-abhaya-bold">
                Copy link
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
