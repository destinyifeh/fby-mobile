import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MakeupGuidanceScreen() {
  const router = useRouter();

  const GuidanceSection = ({
    title,
    content,
    icon,
  }: {
    title: string;
    content: string;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <View className="mb-10">
      <View className="flex-row items-center mb-4">
        <View className="w-10 h-10 rounded-xl bg-primary-brown items-center justify-center mr-4">
          <Ionicons name={icon} size={20} color="#FFF2DA" />
        </View>
        <Text className="font-inter-bold text-2xl text-primary-brown-light flex-1 pr-2">
          {title}
        </Text>
      </View>
      <Text className="font-inter text-xl text-primary-brown-light leading-8 pl-1">
        {content}
      </Text>
    </View>
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
            Makeup Guidance
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-8 py-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Intro Card */}
          <View className="bg-primary-brown/5 p-8 rounded-4xl mb-10 border border-primary-brown/10 shadow-sm">
            <Text className="font-abhaya-bold text-3xl text-primary-brown text-center leading-9">
              Discover how Face By You analyzes your makeup and builds guidance
              that truly works for you.
            </Text>
          </View>

          <GuidanceSection
            icon="sparkles-outline"
            title="Personalized guidance for your unique features"
            content="Face By You adapts to your specific facial structure, undertones, and personal style. You receive guidance shaped around your beauty expression, not a one-size-fits-all routine. This makes every insight feel relevant, realistic, and truly yours."
          />

          <GuidanceSection
            icon="brush-outline"
            title="Refine the look you already have"
            content="When you scan your makeup, Face By You highlights what's working and offers simple, supportive refinements you can use in your next look. Gentle guidance that helps your beauty evolve thoughtfully."
          />

          <GuidanceSection
            icon="heart-outline"
            title="A supportive beauty companion"
            content="Makeup guidance should feel safe, not overwhelming. Face By You offers gentle, constructive feedback that helps you grow without comparison, pressure, or noise. It's a safe space to explore, learn, and try again."
          />

          <GuidanceSection
            icon="people-outline"
            title="Designed to be inclusive from day one"
            content="Beauty looks different everywhere, and Face By You was built for that diversity. Our guidance respects a wide range of skin types, undertones, application styles, and cultural approaches to beauty. Everyone belongs here, and the experience adjusts to reflect real-world differences."
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
