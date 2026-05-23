import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Import tab icons
const homeIcon = require("@/assets/images/home.png");
const scanIcon = require("@/assets/images/scan.png");
const historyIcon = require("@/assets/images/history.png");
const profileIcon = require("@/assets/images/profile.png");

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
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: focused ? "#b891f7" : "transparent",
      }}
    >
      <Image
        source={icon}
        style={{
          width: 25,
          height: 25,
          //tintColor: focused ? "#f4f0e8" : "#737080",
          tintColor: focused ? "#f4f0e8" : "#f4f0e8",
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
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#737080",
        borderTopLeftRadius: 52,
        borderTopRightRadius: 52,
      }}
    />
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#b891f7",
        //tabBarInactiveTintColor: "#737080",
        tabBarShowLabel: false,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          left: 20,
          right: 20,
          bottom: insets.bottom + 0,
          height: 70,
          //height: 95,
          backgroundColor: "transparent",
          borderTopWidth: 0,
          paddingHorizontal: 20,
          paddingTop: 15,
          // paddingTop: 10,
          //paddingBottom: 25,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={homeIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={scanIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={historyIcon} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={profileIcon} />
          ),
        }}
      />
    </Tabs>
  );
}
