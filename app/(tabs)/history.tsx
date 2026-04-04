import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from '@/components/ui';

// Mock history data
const HISTORY_ITEMS = [
  {
    id: '1',
    lookName: 'Full glam',
    date: 'April 3rd',
    score: 78,
    image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=200',
  },
  {
    id: '2',
    lookName: 'Soft glam',
    date: 'April 3rd',
    score: 80,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200',
  },
  {
    id: '3',
    lookName: 'Soft glam',
    date: 'April 3rd',
    score: 80,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200',
  },
];

interface HistoryCardProps {
  item: {
    id: string;
    lookName: string;
    date: string;
    score: number;
    image: string;
  };
  onPress?: () => void;
}

function HistoryCard({ item, onPress }: HistoryCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="
        bg-accent-tan
        rounded-xl
        h-[76px]
        flex-row
        items-center
        px-1.5
        mb-3
      "
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {/* Image */}
      <View className="w-[65px] h-[64px] rounded-lg overflow-hidden">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="flex-1 ml-3">
        <Text className="font-inter-semibold text-xl text-primary-brown">
          {item.lookName}
        </Text>
        <Text className="font-inter text-base text-primary-brown-light mt-1">
          {item.date}
        </Text>
      </View>

      {/* Score */}
      <Text className="font-inter-semibold text-xl text-primary-brown-light mr-2">
        {item.score}
      </Text>
    </TouchableOpacity>
  );
}

export default function HistoryScreen() {
  const avgScore = 64;
  const lastScore = 75;
  const lastScoreDate = '2 days ago';

  return (
    <View className="flex-1 bg-cream">
      <StatusBar style="dark" />
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Avatar and Score Badge */}
          <View className="flex-row items-center mt-4">
            <Avatar size="md" name="User" />
            <View className="ml-3 bg-accent-tan-light rounded-full px-4 py-1.5">
              <Text className="font-inter-semibold text-xs text-primary-brown">
                Avg Make up score:{avgScore}%
              </Text>
            </View>
          </View>

          {/* Last Score Card */}
          <View className="mt-6">
            <LinearGradient
              colors={['rgba(141, 82, 65, 0.2)', 'rgba(255, 242, 218, 0.2)', 'rgba(166, 123, 91, 0.2)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              className="rounded-[20px] h-[138px] overflow-hidden"
              style={{
                shadowColor: '#8D5241',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.42,
                shadowRadius: 4,
                elevation: 6,
              }}
            >
              <View className="flex-row h-full">
                {/* Left Content */}
                <View className="flex-1 px-8 py-4 justify-between">
                  <Text className="font-inter text-xs text-primary-brown">
                    Last Make up score:
                  </Text>
                  <Text className="font-inter-semibold text-[40px] text-primary-brown">
                    {lastScore}%
                  </Text>
                  <Text className="font-inter text-xs text-primary-brown-light">
                    Last score: {lastScoreDate}
                  </Text>
                </View>

                {/* Right Image */}
                <View className="w-[132px] h-[136px] rounded-lg overflow-hidden">
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300' }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {/* View Details Badge */}
                  <View className="absolute bottom-2 right-2 bg-accent-tan-medium rounded-full px-3 py-1.5">
                    <Text className="font-inter text-xs text-cream">
                      view full details
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* History List */}
          <View className="mt-6">
            {HISTORY_ITEMS.map((item) => (
              <HistoryCard
                key={item.id}
                item={item}
                onPress={() => console.log('View details:', item.lookName)}
              />
            ))}
          </View>

          {/* Daily Tip */}
          <Text className="font-inter-semibold text-sm text-primary-brown-light mt-4 px-2">
            Daily tips: Blend upward for a lifted effect
          </Text>

          {/* See Overall Analysis Button */}
          <View className="items-center mt-6">
            <TouchableOpacity
              className="bg-primary-brown rounded-full px-8 py-3.5"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.18,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Text className="font-abhaya-extrabold text-base text-cream">
                See Overall analysis
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
