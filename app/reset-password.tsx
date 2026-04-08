import { Button, Input } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/validations/auth";
import { useAuth } from "@/src/hooks/useAuth";

const fbyLogo = require("@/assets/images/fby-logo.png");
const lockedIcon = require("@/assets/images/locked.png");

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { updatePassword, isUpdatingPassword } = useAuth();
  
  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <View className="flex-1">
      <StatusBar style="dark" />

      {/* Background gradient */}
      <LinearGradient
        colors={["#E3BCB5", "#FFF2DA", "#E6CDB3", "#CDA78B", "#E3BCB5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="w-10" />
          <Image source={fbyLogo} style={{ width: 120, height: 32 }} resizeMode="contain" />
          <View className="w-10" />
        </View>

        <View className="flex-1 bg-cream rounded-t-[30px] px-7 pt-10 mt-10" style={{ shadowColor: "#A67B5B", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 8 }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text className="font-abhaya-bold text-3xl text-primary-brown mb-2 text-center">
                Set New Password
              </Text>
              <Text className="font-inter text-base text-primary-brown-light text-center mb-8">
                Your new password must be different from previous used passwords.
              </Text>

              <View className="gap-4">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      label="New Password"
                      placeholder="Enter new password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                      icon={<Image source={lockedIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />}
                      secureTextEntry
                      textContentType="newPassword"
                    />
                  )}
                />
                
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <Input
                      label="Confirm Password"
                      placeholder="Confirm new password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                      icon={<Image source={lockedIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />}
                      secureTextEntry
                      textContentType="newPassword"
                    />
                  )}
                />
                
                <Button
                  title={isUpdatingPassword ? "Updating..." : "Reset Password"}
                  variant="primary"
                  size="lg"
                  fullWidth
                  onPress={handleSubmit((data) => updatePassword(data.password))}
                  className="mt-6"
                  disabled={isUpdatingPassword}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
}
