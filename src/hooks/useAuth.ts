import { LoginFormValues, SignUpFormValues } from "@/lib/validations/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { authService } from "../api/auth/authService";
import { emailService } from "../api/email/emailService";
import { useAuthStore } from "../store/useAuthStore";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setSession, setUser } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormValues) =>
      authService.login(credentials),
    onSuccess: (data) => {
      setSession(data.session);
      setUser(data.user);
      // Safety net: ensures user is in the public table
      authService.syncProfile(data.user);
    },
    onError: (error: any) => {
      console.log(error);
      // Suppress the redundant login error alert if we are redirecting to verification
      if (error.message.includes("Your email is not verified")) {
        return;
      }
      Alert.alert(
        "Login Failed",
        error.message || "An error occurred during login",
      );
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpFormValues) =>
      authService.signUp(credentials),
    onSuccess: (data) => {
      // If email confirmation is disabled, Supabase returns a session immediately
      if (data.session) {
        setSession(data.session);
        setUser(data.user);
        authService.syncProfile(data.user);
        return;
      }

      // Otherwise, notify that a code was sent
      Alert.alert(
        "Check Your Email",
        "A verification code has been sent to your email. Please check your inbox.",
      );
    },
    onError: (error: any) => {
      Alert.alert(
        "Sign Up Failed",
        error.message || "An error occurred during sign up",
      );
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      authService.verifySignUpOtp(email, token),
    onSuccess: (data) => {
      setSession(data.session);
      setUser(data.user);
      
      // Safety net: ensures user is in the public table
      authService.syncProfile(data.user);

      // Send Welcome and Admin notification emails ONLY AFTER verification
      if (data.user?.email) {
        console.log(data.user.email, "user emil");
        emailService.sendSignUpEmails(data.user.email);
      }

      Alert.alert("Success", "Email verified and account activated!");
    },
    onError: (error: any) => {
      Alert.alert(
        "Verification Failed",
        error.message || "Invalid or expired verification code.",
      );
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setSession(null);
      setUser(null);
      queryClient.clear();
      // Removed router.replace to allow AuthGate autonomous control
    },
    onError: (error: any) => {
      Alert.alert("Logout Failed", error.message || "Error logging out");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    // onSuccess handled natively in UI state now
    onError: (error: any) => {
      Alert.alert("Error", error.message || "Failed to send reset code.");
    },
  });

  const verifyResetOtpMutation = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) =>
      authService.verifyResetOtp(email, token),
    onSuccess: (data) => {
      setSession(data.session);
      Alert.alert("Secure Link Approved", "You can now set a new password.");
      router.push("/reset-password" as any);
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.message || "Verification code is invalid or expired.",
      );
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (password: string) => authService.updatePassword(password),
    onSuccess: () => {
      Alert.alert("Success", "Your password has been reset successfully.");
      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      Alert.alert("Error", error.message || "Failed to update password.");
    },
  });

  const resendVerificationMutation = useMutation({
    mutationFn: (email: string) => authService.resendSignUpOtp(email),
    onSuccess: () => {
      Alert.alert(
        "Code Resent",
        "A new verification code has been sent to your email.",
      );
    },
    onError: (error: any) => {
      Alert.alert(
        "Resend Failed",
        error.message || "Could not resend code. Please try again later.",
      );
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    signUp: signUpMutation.mutate,
    isSigningUp: signUpMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    forgotPassword: forgotPasswordMutation.mutateAsync, // Using async to handle UI transitions locally
    isSendingReset: forgotPasswordMutation.isPending,
    verifyResetOtp: verifyResetOtpMutation.mutate,
    isVerifyingOtp: verifyResetOtpMutation.isPending,
    verifyEmail: verifyEmailMutation.mutate,
    isVerifyingEmail: verifyEmailMutation.isPending,
    resendVerification: resendVerificationMutation.mutate,
    isResendingVerification: resendVerificationMutation.isPending,
    updatePassword: updatePasswordMutation.mutate,
    isUpdatingPassword: updatePasswordMutation.isPending,
  };
};
