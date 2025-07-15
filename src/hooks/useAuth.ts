import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseclient';

export interface User {
  id: string;
  email: string;
  avatar?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the current session when app starts
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`
        });
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? '',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        });
      } else {
        setUser(null);
      }
    });

    // Unsubscribe on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return {
    user,
    loading,
    isAuthenticated,
    signIn,
    signOut,
  };
};
