// authProvider.js - Versão atualizada com logout via API route
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Debug logs
          console.log('Initial session user:', session?.user);
          console.log('User metadata:', session?.user?.user_metadata);
          console.log('User email:', session?.user?.email);
        }
      } catch (error) {
        console.error('Session error:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        console.log('New session user:', session?.user);
        console.log('User metadata:', session?.user?.user_metadata);
        
        if (mounted) {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      // O user será atualizado automaticamente pelo onAuthStateChange
      return { success: true, user: data.user };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Usar a API route para logout
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erro ao fazer logout');
      }

      const result = await response.json();
      
      // O user será limpo automaticamente pelo onAuthStateChange
      // Opcionalmente redirecionar para home
      router.push('/?success=' + encodeURIComponent('Logout realizado com sucesso.'));
      
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, options = {}) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options,
      });
      
      if (error) throw error;
      
      // O user será atualizado automaticamente pelo onAuthStateChange
      return { success: true, user: data.user, session: data.session };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup,
    // Métodos úteis adicionais
    isAuthenticated: !!user,
    userEmail: user?.email,
    userMetadata: user?.user_metadata,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}