import { Button, Input } from "@/components/ui";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import { forgotPasswordSchema, ForgotPasswordFormValues } from "@/lib/validations/auth";
import { useAuth } from "@/src/hooks/useAuth";

const fbyLogo = require("@/assets/images/fby-logo.png");
const userIcon = require("@/assets/images/user.png");
const lockedIcon = require("@/assets/images/locked.png");

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { forgotPassword, isSendingReset, verifyResetOtp, isVerifyingOtp } = useAuth();
  
  // State tracking phase transition
  const [emailSentTo, setEmailSentTo] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState('');

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const sendOtpReq = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(data.email);
      setEmailSentTo(data.email);
    } catch {} // Caught natively in mutation
  };

  return (
    <View className="flex-1">
      <StatusBar style="dark" />

      <LinearGradient
        colors={["#E3BCB5", "#FFF2DA", "#E6CDB3", "#CDA78B", "#E3BCB5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1">
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => {
            if (emailSentTo) setEmailSentTo(null);
            else router.back();
          }} className="w-10 h-10 items-center justify-center">
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <Image source={fbyLogo} style={{ width: 120, height: 32 }} resizeMode="contain" />
          <View className="w-10" />
        </View>

        <View className="flex-1 bg-cream rounded-t-[30px] px-7 pt-10 mt-10" style={{ shadowColor: "#A67B5B", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 8 }}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
              
              {!emailSentTo ? (
                <>
                  <Text className="font-abhaya-bold text-3xl text-primary-brown mb-2 text-center">
                    Forgot Password
                  </Text>
                  <Text className="font-inter text-base text-primary-brown-light text-center mb-8">
                    Enter your email address and we'll send you an 8-digit code to securely reset your password.
                  </Text>

                  <View className="gap-4">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                        <Input
                          label="Email Address"
                          placeholder="Enter your email"
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          error={error?.message}
                          icon={<Image source={userIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      )}
                    />
                    
                    <Button
                      title={isSendingReset ? "Sending code..." : "Send Verification Code"}
                      variant="primary"
                      size="lg"
                      fullWidth
                      onPress={handleSubmit(sendOtpReq)}
                      className="mt-4"
                      disabled={isSendingReset}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text className="font-abhaya-bold text-3xl text-primary-brown mb-2 text-center">
                    Verify Code
                  </Text>
                  <Text className="font-inter text-base text-primary-brown-light text-center mb-8">
                    Please check your email. Enter the 8-digit code we sent to <Text className="font-inter-bold">{emailSentTo}</Text>.
                  </Text>

                  <View className="gap-4">
                     <Input
                        label="8-Digit Code"
                        placeholder="00000000"
                        value={otpCode}
                        onChangeText={setOtpCode}
                        icon={<Image source={lockedIcon} style={{ width: 24, height: 24 }} resizeMode="contain" />}
                        keyboardType="numeric"
                        maxLength={8}
                      />
                    
                    <Button
                      title={isVerifyingOtp ? "Verifying..." : "Confirm & Continue"}
                      variant="primary"
                      size="lg"
                      fullWidth
                      onPress={() => verifyResetOtp({ email: emailSentTo, token: otpCode })}
                      className="mt-4"
                      disabled={isVerifyingOtp || otpCode.length < 6}
                    />
                    <TouchableOpacity 
                      onPress={() => setEmailSentTo(null)} 
                      className="items-center mt-4"
                    >
                      <Text className="text-primary-brown-light font-inter-medium text-base">
                        Didn't receive a code?{" "}
                        <Text className="text-primary-brown underline">Go back</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
}
