import {
  AbhayaLibre_400Regular,
  AbhayaLibre_500Medium,
  AbhayaLibre_600SemiBold,
  AbhayaLibre_700Bold,
  AbhayaLibre_800ExtraBold,
} from "@expo-google-fonts/abhaya-libre";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Image, View } from "react-native";
import "react-native-reanimated";


import "../global.css";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom theme matching Face By You design
const FaceByYouTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#8D5241",
    background: "#FFF2DA",
    card: "#FFF2DA",
    text: "#8D5241",
    border: "rgba(0, 0, 0, 0.12)",
    notification: "#8D5241",
  },
};

const fbyLogo = require("../assets/images/fby-logo.png");

export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    // Inter fonts
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    // Abhaya Libre fonts
    AbhayaLibre_400Regular,
    AbhayaLibre_500Medium,
    AbhayaLibre_600SemiBold,
    AbhayaLibre_700Bold,
    AbhayaLibre_800ExtraBold,
    ...FontAwesome.font,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      // Hide native splash immediately when fonts are loaded
      SplashScreen.hideAsync();
      
      // Delay transition to main app for brand presence
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || !isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF2DA", alignItems: "center", justifyContent: "center" }}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Image
            source={fbyLogo}
            style={{ width: 240, height: 60 }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeIn.duration(500)}>
      <RootLayoutNav />
    </Animated.View>
  );
}


function RootLayoutNav() {
  return (
    <ThemeProvider value={FaceByYouTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="auth"
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
