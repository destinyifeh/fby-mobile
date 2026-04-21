import { LoginFormValues, SignUpFormValues } from "@/lib/validations/auth";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "./supabase";

WebBrowser.maybeCompleteAuthSession();

export const authService = {
  login: async (credentials: LoginFormValues) => {
    // 1. Try to log in directly first (this handles auth-only users)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      const msg = error.message.toLowerCase();
      
      if (msg.includes("invalid login credentials")) {
        // If credentials fail, check if the email exists in our records to give a better message
        const { data: userRecord } = await supabase
          .from("users")
          .select("id")
          .eq("email", credentials.email)
          .maybeSingle();

        if (!userRecord) {
          throw new Error("No account found with this email. Please sign up.");
        }
        throw new Error("Incorrect password. Please try again.");
      }

      if (msg.includes("email not confirmed")) {
        throw new Error("Your email is not verified. Please check your inbox or verify your account to continue.");
      }
      throw error;
    }
    return data;
  },

  checkUsernameAvailability: async (username: string) => {
    const { data } = await supabase
      .from("users")
      .select("display_name")
      .eq("display_name", username)
      .maybeSingle();

    return !data;
  },

  signUp: async (credentials: SignUpFormValues) => {
    // 1. Check if username is taken in our public table
    const { data: existingUsername } = await supabase
      .from("users")
      .select("display_name")
      .eq("display_name", credentials.username)
      .maybeSingle();

    if (existingUsername) {
      throw new Error("This username is already taken. Please choose another.");
    }

    // 2. Proceed with signUp
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

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("already registered") || msg.includes("already exists")) {
        throw new Error("An account with this email already exists. Please login instead.");
      }
      throw error;
    }
    return data;
  },

  verifySignUpOtp: async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "signup",
    });
    if (error) throw error;
    return data;
  },

  resendSignUpOtp: async (email: string) => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email,
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
      type: "recovery",
    });
    if (error) throw error;
    return data;
  },

  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
    return data;
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  signInWithSocial: async (provider: "google" | "facebook" | "apple") => {
    // Generates exp:// (Expo Go) or fbymobile:// (Production) natively
    const redirectUrl = Linking.createURL("");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) throw error;
    return { data, redirectUrl };
  },

  /**
   * Manually syncs an auth user to the public.users table.
   * acts as a safety net if the database trigger fails.
   */
  syncProfile: async (user: any) => {
    if (!user) return;

    const { error } = await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      display_name: user.user_metadata?.username || user.user_metadata?.full_name || "User",
      dob: user.user_metadata?.dob,
    }, { onConflict: 'id' });

    if (error) {
      console.error("Sync Profile Error:", error);
    }
  },
};
