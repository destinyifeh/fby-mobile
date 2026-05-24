import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "../store/useAuthStore";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, isInitialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isInitialized) return;
    if (!navigationState?.key) return; // Wait for navigation to safely mount

    const rootSegment = segments[0] as string | undefined;
    const authRoutes = ["auth", "index", "forgot-password"];
    const inAuthGroup = rootSegment ? authRoutes.includes(rootSegment) : true;

    if (!session && !inAuthGroup) {
      router.replace("/auth");
    } else if (session && inAuthGroup) {
      router.replace({ pathname: "/(tabs)", params: { login: "true" } });
    }
  }, [session, isInitialized, segments, navigationState]);

  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f0e8",
        }}
      >
        <ActivityIndicator size="large" color="#b891f7" />
      </View>
    );
  }

  return <>{children}</>;
}
