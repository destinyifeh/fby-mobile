import React, { useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, isInitialized } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isInitialized) return;
    if (!navigationState?.key) return; // Wait for navigation to safely mount

    const rootSegment = segments[0] as string | undefined;
    const authRoutes = ['auth', 'index', 'forgot-password'];
    const inAuthGroup = rootSegment ? authRoutes.includes(rootSegment) : true;
    
    if (!session && !inAuthGroup) {
      router.replace('/auth');
    } else if (session && inAuthGroup) {
      router.replace({ pathname: '/(tabs)', params: { login: 'true' } });
    }
  }, [session, isInitialized, segments, navigationState]);

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF2DA' }}>
        <ActivityIndicator size="large" color="#8D5241" />
      </View>
    );
  }

  return <>{children}</>;
}
