import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  isInitialized: boolean;
  preferences: {
    theme?: string;
    notificationsEnabled?: boolean;
  };
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  updatePreferences: (prefs: Partial<AuthState["preferences"]>) => void;
  setInitialized: (initialized: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      isInitialized: false,
      preferences: {
        notificationsEnabled: true,
      },
      setSession: (session) => set({ session, user: session?.user ?? null }),
      setUser: (user) => set({ user }),
      updatePreferences: (prefs) => 
        set((state) => ({ preferences: { ...state.preferences, ...prefs } })),
      setInitialized: (isInitialized) => set({ isInitialized }),
      clearAuth: () => set({ session: null, user: null }),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => AsyncStorage), 
      partialize: (state) => ({
        // We persist preferences with AsyncStorage.
        // Session itself is already persisted securely by Supabase.
        preferences: state.preferences
      }),
    }
  )
);
