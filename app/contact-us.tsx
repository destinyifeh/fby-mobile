import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import { emailService } from "@/src/api/email/emailService";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function ContactUsScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: "contact" | "issue" }>();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuthStore();

  const isIssue = type === "issue";
  const title = isIssue ? "Report an Issue" : "Contact Us";
  const placeholder = isIssue
    ? "Please describe the issue you're experiencing..."
    : "How can we help you today?";

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message before sending.");
      return;
    }

    setIsSending(true);
    try {
      const userEmail = user?.email || "anonymous@user.com";
      const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || "App User";

      await emailService.sendSupportEmail(
        type || "contact",
        userName,
        userEmail,
        message
      );

      Alert.alert("Success", "Your message has been sent successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to send message:", error);
      Alert.alert("Error", "Failed to send your message. Please try again later.");
    } finally {
      setIsSending(false);
    }
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
            {title}
          </Text>
          <View className="w-10" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6"
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
          >
            <Text className="font-inter text-primary-brown-light text-lg mb-6 leading-6">
              {isIssue
                ? "Help us improve Face By You by reporting any bugs or issues you encounter."
                : "Have a question or feedback? We'd love to hear from you."}
            </Text>

            <View className="bg-accent-tan-light rounded-3xl p-4 border border-accent-tan mb-8">
              <TextInput
                multiline
                numberOfLines={10}
                placeholder={placeholder}
                placeholderTextColor="#A67B5B"
                value={message}
                onChangeText={setMessage}
                className="font-inter text-primary-brown text-lg h-60 text-top"
                textAlignVertical="top"
                style={{ textAlignVertical: "top" }}
              />
            </View>

            <Button
              title={isSending ? "Sending..." : (isIssue ? "Submit Report" : "Send Message")}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isSending}
              onPress={handleSend}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
