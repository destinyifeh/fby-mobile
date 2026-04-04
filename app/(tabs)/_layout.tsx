import React from 'react';
import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';

// Import tab icons
const homeIcon = require('@/assets/images/home.png');
const scanIcon = require('@/assets/images/scan.png');
const historyIcon = require('@/assets/images/history.png');
const profileIcon = require('@/assets/images/profile.png');

interface TabBarIconProps {
  focused: boolean;
  icon: any;
}

function TabBarIcon({ focused, icon }: TabBarIconProps) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? '#8D5241' : 'transparent',
      }}
    >
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: '#FFF2DA',
        }}
        resizeMode="contain"
      />
    </View>
  );
}

function TabBarBackground() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(166, 123, 91, 0.5)',
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8D5241',
        tabBarInactiveTintColor: '#8D5241',
        tabBarShowLabel: false,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 77,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          paddingHorizontal: 20,
          paddingTop: 10,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={homeIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={scanIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={historyIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={profileIcon} />
          ),
        }}
      />
    </Tabs>
  );
}
