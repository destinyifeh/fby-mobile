import { supabase } from './supabase';
import { LoginFormValues, SignUpFormValues } from '@/lib/validations/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export const authService = {
  login: async (credentials: LoginFormValues) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) throw error;
    return data;
  },

  signUp: async (credentials: SignUpFormValues) => {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          username: credentials.username,
          dob: credentials.dateOfBirth,
        },
      },
    });
    if (error) throw error;
    return data;
  },

  forgotPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  },

  verifyResetOtp: async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'recovery',
    });
    if (error) throw error;
    return data;
  },
  
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    if (error) throw error;
    return data;
  },
  
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  signInWithSocial: async (provider: 'google' | 'facebook' | 'apple') => {
    // Generates exp:// (Expo Go) or fbymobile:// (Production) natively
    const redirectUrl = Linking.createURL(''); 

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      }
    });

    if (error) throw error;
    return { data, redirectUrl };
  }
};
