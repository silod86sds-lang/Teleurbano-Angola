import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role?: Role) => void;
  logout: () => void;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, User> = {
  'admin@webtv.com': { id: '1', name: 'Admin User', email: 'admin@webtv.com', role: 'admin', isPremium: true },
  'user@webtv.com': { id: '2', name: 'Regular User', email: 'user@webtv.com', role: 'user', isPremium: false },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('webtv_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('webtv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('webtv_user');
    }
  }, [user]);

  const login = (email: string, role: Role = 'user') => {
    if (MOCK_USERS[email]) {
      setUser(MOCK_USERS[email]);
    } else {
      // Create a new mock user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        isPremium: false,
      };
      setUser(newUser);
    }
  };

  const logout = () => setUser(null);

  const upgradeToPremium = () => {
    if (user) {
      setUser({ ...user, isPremium: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToPremium }}>
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
