import { useEffect } from 'react';
import { supabase } from '../api/auth/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setSession, setInitialized } = useAuthStore();
  const router = useRouter();

  const handleDeepLink = async (url: string | null) => {
    try {
      if (!url) return;
      
      // Intercept implicit tokens from Supabase deep link URL hash
      const hash = url.split('#')[1];
      if (hash) {
        // Quick extraction to gracefully prevent Regex/Hermes mismatch
        const params: Record<string, string> = {};
        hash.split('&').forEach(pair => {
            const [key, value] = pair.split('=');
            params[key] = value;
        });

        if (params.access_token && params.refresh_token) {
          await supabase.auth.setSession({
            access_token: params.access_token,
            refresh_token: params.refresh_token,
          });
          
          // Secure React Native bypass for PASSWORD_RECOVERY since we parse tokens manually
          if (params.type === 'recovery') {
            router.push('/reset-password' as any);
          }
        }
      }
    } catch (e) {
      console.warn("Auth parse error:", e);
    }
  };

  useEffect(() => {
    // Wrap getSession securely to guarantee AuthGate releases
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.warn("Session check failed:", error);
      } finally {
        setInitialized(true);
      }
    };
    
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      
      if (event === 'PASSWORD_RECOVERY') {
        router.push('/reset-password' as any);
      }
    });

    // Native App Lifecycle interception
    Linking.getInitialURL().then(handleDeepLink);
    const linkingSub = Linking.addEventListener('url', (e) => handleDeepLink(e.url));

    return () => {
      subscription.unsubscribe();
      linkingSub.remove();
    };
  }, []);

  return <>{children}</>;
}
