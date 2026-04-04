import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 bg-cream items-center justify-center px-6">
        <Text className="font-inter-semibold text-2xl text-primary-brown mb-2">
          Page Not Found
        </Text>
        <Text className="font-inter text-base text-primary-brown-light text-center mb-6">
          The page you're looking for doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Button title="Go to Home" variant="primary" size="lg" />
        </Link>
      </View>
    </>
  );
}
