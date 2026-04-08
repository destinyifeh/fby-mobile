import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

// SecureStore has a 2048 byte limit per key on Android.
// We implement a chunking strategy to handle larger Supabase sessions securely.
const MAX_CHUNK_SIZE = 2000;

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    try {
      // First, check for a "manifest" which tells us how many chunks we have
      const manifest = await SecureStore.getItemAsync(`${key}_manifest`);
      if (!manifest) {
        // Fallback to single item if no manifest (backward compatibility)
        return await SecureStore.getItemAsync(key);
      }

      const { count } = JSON.parse(manifest);
      let fullValue = "";
      for (let i = 0; i < count; i++) {
        const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
        if (!chunk) return null;
        fullValue += chunk;
      }
      return fullValue;
    } catch (e) {
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      // If the value is small, just store it normally
      if (value.length <= MAX_CHUNK_SIZE) {
        await SecureStore.deleteItemAsync(`${key}_manifest`); // Cleanup any old manifest
        return await SecureStore.setItemAsync(key, value);
      }

      // If large, chunk it
      const chunks = [];
      for (let i = 0; i < value.length; i += MAX_CHUNK_SIZE) {
        chunks.push(value.slice(i, i + MAX_CHUNK_SIZE));
      }

      // Store chunks
      for (let i = 0; i < chunks.length; i++) {
        await SecureStore.setItemAsync(`${key}_chunk_${i}`, chunks[i]);
      }

      // Store manifest to keep track of chunk count
      await SecureStore.setItemAsync(
        `${key}_manifest`,
        JSON.stringify({ count: chunks.length })
      );
      
      // Cleanup the original single key if it exists
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error("Storage Error:", e);
    }
  },

  removeItem: async (key: string) => {
    // Delete potential manifest and chunks
    const manifest = await SecureStore.getItemAsync(`${key}_manifest`);
    if (manifest) {
      const { count } = JSON.parse(manifest);
      for (let i = 0; i < count; i++) {
        await SecureStore.deleteItemAsync(`${key}_chunk_${i}`);
      }
      await SecureStore.deleteItemAsync(`${key}_manifest`);
    }
    // Delete standard key
    await SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
