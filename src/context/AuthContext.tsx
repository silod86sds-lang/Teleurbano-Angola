import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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
  login: () => Promise<void>;
  logout: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({ id: firebaseUser.uid, ...userDoc.data() } as User);
          } else {
            // Check if default admin
            const isDefaultAdmin = firebaseUser.email === 'silod86.sds@gmail.com' && firebaseUser.emailVerified;
            
            const newUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email || '',
              role: isDefaultAdmin ? 'admin' : 'user',
              isPremium: false,
              createdAt: Date.now(),
            };
            
            // Save to Firestore
            const { id, ...userData } = newUser;
            await setDoc(userDocRef, userData);
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const upgradeToPremium = async () => {
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.id);
        await updateDoc(userDocRef, { isPremium: true });
        setUser({ ...user, isPremium: true });
      } catch (error) {
        console.error("Error upgrading to premium:", error);
        throw error;
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
