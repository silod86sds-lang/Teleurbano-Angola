import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isPremium: boolean;
  premiumUntil?: number; // Timestamp for when premium expires
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
        const parsedUser = JSON.parse(storedUser) as User;
        
        // Check if premium has expired (1 month = 30 days = 2592000000 ms)
        if (parsedUser.isPremium && parsedUser.role !== 'admin' && parsedUser.premiumUntil) {
          if (Date.now() > parsedUser.premiumUntil) {
            parsedUser.isPremium = false;
            parsedUser.premiumUntil = undefined;
            localStorage.setItem('mock_user', JSON.stringify(parsedUser));
            
            // Also update in the global mock users list if it exists
            const allUsersStr = localStorage.getItem('all_mock_users');
            if (allUsersStr) {
              const allUsers = JSON.parse(allUsersStr);
              const updatedAllUsers = allUsers.map((u: User) => 
                u.id === parsedUser.id ? parsedUser : u
              );
              localStorage.setItem('all_mock_users', JSON.stringify(updatedAllUsers));
            }
          }
        }
        
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing stored user", e);
      }
    }
    setIsAuthReady(true);
  }, []);

  const login = async (email: string, password?: string) => {
    let mockUser: User;

    // Check if user already exists in all_mock_users
    const allUsersStr = localStorage.getItem('all_mock_users');
    let allUsers: User[] = allUsersStr ? JSON.parse(allUsersStr) : [];
    
    const existingUser = allUsers.find(u => u.email === email);

    if (email === 'Teleurbano@admnistra' && password === '1992') {
      mockUser = existingUser || {
        id: 'admin-' + Date.now(),
        name: 'Administrador',
        email: email,
        role: 'admin',
        isPremium: true,
        createdAt: Date.now(),
      };
    } else {
      mockUser = existingUser || {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: 'user',
        isPremium: false,
        createdAt: Date.now(),
      };
    }
    
    // Save to all_mock_users if new
    if (!existingUser) {
      allUsers.push(mockUser);
      localStorage.setItem('all_mock_users', JSON.stringify(allUsers));
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
      // 30 days from now
      const premiumUntil = Date.now() + (30 * 24 * 60 * 60 * 1000);
      const updatedUser = { ...user, isPremium: true, premiumUntil };
      setUser(updatedUser);
      localStorage.setItem('mock_user', JSON.stringify(updatedUser));
      
      // Update in all_mock_users
      const allUsersStr = localStorage.getItem('all_mock_users');
      if (allUsersStr) {
        const allUsers = JSON.parse(allUsersStr);
        const updatedAllUsers = allUsers.map((u: User) => 
          u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem('all_mock_users', JSON.stringify(updatedAllUsers));
      }
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

