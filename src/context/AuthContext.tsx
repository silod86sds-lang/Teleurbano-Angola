import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isPremium: boolean;
  createdAt?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthReady: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user", e);
      }
    }
    setIsAuthReady(true);
  }, []);

  const login = async (email: string, password?: string) => {
    let mockUser: User;

    if (email === 'Teleurbano@admnistra' && password === '1992') {
      mockUser = {
        id: 'admin-' + Date.now(),
        name: 'Administrador',
        email: email,
        role: 'admin',
        isPremium: true,
        createdAt: Date.now(),
      };
    } else {
      mockUser = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'user',
        isPremium: false,
        createdAt: Date.now(),
      };
    }
    
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  const upgradeToPremium = async () => {
    if (user) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem('mock_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthReady, login, logout, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

