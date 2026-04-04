import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChatAnimation } from '@/components/chat';
import { Button } from '@/components/ui';

const fbyLogo = require('@/assets/images/fby-logo.png');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF2DA' }}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo - positioned left */}
          <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 8 }}>
            <Image
              source={fbyLogo}
              style={{ width: 140, height: 36 }}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <Text
            style={{
              fontFamily: 'Inter_600SemiBold',
              fontSize: 20,
              color: '#373737',
              marginBottom: 16,
            }}
          >
            AI powered MUA assistant
          </Text>

          {/* Chat Animation */}
          <View style={{ marginBottom: 16 }}>
            <ChatAnimation />
          </View>

          {/* CTA Card */}
          <View
            style={{
              backgroundColor: '#FFF2DA',
              width: '100%',
              maxWidth: 307,
              borderRadius: 20,
              paddingHorizontal: 28,
              paddingVertical: 16,
              alignItems: 'center',
              shadowColor: '#8D5241',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                fontSize: 16,
                color: '#373737',
                marginBottom: 16,
              }}
            >
              #BecomeYourOwnMUA
            </Text>

            <Button
              title="Let's get started"
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleGetStarted}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
