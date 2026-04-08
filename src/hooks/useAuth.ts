import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../api/auth/authService';
import { useAuthStore } from '../store/useAuthStore';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LoginFormValues, SignUpFormValues } from '@/lib/validations/auth';
import { emailService } from '../api/email/emailService';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setSession, setUser } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormValues) => authService.login(credentials),
    onSuccess: (data) => {
      setSession(data.session);
      setUser(data.user);
      // Removed router.replace to allow AuthGate autonomous control
    },
    onError: (error: any) => {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpFormValues) => authService.signUp(credentials),
    onSuccess: (data) => {
      setSession(data.session);
      setUser(data.user);

      // Send Welcome and Admin notification emails
      if (data.user?.email) {
        emailService.sendSignUpEmails(data.user.email);
      }

      Alert.alert('Success', 'Account created successfully!');
      // Removed router.replace to allow AuthGate autonomous control
    },
    onError: (error: any) => {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred during sign up');
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
      Alert.alert('Logout Failed', error.message || 'Error logging out');
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    // onSuccess handled natively in UI state now
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to send reset code.');
    },
  });

  const verifyResetOtpMutation = useMutation({
    mutationFn: ({ email, token }: { email: string; token: string }) => authService.verifyResetOtp(email, token),
    onSuccess: (data) => {
      setSession(data.session);
      Alert.alert('Secure Link Approved', 'You can now set a new password.');
      router.push('/reset-password' as any);
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Verification code is invalid or expired.');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (password: string) => authService.updatePassword(password),
    onSuccess: () => {
      Alert.alert('Success', 'Your password has been reset successfully.');
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to update password.');
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
    updatePassword: updatePasswordMutation.mutate,
    isUpdatingPassword: updatePasswordMutation.isPending,
  };
};
