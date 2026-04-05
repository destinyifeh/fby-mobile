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
import { SafeAreaView } from "react-native-safe-area-context";

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

function HistoryCard({ item, onPress }: HistoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-[#A67B5B4D] h-24 rounded-[12px] flex-row items-center px-4 mb-4 shadow-md"
      style={{
        shadowColor: "#FFF2DA",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        shadowRadius: 12,
      }}
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
        <Text className="font-abhaya-bold text-2xl text-primary-brown leading-6">
          {item.lookName}
        </Text>
        <Text className="font-inter text-primary-brown-light text-base mt-1">
          {item.date}
        </Text>
      </View>

      {/* Score */}
      <Text className="font-abhaya-bold text-3xl text-primary-brown-light opacity-80 mr-2">
        {item.score}
      </Text>
    </TouchableOpacity>
  );
}

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-cream-light">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Row */}
          <View className="flex-row items-center mt-4">
            <View className="w-16 h-16 rounded-full bg-primary-brown items-center justify-center mr-4">
              {/* Optional: Add user avatar image here */}
              {/* <Image
                source={require("@/assets/images/profile.png")}
                resizeMode="contain"
                className="h-10 w-10"
              /> */}
              <Text className="text-cream font-abhaya-bold text-2xl">
                {"U"}
              </Text>
            </View>
            <View
              className="bg-[#8D524133] px-5 justify-center items-center"
              style={{
                borderRadius: 50,
                height: 30,
              }}
            >
              <Text className="font-inter-bold text-primary-brown text-base text-center">
                Avg Make up score: 64%
              </Text>
            </View>
          </View>

          {/* Featured Card */}

          {/* <View className="mt8 rounded-[40px] shadow-lg">
            <View
              style={{ backgroundColor: "#FFF2DA" }}
              className="rounded-[40px] h-[210px] overflow-hidden flex-row"
            >
              <View className="flex-1 pl-10 py-8 justify-center">
                <Text className="font-inter-medium text-primary-brown text-base mb-1">
                  Last Make up score:
                </Text>

                <Text className="font-abhaya-bold text-[72px] text-primary-brown leading-[76px]">
                  75%
                </Text>

                <Text className="font-inter-medium text-primary-brown-light text-base mt-2">
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
              backgroundColor: "#FFF2DA", // 👈 base color to prevent transparency issues
              shadowColor: "#8D5241",
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
              elevation: 6,
            }}
          >
            <LinearGradient
              colors={[
                "rgba(141,82,65,0.3)",
                "rgba(255,242,218,0.4)",
                "rgba(166,123,91,0.3)",
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
                <Text className="font-inter-medium text-primary-brown text-base mb-1">
                  Last Make up score:
                </Text>

                <Text className="font-abhaya-bold text-[72px] text-primary-brown leading-[76px]">
                  75%
                </Text>

                <Text className="font-inter-medium text-primary-brown-light text-base mt-2">
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
                <TouchableOpacity className="absolute bottom-4 right-4 bg-primary-brown/40 px-4 py-1.5 rounded-full">
                  <Text className="text-white font-inter-medium text-sm">
                    view full details
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
                onPress={() => console.log("View detail", item.id)}
              />
            ))}
          </View>

          {/* Daily Tips */}
          <View className="mt-4 mb-8">
            <Text className="font-abhaya-bold text-xl text-primary-brown text-center leading-7">
              Daily tips: Blend upward for a lifted effect
            </Text>
          </View>

          {/* Overall Analysis Button */}
          <TouchableOpacity
            className="bg-primary-brown h-16 rounded-[40px] items-center justify-center shadow-lg active:opacity-90 mx-auto px-10"
            onPress={() => router.push("/overall-analysis")}
          >
            <Text className="text-cream text-2xl font-abhaya-bold">
              See Overall analysis
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
