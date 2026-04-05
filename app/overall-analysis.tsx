import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OverallAnalysisScreen() {
  const router = useRouter();

  // Mock trend data for the chart
  const scores = [55, 62, 58, 68, 75, 71, 80];
  const chartHeight = 120;
  const chartWidth = width - 100;

  // Simple path generator for the trend line
  const generatePath = () => {
    const points = scores.map((s, i) => {
      const x = (i * chartWidth) / (scores.length - 1);
      const y = chartHeight - (s * chartHeight) / 100;
      return `${x},${y}`;
    });
    return `M ${points.join(" L ")}`;
  };

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
            Overall Analysis
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Average Score Big Circle */}
          <View className="items-center mt-6">
            <View className="w-56 h-56 rounded-full border-8 border-primary-brown/10 items-center justify-center relative">
              <View className="w-48 h-48 rounded-full border-8 border-primary-brown items-center justify-center bg-white shadow-xl">
                <Text className="font-abhaya-bold text-[64px] text-primary-brown">
                  64%
                </Text>
                <Text className="font-inter-medium text-primary-brown-light text-base -mt-2">
                  Average Score
                </Text>
              </View>
            </View>
          </View>

          {/* Progress Chart */}
          {/* <View className="mt-10 bg-[#FFEAD1] rounded-[32px] p-8 shadow-sm">
            <Text className="font-inter-bold text-primary-brown text-xl mb-6">
              Score Trends
            </Text>
            <View className="h-[120px] items-center justify-center">
              <Svg height={chartHeight} width={chartWidth}>
                <Path
                  d={generatePath()}
                  fill="none"
                  stroke="#8D5241"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <View className="flex-row justify-between mt-4">
              <Text className="text-primary-brown-light font-inter">Mon</Text>
              <Text className="text-primary-brown-light font-inter">Wed</Text>
              <Text className="text-primary-brown-light font-inter">Fri</Text>
              <Text className="text-primary-brown-light font-inter">Today</Text>
            </View>
          </View> */}

          {/* Detailed Breakdown */}
          <View className="mt-8">
            <Text className="font-abhaya-bold text-2xl text-primary-brown mb-6">
              Skill Breakdown
            </Text>

            <View className="gap-y-4">
              <SkillBar label="Base Foundation" score={78} />
              <SkillBar label="Eyes & Brows" score={45} warning />
              <SkillBar label="Lips & Contour" score={82} />
              <SkillBar label="Color Balance" score={60} />
            </View>
          </View>

          {/* Recommendation Card */}
          <View className="mt-8 bg-primary-brown rounded-[32px] p-8 shadow-lg">
            <Text className="text-cream text-2xl font-abhaya-bold mb-3">
              Daily Focus
            </Text>
            <Text className="text-cream/90 text-lg font-inter leading-6">
              Your foundation work is exceptional! For your next scan, focus on
              blending your eye transitions to boost your overall score beyond
              70%.
            </Text>
          </View>

          {/* Share Button */}
          <TouchableOpacity className="flex-row items-center justify-center mt-10 bg-primary-brown-light h-16 rounded-[32px] shadow-md">
            <Ionicons name="share-social-outline" size={24} color="#FFF2DA" />
            <Text className="text-cream text-xl font-abhaya-bold ml-3">
              Share Report
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SkillBar({
  label,
  score,
  warning,
}: {
  label: string;
  score: number;
  warning?: boolean;
}) {
  return (
    <View className="bg-[#FFEAD1] rounded-2xl p-4 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-inter-bold text-primary-brown text-base">
          {label}
        </Text>
        <Text
          className={`font-inter-bold ${warning ? "text-[#E88282]" : "text-primary-brown"} text-base`}
        >
          {score}%
        </Text>
      </View>
      <View className="h-3 bg-cream-light rounded-full overflow-hidden">
        <View
          className={`h-full ${warning ? "bg-[#E88282]" : "bg-primary-brown"} rounded-full`}
          style={{ width: `${score}%` }}
        />
      </View>
    </View>
  );
}
