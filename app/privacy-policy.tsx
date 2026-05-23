import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const Section = ({ title, content }: { title: string; content: string }) => (
    <View className="mb-8">
      <Text className="font-inter-bold text-2xl text-v2-text-muted mb-3">
        {title}
      </Text>
      <Text className="font-inter text-xl text-v2-text-muted leading-8">
        {content}
      </Text>
    </View>
  );

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
            Privacy Policy
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-8 py-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Text className="font-inter-semibold text-lg text-v2-text-muted mb-6">
            Last Updated: April 04, 2024
          </Text>
          <Section
            title="1. Information We Collect"
            content="When you use Face By You, we may collect information that you provide directly to us, such as your email address. We also collect data related to your interactions with our platform to improve your experience."
          />
          <View className="mb-8">
            <Text className="font-inter-bold text-2xl text-v2-text-muted mb-3">
              2. How We Use Your Information
            </Text>
            <Text className="font-inter text-xl text-v2-text-muted leading-8 mb-4">
              We use the information we collect to:
            </Text>
            <View className="pl-4">
              <Text className="font-inter text-xl text-v2-text-muted leading-8 mb-2">
                • Provide, maintain, and improve our services;
              </Text>
              <Text className="font-inter text-xl text-v2-text-muted leading-8 mb-2">
                • Send you technical notices, updates, and waitlist
                notifications;
              </Text>
              <Text className="font-inter text-xl text-v2-text-muted leading-8 mb-2">
                • Respond to your comments and questions;
              </Text>
              <Text className="font-inter text-xl text-v2-text-muted leading-8">
                • Monitor and analyze trends, usage, and activities.
              </Text>
            </View>
          </View>
          <Section
            title="3. Data Security"
            content="We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction."
          />
          <Section
            title="4. Changes to this Policy"
            content="We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice."
          />
          <Section
            title="5. Contact Us"
            content="If you have any questions about this Privacy Policy, please contact us at admin@facebyyou.tech."
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
