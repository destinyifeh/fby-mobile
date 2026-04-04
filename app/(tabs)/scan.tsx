import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, ScoreCard } from '@/components/ui';

// Mock data for score categories
const SCORE_CATEGORIES = [
  { id: '1', name: 'Contour', score: 66 },
  { id: '2', name: 'Blend Quality', score: 71 },
  { id: '3', name: 'Foundation', score: 79 },
  { id: '4', name: 'Base Finish', score: 71 },
  { id: '5', name: 'Symmetry', score: 88 },
  { id: '6', name: 'Color Balance', score: 63 },
];

// Mock tips data
const ANALYSIS_TIPS = [
  { id: '1', text: 'Your blush looks amazing', type: 'positive' as const },
  { id: '2', text: 'Try lining your lips more', type: 'suggestion' as const },
  { id: '3', text: "This worked well, but isn't blended properly", type: 'suggestion' as const },
];

export default function ScanScreen() {
  const router = useRouter();
  const [hasScanned, setHasScanned] = useState(false);
  const [showResults, setShowResults] = useState(true); // For demo, show results

  const handleStartScan = () => {
    // TODO: Implement camera scan
    setHasScanned(true);
    setShowResults(true);
  };

  const handleViewFullAnalysis = () => {
    // TODO: Navigate to full analysis screen
    console.log('View full analysis');
  };

  if (!showResults) {
    return (
      <View className="flex-1 bg-cream">
        <StatusBar style="dark" />
        <SafeAreaView className="flex-1 items-center justify-center px-6">
          <Text className="font-inter-semibold text-2xl text-primary-brown mb-4">
            Scan & score
          </Text>
          <Text className="font-inter text-base text-primary-brown-light text-center mb-8">
            Position your face in the frame and tap to scan
          </Text>
          <Button
            title="Start Scan"
            variant="primary"
            size="lg"
            onPress={handleStartScan}
            icon={<Ionicons name="camera-outline" size={20} color="#FFF2DA" />}
          />
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      {/* Background gradient */}
      <LinearGradient
        colors={['rgba(255,242,218,0.8)', 'rgba(249,188,153,0.8)']}
        locations={[0.2, 0.9]}
        className="absolute inset-0"
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* Header */}
        <View className="flex-row items-center px-5 py-3">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#8D5241" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="font-inter-semibold text-2xl text-primary-brown">
              Scan & score
            </Text>
          </View>
          <View className="w-6" />
        </View>

        {/* Detected Look Badge */}
        <View className="items-center mb-2">
          <View className="bg-accent-pink-medium rounded-full px-4 py-1.5">
            <Text className="font-inter-semibold text-xs text-primary-brown">
              Detected look is full glam
            </Text>
          </View>
        </View>

        {/* Face Image with Tips */}
        <View className="flex-1 items-center justify-center relative">
          {/* Placeholder for face image */}
          <View className="w-[250px] h-[300px] rounded-[20px] overflow-hidden">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400' }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Analysis Tips - positioned around the image */}
          <View className="absolute left-4 top-1/3 bg-accent-pink-light rounded-lg px-2 py-1.5 max-w-[80px]">
            <Text className="font-inter text-[10px] text-primary-brown">
              Your blush looks amazing
            </Text>
          </View>

          <View className="absolute right-4 top-1/4 bg-accent-pink-light rounded-lg px-2 py-1.5 max-w-[100px]">
            <Text className="font-inter text-[10px] text-accent-pink">
              This worked well, but isn't blended properly
            </Text>
          </View>

          <View className="absolute right-8 bottom-1/3 bg-accent-pink-light rounded-lg px-2 py-1.5 max-w-[72px]">
            <Text className="font-inter text-[10px] text-primary-brown text-center">
              Try lining your lips more
            </Text>
          </View>
        </View>

        {/* Results Panel */}
        <View
          className="bg-primary-brown-light rounded-t-[20px] px-5 pt-6 pb-8"
          style={{
            shadowColor: '#8D5241',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          {/* Score Categories Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3 mb-5">
            {SCORE_CATEGORIES.map((category) => (
              <View
                key={category.id}
                className="
                  bg-accent-pink-light
                  border border-cream
                  rounded-xl
                  h-[59px]
                  w-[48%]
                  flex-row
                  items-center
                  px-2
                "
              >
                <View className="w-10 h-10 rounded-full bg-accent-tan items-center justify-center mr-2">
                  <View className="w-8 h-8 rounded-full bg-cream" />
                </View>
                <View className="flex-1">
                  <Text className="text-cream font-inter-medium text-sm">
                    {category.name}
                  </Text>
                  <Text className="text-cream font-inter-semibold text-sm">
                    {category.score}%
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* View Full Analysis Button */}
          <Button
            title="View full Analysis"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleViewFullAnalysis}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
