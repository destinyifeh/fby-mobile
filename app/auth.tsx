import { ChatAnimation } from "@/components/chat";
import { Button, Input } from "@/components/ui";
import {
  LoginFormValues,
  loginSchema,
  SignUpFormValues,
  signUpSchema,
} from "@/lib/validations/auth";
import { useAuth } from "@/src/hooks/useAuth";
import { useSocialAuth } from "@/src/hooks/useSocialAuth";
import type { AuthMode } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const fbyLogo = require("@/assets/images/fby-logo.png");
const userIcon = require("@/assets/images/user.png");
const lockedIcon = require("@/assets/images/locked.png");
const calendarIcon = require("@/assets/images/calendar.png");

const GoogleLogo = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

const SocialLogins = () => {
  const { loginWithProvider } = useSocialAuth();

  return (
    <>
      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-[1px] bg-primary-brown-light/30" />
        <Text className="mx-4 text-primary-brown-light font-inter text-base">
          Or
        </Text>
        <View className="flex-1 h-[1px] bg-primary-brown-light/30" />
      </View>

      {/* Social Login */}
      <View className="flex-row justify-center gap-6 mt-2">
        <TouchableOpacity
          onPress={() => loginWithProvider("google")}
          className="w-[60px] h-[60px] rounded-full bg-[#A67B5B1A] items-center justify-center border border-primary-brown/5"
        >
          <GoogleLogo size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => loginWithProvider("apple")}
          className="w-[60px] h-[60px] rounded-full bg-[#A67B5B1A] items-center justify-center border border-primary-brown/5"
        >
          <Ionicons name="logo-apple" size={32} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => loginWithProvider("facebook")}
          className="w-[60px] h-[60px] rounded-full bg-[#A67B5B1A] items-center justify-center border border-primary-brown/5"
        >
          <Ionicons name="logo-facebook" size={32} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </>
  );
};
const LoginForm = ({
  onShowVerification,
}: {
  onShowVerification: (email: string) => void;
}) => {
  const router = useRouter();
  const { login, isLoggingIn, resendVerification } = useAuth();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login(data, {
        onError: (error: any) => {
          if (error.message.includes("Your email is not verified")) {
            // Automatically trigger a fresh code when they try to login unverified
            resendVerification(data.email);
            // Redirect to the verification screen
            onShowVerification(data.email);
          }
        },
      });
    } catch (err) {
      // Mutations handle their own alerts
    }
  };

  return (
    <View className="gap-3">
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={userIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Password"
            placeholder="Enter password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={lockedIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            secureTextEntry
            textContentType="password"
          />
        )}
      />
      <TouchableOpacity
        className="self-start"
        onPress={() => router.push("/forgot-password" as any)}
      >
        <Text className="text-primary-brown font-inter-medium text-base">
          Forgot password?
        </Text>
      </TouchableOpacity>
      <Button
        title={isLoggingIn ? "Logging in..." : "Login"}
        variant="primary"
        size="lg"
        fullWidth
        onPress={handleSubmit(handleLogin)}
        className="mt-2"
        disabled={isLoggingIn}
      />
      <SocialLogins />
    </View>
  );
};

const formatDateOfBirth = (text: string) => {
  const cleaned = text.replace(/\D/g, "");
  let formatted = cleaned;
  if (cleaned.length > 2) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  if (cleaned.length > 4) {
    formatted = `${formatted.slice(0, 5)}/${cleaned.slice(4, 8)}`;
  }
  return formatted;
};

