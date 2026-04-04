import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '@/components/ui';

interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
  danger?: boolean;
}

function ProfileMenuItem({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  danger = false,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-accent-tan-light"
      activeOpacity={0.7}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          danger ? 'bg-red-100' : 'bg-accent-tan-light'
        }`}
      >
        <Ionicons
          name={icon}
          size={20}
          color={danger ? '#EF4444' : '#8D5241'}
        />
      </View>
      <View className="flex-1 ml-3">
        <Text
          className={`font-inter-medium text-base ${
            danger ? 'text-red-500' : 'text-primary-brown'
          }`}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="font-inter text-sm text-primary-brown-light">
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <Ionicons name="chevron-forward" size={20} color="#A67B5B" />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const userName = 'Tina Johnson';
  const userEmail = 'tina.johnson@email.com';
  const makeupScore = 64;

  const handleLogout = () => {
    // TODO: Implement logout logic
    router.replace('/auth');
  };

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center pt-6 pb-4 px-6">
            <Avatar size="xl" name={userName} />
            <Text className="font-inter-semibold text-xl text-primary-brown mt-3">
              {userName}
            </Text>
            <Text className="font-inter text-sm text-primary-brown-light mt-0.5">
              {userEmail}
            </Text>

            {/* Score Badge */}
            <View className="mt-3 bg-accent-tan-light rounded-full px-4 py-1.5">
              <Text className="font-inter-semibold text-sm text-primary-brown">
                Makeup Score: {makeupScore}%
              </Text>
            </View>
          </View>

          {/* Menu Items */}
          <View className="px-6 mt-4">
            <ProfileMenuItem
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => console.log('Edit Profile')}
            />
            <ProfileMenuItem
              icon="images-outline"
              title="My Looks"
              subtitle="View all your saved looks"
              onPress={() => console.log('My Looks')}
            />
            <ProfileMenuItem
              icon="bar-chart-outline"
              title="Progress History"
              subtitle="Track your makeup improvement"
              onPress={() => console.log('Progress History')}
            />
            <ProfileMenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => console.log('Notifications')}
            />
            <ProfileMenuItem
              icon="settings-outline"
              title="Settings"
              subtitle="App settings and preferences"
              onPress={() => console.log('Settings')}
            />
            <ProfileMenuItem
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="FAQs and contact support"
              onPress={() => console.log('Help & Support')}
            />
            <ProfileMenuItem
              icon="log-out-outline"
              title="Logout"
              onPress={handleLogout}
              showArrow={false}
              danger
            />
          </View>

          {/* App Version */}
          <View className="items-center mt-8">
            <Text className="font-inter text-xs text-primary-brown-light">
              Face By You v1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
