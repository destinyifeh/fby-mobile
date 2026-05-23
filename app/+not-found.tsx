import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { Button } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 bg-v2-bg-base items-center justify-center px-6">
        <Text className="font-inter-semibold text-2xl text-v2-text-body mb-2">
          Page Not Found
        </Text>
        <Text className="font-inter text-base text-v2-text-muted text-center mb-6">
          The page you're looking for doesn't exist.
        </Text>
        <Link href="/" asChild>
          <Button title="Go to Home" variant="primary" size="lg" />
        </Link>
      </View>
    </>
  );
}
