import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpSupportScreen() {
  const router = useRouter();

  const FAQItem = ({
    question,
    onPress,
  }: {
    question: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center bg-cream h-20 rounded-3xl mb-4 px-8 justify-between shadow-sm border border-primary-brown/5"
    >
      <Text className="font-inter-medium text-primary-brown-light text-lg flex-1 pr-4">
        {question}
      </Text>
      <Ionicons name="chevron-forward" size={24} color="#A67B5B" />
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
            Help & Support
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* FAQs Section */}
          <View className="mt-8">
            <Text className="font-inter-bold text-2xl text-primary-brown-light mb-6">
              FAQs
            </Text>
            <FAQItem
              question="How does Face By You Work?"
              onPress={() => router.push("/faq-how-it-works")}
            />
            <FAQItem
              question="How do I get make up guidiance?"
              onPress={() => router.push("/faq-makeup-guidance")}
            />
          </View>

          {/* Contact Section */}
          <View className="mt-12 items-center">
            <Text className="font-inter-semibold text-xl text-primary-brown-light mb-6 self-start">
              Need more help?
            </Text>
            <TouchableOpacity className="flex-row items-center bg-primary-brown w-full h-[50px] rounded-[50px] justify-center shadow-lg">
              <View className="mr-4">
                {/* <Ionicons
                  name="shield-checkmark-outline"
                  size={36}
                  color="#FFF2DA"
                /> */}
                <Image
                  source={require("../assets/icons/shield-heart.png")}
                  resizeMode="contain"
                />
              </View>
              <Text className="text-cream text-2xl font-abhaya-bold">
                Contact us
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-8">
              <Text className="text-primary-brown-light text-2xl font-abhaya-bold opacity-80">
                Report an issue
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