const VerificationForm = ({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) => {
  const {
    verifyEmail,
    isVerifyingEmail,
    resendVerification,
    isResendingVerification,
  } = useAuth();
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (code.length < 6) {
      Alert.alert(
        "Invalid Code",
        "Please enter the verification code sent to your email.",
      );
      return;
    }
    verifyEmail({ email, token: code });
  };

  return (
    <View className="gap-6 py-4">
      <View className="items-center">
        <View className="w-16 h-16 bg-primary-brown/10 rounded-full items-center justify-center mb-4">
          <Ionicons name="mail-unread-outline" size={32} color="#8D5241" />
        </View>
        <Text className="font-abhaya-bold text-3xl text-primary-brown mb-2 text-center">
          Verify your email
        </Text>
        <Text className="text-primary-brown font-inter text-base text-center mt-3 px-4">
          We've sent a verification code to{"\n"}
          <Text className="font-inter-bold">{email}</Text>.{"\n"}
          Please enter it below to activate your account.
        </Text>
      </View>

      <View>
        <Input
          label="Verification Code"
          placeholder="Enter 8-digit code"
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
          maxLength={8}
          autoFocus
          style={{
            textAlign: "center",
            fontSize: 20,
            letterSpacing: 4,
            height: 60,
          }}
        />
      </View>

      <View className="gap-3">
        <Button
          title={isVerifyingEmail ? "Verifying..." : "Verify & Activate"}
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleVerify}
          disabled={isVerifyingEmail || !code}
        />

        <Button
          title={isResendingVerification ? "Resending..." : "Resend Code"}
          variant="outline"
          size="lg"
          fullWidth
          onPress={() => resendVerification(email)}
          disabled={isResendingVerification || isVerifyingEmail}
        />
      </View>

      <TouchableOpacity onPress={onBack} className="items-center mt-2">
        <Text className="text-primary-brown-light font-inter-medium text-base">
          Incorrect email?{" "}
          <Text className="text-primary-brown underline">Go back</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUpForm = ({
  onShowVerification,
}: {
  onShowVerification: (email: string) => void;
}) => {
  const { signUp, isSigningUp } = useAuth();
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", dateOfBirth: "", password: "" },
  });

  return (
    <View className="gap-3">
      <Controller
        control={control}
        name="username"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Username"
            placeholder="Enter username"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={userIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={userIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="dateOfBirth"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            value={value}
            onChangeText={(text) => onChange(formatDateOfBirth(text))}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={calendarIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            keyboardType="numeric"
            maxLength={10}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <Input
            label="Create Password"
            placeholder="Enter password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            icon={
              <Image
                source={lockedIcon}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            }
            secureTextEntry
            textContentType="newPassword"
          />
        )}
      />

      {/* Terms and Conditions */}
      <TouchableOpacity
        onPress={() => setAgreeToTerms(!agreeToTerms)}
        className="flex-row items-center"
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 1.5,
            borderColor: "#8D5241",
            backgroundColor: agreeToTerms ? "#8D5241" : "transparent",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          {agreeToTerms && (
            <Ionicons name="checkmark" size={14} color="#FFF2DA" />
          )}
        </View>
        <Text className="text-primary-brown font-inter text-sm">
          I agree with the terms and conditions
        </Text>
      </TouchableOpacity>

      <Button
        title={isSigningUp ? "Signing up..." : "Sign up"}
        variant="primary"
        size="lg"
        fullWidth
        onPress={handleSubmit((data) => {
          if (!agreeToTerms) {
            alert("You must agree to the terms and conditions.");
            return;
          }
          signUp(data, {
            onSuccess: () => {
              onShowVerification(data.email);
            },
          });
        })}
        className="mt-2"
        disabled={isSigningUp}
      />
      <SocialLogins />
    </View>
  );
};

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );

  if (verificationEmail) {
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
          <View
            className="flex-1 bg-cream rounded-t-[30px] px-7 pt-10 mt-20"
            style={{
              shadowColor: "#A67B5B",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <VerificationForm
              email={verificationEmail}
              onBack={() => setVerificationEmail(null)}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

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
        {/* Top section with logo and preview */}
        <View className="items-center pt-4 px-4">
          <View
            style={{ width: "100%", alignItems: "flex-start", marginBottom: 8 }}
          >
            <Image
              source={fbyLogo}
              style={{ width: 140, height: 36 }}
              resizeMode="contain"
            />
          </View>
          <Text className="font-inter-semibold text-xl text-primary-brown-dark mb-4">
            AI powered MUA assistant
          </Text>
          <View
            style={{
              width: 320,
              height: 300,
              marginBottom: mode === "signup" ? -240 : -80,
              zIndex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <ChatAnimation compact />
          </View>
        </View>

        {/* Auth Form Card */}
        <View
          className="flex-1 bg-cream rounded-t-[30px] px-7 pt-6"
          style={{
            shadowColor: "#A67B5B",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 8,
            zIndex: 10,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 20}
            className="flex-1"
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 150 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Tab Switcher */}
              <View className="bg-accent-tan-light rounded-[30px] h-[55px] flex-row items-center p-1.5 mb-4">
                <TouchableOpacity
                  onPress={() => setMode("login")}
                  className={`flex-1 h-[43px] rounded-[20px] items-center justify-center ${mode === "login" ? "bg-cream" : ""}`}
                >
                  <Text
                    className={`font-inter-medium text-base ${mode === "login" ? "text-primary-brown" : "text-primary-brown-light"}`}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setMode("signup")}
                  className={`flex-1 h-[43px] rounded-[20px] items-center justify-center ${mode === "signup" ? "bg-cream" : ""}`}
                >
                  <Text
                    className={`font-inter-medium text-base ${mode === "signup" ? "text-primary-brown" : "text-primary-brown-light"}`}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>

              {mode === "login" ? (
                <LoginForm onShowVerification={setVerificationEmail} />
              ) : (
                <SignUpForm onShowVerification={setVerificationEmail} />
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </View>
  );
}
