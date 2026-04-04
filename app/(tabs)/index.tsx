import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, LookCard } from '@/components/ui';

// Placeholder images - in production these would come from an API
const RECENT_LOOKS = [
  { id: '1', name: 'Full glam', image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=200' },
  { id: '2', name: 'Soft glam', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200' },
  { id: '3', name: 'Soft glam', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200' },
];

export default function HomeScreen() {
  const router = useRouter();
  const userName = 'Tina';
  const makeupScore = 64;

  const handleScoreYourLook = () => {
    router.push('/take-picture');
  };

  const handleViewMore = () => {
    router.push('/(tabs)/history');
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
          <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
            <View className="flex-row items-center">
              <Avatar size="md" name={userName} />
              <View
                className="ml-3 bg-accent-tan-light rounded-full px-3 py-1.5"
              >
                <Text className="font-inter-semibold text-xs text-primary-brown">
                  Make up score:{makeupScore}%
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/notifications')}>
              <Ionicons name="notifications-outline" size={24} color="#8D5241" />
            </TouchableOpacity>
          </View>

          {/* Greeting */}
          <View className="px-6 mt-4">
            <Text className="font-inter text-2xl text-primary-brown">
              Hello <Text className="font-inter-semibold">{userName}</Text>,
            </Text>
            <Text className="font-inter text-base text-primary-brown-light mt-1">
              Ready for today's glam check?
            </Text>
          </View>

          {/* Camera Score Section */}
          <View className="mx-6 mt-6">
            <View
              className="
                bg-accent-tan
                border-2 border-accent-pink
                rounded-[20px]
                h-[318px]
                items-center
                justify-center
              "
            >
              {/* Camera viewfinder corners */}
              <View className="w-[173px] h-[160px] items-center justify-center">
                {/* Top left corner */}
                <View className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary-brown-light" />
                {/* Top right corner */}
                <View className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary-brown-light" />
                {/* Bottom left corner */}
                <View className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary-brown-light" />
                {/* Bottom right corner */}
                <View className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary-brown-light" />
              </View>

              {/* Score Button */}
              <TouchableOpacity
                onPress={handleScoreYourLook}
                className="
                  mt-6
                  bg-primary-brown
                  rounded-full
                  px-6 py-3
                  flex-row items-center
                "
              >
                <Ionicons name="camera-outline" size={20} color="#FFF2DA" />
                <Text className="ml-2 font-abhaya-extrabold text-base text-cream">
                  Score your look
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Looks Section */}
          <View className="mx-6 mt-6">
            <View
              className="bg-accent-tan rounded-[20px] px-5 pt-4 pb-5"
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="font-inter-semibold text-xl text-primary-brown">
                  Recent Looks
                </Text>
                <TouchableOpacity onPress={handleViewMore}>
                  <Text className="font-inter text-xs text-primary-brown-light">
                    View more
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Looks Grid */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}
              >
                {RECENT_LOOKS.map((look) => (
                  <LookCard
                    key={look.id}
                    name={look.name}
                    image={look.image}
                    onPress={() => console.log('Look pressed:', look.name)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
