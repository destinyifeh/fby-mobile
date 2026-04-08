import { useMutation } from '@tanstack/react-query';
import { authService } from '../api/auth/authService';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'expo-router';
import { supabase } from '../api/auth/supabase';

export const useSocialAuth = () => {
  const router = useRouter();
  const { setSession } = useAuthStore();

  const socialLoginMutation = useMutation({
    mutationFn: async (provider: 'google' | 'facebook' | 'apple') => {
      const { data, redirectUrl } = await authService.signInWithSocial(provider);
      
      if (data?.url) {
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
        
        if (result.type === 'success' && result.url) {
            const hash = result.url.split('#')[1];
            if (hash) {
                const params: Record<string, string> = {};
                hash.split('&').forEach(pair => {
                    const [key, value] = pair.split('=');
                    params[key] = value;
                });
                
                if (params.access_token && params.refresh_token) {
                    await supabase.auth.setSession({
                        access_token: params.access_token,
                        refresh_token: params.refresh_token
                    });
                }
            }
        }
      }
      return data;
    },
    onError: (error: any) => {
      Alert.alert('Login Failed', error.message || 'Could not authenticate via provider');
    },
  });

  return {
    loginWithProvider: socialLoginMutation.mutate,
    isLoggingIn: socialLoginMutation.isPending,
  };
};
