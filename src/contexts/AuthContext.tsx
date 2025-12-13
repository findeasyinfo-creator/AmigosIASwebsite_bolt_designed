'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';
import { AuthUser } from '@/types/api.types';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const response = await api.auth.getMe();
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('auth_token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);
    localStorage.setItem('auth_token', response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    api.auth.logout();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
