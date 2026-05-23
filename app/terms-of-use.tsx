import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermOfUseScreen() {
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
            Term of use
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView
          className="flex-1 px-8 py-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Section
            title="1. Acceptance of Terms"
            content="By accessing and using Face By You, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this app."
          />
          <Section
            title="2. Use License"
            content="Permission is granted to temporarily download one copy of the materials (information or software) on Face By You's app for personal, non-commercial transitory viewing only."
          />
          <Section
            title="3. Disclaimer"
            content="The materials on Face By You's app are provided on an 'as is' basis. Face By You makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
          />
          <Section
            title="4. Limitations"
            content="In no event shall Face By You or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Face By You's app."
          />
          <Section
            title="5. Governing Law"
            content="These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
