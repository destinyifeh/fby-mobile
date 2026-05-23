import { Avatar, Button, LookCard } from "@/components/ui";
import { capitalize } from "@/constants/utils";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Placeholder images - in production these would come from an API
const RECENT_LOOKS = [
  {
    id: "1",
    name: "Full glam",
    image: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=200",
  },
  {
    id: "2",
    name: "Soft glam",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
  },
  {
    id: "3",
    name: "Soft glam",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const rawName =
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Tina";
  const userName = capitalize(rawName);
  const makeupScore = 64;

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (params.login === "true") {
      setShowWelcome(true);
      // Clean up the URL param
      router.setParams({ login: "" });
    }
  }, [params.login]);

  const handleScoreYourLook = () => {
    router.push("/take-picture");
  };

  const handleViewMore = () => {
    router.push("/(tabs)/history");
  };

  const handleLookPress = (lookId: string) => {
    router.push("/scan-score");
  };

  const handleScanFirstLook = () => {
    router.push("/take-picture");
  };

  return (
    <View className="flex-1 bg-v2-bg-base">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1 bg-v2-bg-base" edges={["top", "bottom"]}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            // paddingBottom: 100
            paddingBottom: insets.bottom + 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
            <View className="flex-row items-center">
              <Avatar size="md" name={userName} />
              <View
                className="ml-3 rounded-full px-3 py-1.5"
                style={{ backgroundColor: "rgba(115,112,128,0.03)" }}
              >
                <Text className="font-inter-semibold text-sm text-v2-text-muted">
                  Make up score:{makeupScore}%
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push("/notifications")}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#383643"
              />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View className="px-6 mt-4">
            <Text className="font-inter text-2xl text-v2-text-body">
              Hello{" "}
              <Text className="font-inter-semibold text-v2-purple">
                {userName}
              </Text>
              ,
            </Text>
            <Text className="font-inter text-base text-v2-text-muted mt-1">
              Ready for today's glam check?
            </Text>
          </View>

          {/* Camera Score Section */}
          <View className="mx-6 mt-6">
            <View
              className="
                bg-v2-bg-base
                border-2 border-v2-purple
                rounded-[40px]
                h-[318px]
                items-center
                justify-center
              "
            >
              {/* Camera viewfinder corners */}
              <View className="w-[173px] h-[160px] items-center justify-center">
                {/* Top left corner */}
                <View className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-v2-purple" />
                {/* Top right corner */}
                <View className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-v2-purple" />
                {/* Bottom left corner */}
                <View className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-v2-purple" />
                {/* Bottom right corner */}
                <View className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-v2-purple" />
              </View>

              {/* Score Button */}
              <TouchableOpacity
                onPress={handleScoreYourLook}
                className="
                  mt-6
                  bg-v2-purple
                  rounded-full
                  px-6 py-3
                  flex-row items-center
                "
              >
                <Ionicons name="camera-outline" size={20} color="#f4f0e8" />

                <Text className="ml-2 font-abhaya-extrabold text-base text-v2-bg-base">
                  Score your look
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Looks Section */}
          <View className="mx-6 mt-6">
            <View
              className="bg-v2-bg-base rounded-[20px] px-5 pt-4 pb-5"
              style={{
                borderWidth: 1,
                borderColor: "rgba(115,112,128,0.15)",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-inter-semibold text-xl text-v2-text-body">
                  Recent Looks
                </Text>
                <TouchableOpacity onPress={handleViewMore}>
                  <Text className="font-inter text-sm text-v2-text-muted">
                    View more
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Scan First Look CTA */}
              <TouchableOpacity
                onPress={handleScanFirstLook}
                className="flex-row items-center bg-v2-purple-soft rounded-2xl px-4 py-3 mb-4"
              >
                <View className="w-10 h-10 bg-v2-purple rounded-full items-center justify-center mr-3">
                  <Ionicons name="camera-outline" size={20} color="#f4f0e8" />
                </View>
                <View className="flex-1">
                  <Text className="font-inter-semibold text-base text-v2-text-body">
                    Scan your first look
                  </Text>
                  <Text className="font-inter text-sm text-v2-text-muted">
                    Take a photo to get your makeup score
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#b891f7" />
              </TouchableOpacity>

              {/* Looks Grid */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              >
                {RECENT_LOOKS.map((look) => (
                  <LookCard
                    key={look.id}
                    name={look.name}
                    image={look.image}
                    onPress={() => handleLookPress(look.id)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Welcome / Beautify Onboarding Modal (Temporary Demo) */}
      <Modal
        visible={showWelcome}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWelcome(false)}
      >
        <View className="flex-1 justify-end">
          <BlurView intensity={20} tint="dark" className="absolute inset-0" />
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setShowWelcome(false)}
          />

          <View
            className="bg-v2-bg-base rounded-t-[40px] px-8 pt-10 pb-12 shadow-2xl"
            style={{ maxHeight: SCREEN_HEIGHT * 0.7 }}
          >
            <View className="w-12 h-1.5 bg-v2-purple/10 rounded-full self-center mb-8" />

            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-v2-purple-subtle rounded-full items-center justify-center mb-4 border-4 border-white/50">
                <Ionicons name="sparkles" size={40} color="#b891f7" />
              </View>
              <Text className="font-abhaya-bold text-4xl text-v2-text-body text-center">
                A Glimpse of the Future!
              </Text>
            </View>

            <Text className="font-inter text-lg text-v2-text-muted text-center mb-8 leading-7">
              This is just a preview, real data isn’t live yet. We wanted to
              give you a feel for what we’re building at Face By You.
            </Text>

            <View className="gap-y-4 mb-8">
              <View className="flex-row items-center bg-v2-purple-soft p-4 rounded-2xl">
                <View className="w-10 h-10 bg-v2-purple rounded-full items-center justify-center mr-4">
                  <Ionicons name="scan" size={20} color="#f4f0e8" />
                </View>
                <Text className="flex-1 font-inter-semibold text-v2-text-body text-base">
                  Real-time Makeup Scoring & Feedback
                </Text>
              </View>

              <View className="flex-row items-center bg-v2-purple-soft p-4 rounded-2xl">
                <View className="w-10 h-10 bg-v2-purple rounded-full items-center justify-center mr-4">
                  <Ionicons name="color-palette" size={20} color="#f4f0e8" />
                </View>
                <Text className="flex-1 font-inter-semibold text-v2-text-body text-base">
                  Symmetry & Color Balance Analysis
                </Text>
              </View>
            </View>

            <Button
              title="Let's Start Glowing!"
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => setShowWelcome(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
