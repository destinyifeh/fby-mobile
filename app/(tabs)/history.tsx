import { Avatar } from "@/components/ui/Avatar";
import { capitalize } from "@/constants/utils";
import { useAuthStore } from "@/src/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Mock history data
const HISTORY_ITEMS = [
  {
    id: "1",
    lookName: "Full glam",
    date: "April 3rd",
    score: 78,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    lookName: "Soft glam",
    date: "April 3rd",
    score: 80,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "3",
    lookName: "Soft glam",
    date: "April 3rd",
    score: 80,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

interface HistoryCardProps {
  item: {
    id: string;
    lookName: string;
    date: string;
    score: number;
    image: string;
  };
  onPress?: () => void;
}

const LOOK_COLORS: Record<string, string> = {
  "full glam": "#ff85af",
  "soft glam": "#ffebbb",
};

function HistoryCard({ item, onPress }: HistoryCardProps) {
  const cardBg = LOOK_COLORS[item.lookName.toLowerCase()] ?? "#f4f0e8";
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: cardBg,
        shadowColor: "#e9dcfe",
        shadowRadius: 12,
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
      }}
      className="h-24 rounded-[12px] flex-row items-center px-4 mb-4"
    >
      {/* Thumbnail */}
      <View className="w-16 h-16 rounded-2xl overflow-hidden">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="flex-1 ml-4">
        <Text className="font-abhaya-bold text-2xl text-v2-text-body leading-6">
          {item.lookName}
        </Text>
        <Text className="font-inter text-v2-text-muted text-base mt-1">
          {item.date}
        </Text>
      </View>

      {/* Score */}
      <Text className="font-abhaya-bold text-3xl text-v2-text-dark mr-2">
        {item.score}
      </Text>
    </TouchableOpacity>
  );
}

export default function HistoryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const userName = capitalize(
    user?.user_metadata?.username ||
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      "Tina",
  );
  return (
    <View className="flex-1 bg-v2-bg-base">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{
            // paddingBottom: 120
            paddingBottom: insets.bottom + 100,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row */}
          <View className="flex-row items-center mt-4">
            <View className="mr-4">
              <Avatar size="lg" name={userName} />
            </View>
            <View
              style={{
                borderRadius: 50,
                height: 30,
                backgroundColor: "rgba(253, 152, 142, 0.30)",
                paddingHorizontal: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text className="font-inter text-v2-text-body text-base text-center">
                Avg Make up score: 64%
              </Text>
            </View>
          </View>

          {/* Featured Card */}

          {/* <View className="mt8 rounded-[40px] shadow-lg">
            <View
              style={{ backgroundColor: "#f4f0e8" }}
              className="rounded-[40px] h-[210px] overflow-hidden flex-row"
            >
              <View className="flex-1 pl-10 py-8 justify-center">
                <Text className="font-inter-medium text-v2-text-body text-base mb-1">
                  Last Make up score:
                </Text>

                <Text className="font-abhaya-bold text-[72px] text-v2-text-body leading-[76px]">
                  75%
                </Text>

                <Text className="font-inter-medium text-v2-text-muted text-base mt-2">
                  Last score: 2 days ago
                </Text>
              </View>

              <View className="w-[180px] h-full">
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />

                <View
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: "rgba(166,123,91,0.25)",
                  }}
                />

                <View className="absolute bottom-4 right-4 bg-primary-brown/30 h-8 px-4 justify-center rounded-full">
                  <Text className="text-white text-sm">view full details</Text>
                </View>
              </View>

              <View
                pointerEvents="none"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: "rgba(166,123,91,0.08)",
                }}
              />
            </View>
          </View> */}

          <View
            className="mt-8 rounded-[40px]"
            style={{
              backgroundColor: "#f4f0e8",
              shadowColor: "#e9dcfe",
              shadowOpacity: 0.6,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
              elevation: 6,
            }}
          >
            <LinearGradient
              colors={[
                "rgba(255,122,109,0.5)",
                "rgba(255,223,220,0.5)",
                "rgba(255,174,166,0.5)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.3 }}
              style={{
                borderRadius: 40,
                height: 210,
                overflow: "hidden",
                flexDirection: "row",
              }}
            >
              {/* LEFT CONTENT */}
              <View className="flex-1 pl-10 py-8 justify-center">
                <Text className="font-inter-medium text-v2-text-body text-base mb-1">
                  Last Make up score:
                </Text>

                <Text className="font-abhaya-bold text-[72px] text-v2-purple leading-[76px]">
                  75%
                </Text>

                <Text className="font-inter-medium text-v2-text-muted text-base mt-2">
                  Last score: 2 days ago
                </Text>
              </View>

              {/* RIGHT IMAGE */}
              <View style={{ width: 180, height: "100%" }}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />

                {/* Overlay to match gradient tone */}
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      backgroundColor: "rgba(166,123,91,0.25)",
                    },
                  ]}
                />

                {/* CTA Button */}
                <TouchableOpacity
                  onPress={() => router.push("/full-analysis")}
                  className="absolute bottom-4 right-4 bg-v2-purple/40 px-4 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(253, 152, 142, 0.30)",
                  }}
                >
                  <Text className="text-v2-text-dark font-inter-medium text-sm">
                    View full details
                  </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Past History List */}
          <View className="mt-8">
            {HISTORY_ITEMS.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onPress={() => router.push("/full-analysis")}
              />
            ))}
          </View>

          {/* Daily Tips */}
          <View className="mt-4 mb-8">
            <Text className="font-abhaya-bold text-xl text-v2-text-body text-center leading-7">
              Daily tips: Blend upward for a lifted effect
            </Text>
          </View>

          {/* Overall Analysis Button */}
          <TouchableOpacity
            className="bg-v2-purple h-16 rounded-[40px] items-center justify-center shadow-lg active:opacity-90 mx-auto px-10"
            onPress={() => router.push("/overall-analysis")}
          >
            <Text className="text-v2-bg-base text-2xl font-abhaya-bold">
              See Overall analysis
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
