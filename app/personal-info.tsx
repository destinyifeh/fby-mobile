import { Avatar } from "@/components/ui/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { capitalize } from "@/constants/utils";
import { dobSchema } from "@/lib/validations/auth";
import { authService } from "@/src/api/auth/authService";
import { supabase } from "@/src/api/auth/supabase";
import { useAuth } from "@/src/hooks/useAuth";
import { useAuthStore } from "@/src/store/useAuthStore";

const formatDateOfBirth = (text: string) => {
  const cleaned = text.replace(/\D/g, "");
  let formatted = cleaned;
  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }
  return formatted;
};

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const { updatePassword, isUpdatingPassword } = useAuth(); // We'll use supabase.auth directly for metadata
  const [isChecking, setIsChecking] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const initialUsername = (
    user?.user_metadata?.username ||
    user?.user_metadata?.full_name ||
    ""
  ).toLowerCase();
  const initialEmail = (user?.email || "").toLowerCase();

  const [username, setUsername] = useState(capitalize(initialUsername));
  const [email, setEmail] = useState(initialEmail);
  const [dob, setDob] = useState(user?.user_metadata?.dob || "");
  const [nationality, setNationality] = useState(
    user?.user_metadata?.nationality || "",
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    // 1. Strict DOB validation using the main schema
    const dobValidation = dobSchema.safeParse(dob);
    if (!dobValidation.success) {
      console.log("DOB VALIDATION ERROR:", dobValidation.error);
      const errorMessage =
        dobValidation.error.issues[0]?.message ||
        "Please check your date of birth format.";
      Alert.alert("Invalid Date", errorMessage);
      return;
    }

    setIsChecking(true);
    setIsUpdating(true);
    try {
      // 2. Check Username Uniqueness (if changed)
      if (username.toLowerCase() !== initialUsername) {
        const isAvailable = await authService.checkUsernameAvailability(
          username,
          user?.id,
        );
        if (!isAvailable) {
          Alert.alert(
            "Username Taken",
            "This username is already in use by another member.",
          );
          setIsChecking(false);
          setIsUpdating(false);
          return;
        }
      }

      // 3. Check Email Uniqueness (if changed)
      const emailChanged = email.toLowerCase() !== initialEmail;
      if (emailChanged) {
        const isEmailAvailable = await authService.checkEmailAvailability(
          email,
          user?.id,
        );
        if (!isEmailAvailable) {
          Alert.alert(
            "Email Taken",
            "An account with this email already exists.",
          );
          setIsChecking(false);
          setIsUpdating(false);
          return;
        }
      }

      // 4. Perform Update
      const updateData: any = {
        data: { username, dob, nationality },
      };

      if (emailChanged) {
        updateData.email = email.toLowerCase();
      }

      const { data, error } = await supabase.auth.updateUser(updateData);
      console.log("UPDATE ERROR:", JSON.stringify(error));

      if (error) throw error;

      if (emailChanged) {
        setPendingEmail(email.toLowerCase());
        setIsVerifyingEmail(true);
        setIsChecking(false);
        setIsUpdating(false);
        // We stay on this screen to show the modal
        return;
      }

      // If no email change, finalize now
      await authService.syncProfile(data.user);
      setUser(data.user);
      setIsChecking(false);
      setIsUpdating(false);
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (err: any) {
      console.error("Update error:", err);
      Alert.alert("Update Failed", err.message || "An error occurred.");
      setIsChecking(false);
      setIsUpdating(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (verificationCode.length !== 8) {
      Alert.alert(
        "Check Code",
        "Please enter the 8-digit code sent to your email.",
      );
      return;
    }

    setIsUpdating(true);
    try {
      const resp = await authService.verifyEmailChangeOtp(
        pendingEmail,
        verificationCode,
      );

      let finalUser = resp?.user;

      if (!finalUser || !finalUser.id) {
        console.log("No user in response, fetching manually...");
        const { data: userData } = await supabase.auth.getUser();
        finalUser = userData?.user;
      }

      if (!finalUser || !finalUser.id) {
        throw new Error(
          "Could not find your user ID. Please try logging out and back in.",
        );
      }

      // Update successful!
      await authService.syncProfile(finalUser);
      setUser(finalUser);

      setIsVerifyingEmail(false);
      setIsUpdating(false);
      Alert.alert("Verified!", "Your email has been updated successfully.");
      router.back();
    } catch (err: any) {
      console.error("Verification error:", err);
      Alert.alert(
        "Verification Failed",
        err.message || "Invalid or expired code.",
      );
      setIsUpdating(false);
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
            Personal Info
          </Text>
          <View className="w-10" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          //  keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 40}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Avatar Section */}
            <View className="items-center mt-6 mb-8">
              <Avatar
                size="xxl"
                name={username}
                // source={require("@/assets/images/profile.png")}
                showEdit={!true}
                onEdit={() => console.log("Edit avatar")}
              />
              <TouchableOpacity className="mt-4">
                <Text className="font-abhaya-bold text-2xl text-primary-brown">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
            <View className="gap-y-6">
              <View>
                <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                  Username
                </Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Enter username"
                  placeholderTextColor="#A67B5B"
                  className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
                />
              </View>

              <View>
                <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  placeholderTextColor="#A67B5B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
                />
              </View>

              <View>
                <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                  Date of birth
                </Text>
                <TextInput
                  value={dob}
                  onChangeText={(val) => setDob(formatDateOfBirth(val))}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#A67B5B"
                  keyboardType="number-pad"
                  maxLength={10}
                  className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
                />
              </View>

              <View>
                <Text className="font-inter-medium text-lg text-primary-brown mb-2 ml-1">
                  Nationality
                </Text>
                <TextInput
                  value={nationality}
                  onChangeText={setNationality}
                  placeholder="Enter nationality"
                  placeholderTextColor="#A67B5B"
                  className="bg-[#A67B5B1A] h-16 rounded-[20px] px-6 font-inter-medium text-primary-brown-light text-lg border border-primary-brown/5"
                />
              </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
              onPress={handleUpdate}
              disabled={isUpdating || isChecking}
              className={`bg-primary-brown h-16 rounded-[40px] items-center justify-center mt-12 mb-8 shadow-lg active:opacity-90 ${isUpdating || isChecking ? "opacity-70" : ""}`}
            >
              {isUpdating || isChecking ? (
                <ActivityIndicator color="#F5F5DC" />
              ) : (
                <Text className="text-cream text-2xl font-abhaya-bold">
                  Update Profile
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Verification Modal */}
        <Modal visible={isVerifyingEmail} transparent animationType="fade">
          <BlurView
            intensity={20}
            tint="dark"
            className="flex-1 justify-center px-6"
          >
            <View className="bg-cream-light rounded-[32px] p-8 shadow-2xl border border-primary-brown/10">
              <Text className="font-abhaya-bold text-3xl text-primary-brown text-center mb-2">
                Verify Email
              </Text>
              <Text className="font-inter-regular text-lg text-primary-brown-light text-center mb-8">
                Enter the 8-digit code sent to{"\n"}
                <Text className="font-inter-bold">{pendingEmail}</Text>
              </Text>

              <View>
                <TextInput
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  placeholder="00000000"
                  placeholderTextColor="#A67B5B"
                  keyboardType="number-pad"
                  maxLength={8}
                  className="bg-[#A67B5B1A] h-20 rounded-[20px] px-6 font-abhaya-bold text-primary-brown text-4xl text-center tracking-[10px] border border-primary-brown/5 mb-8"
                />
              </View>

              <TouchableOpacity
                onPress={handleVerifyEmailCode}
                disabled={isUpdating}
                className={`bg-primary-brown h-16 rounded-[40px] items-center justify-center shadow-lg active:opacity-90 mb-4 ${isUpdating ? "opacity-70" : ""}`}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#F5F5DC" />
                ) : (
                  <Text className="text-cream text-xl font-abhaya-bold">
                    Verify & Update
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsVerifyingEmail(false)}
                disabled={isUpdating}
                className="h-12 items-center justify-center"
              >
                <Text className="text-primary-brown-light font-inter-medium text-lg">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
