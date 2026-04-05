import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  isPremium: boolean;
  createdAt: number;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  author: string;
}

export interface LiveStream {
  isLive: boolean;
  title: string;
  description: string;
  url: string;
}

interface DataContextType {
  videos: Video[];
  notices: Notice[];
  liveStream: LiveStream;
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => Promise<void>;
  deleteNotice: (id: string) => Promise<void>;
  updateLiveStream: (data: Partial<LiveStream>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, user: any) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: user?.id,
      email: user?.email,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [liveStream, setLiveStream] = useState<LiveStream>({
    isLive: true,
    title: 'TELEURBANO ANGOLA Ao Vivo',
    description: 'Acompanhe a nossa programação ao vivo.',
    url: 'https://vdo.ninja/?view=W9kTD5t',
  });
  
  const { isAuthReady, user } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;

    const qVideos = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubVideos = onSnapshot(qVideos, (snapshot) => {
      const vids: Video[] = [];
      snapshot.forEach((doc) => {
        vids.push({ id: doc.id, ...doc.data() } as Video);
      });
      setVideos(vids);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'videos', user);
    });

    const qNotices = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
    const unsubNotices = onSnapshot(qNotices, (snapshot) => {
      const nots: Notice[] = [];
      snapshot.forEach((doc) => {
        nots.push({ id: doc.id, ...doc.data() } as Notice);
      });
      setNotices(nots);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notices', user);
    });

    const liveRef = doc(db, 'settings', 'liveStream');
    const unsubLive = onSnapshot(liveRef, (docSnap) => {
      if (docSnap.exists()) {
        setLiveStream(docSnap.data() as LiveStream);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/liveStream', user);
    });

    return () => {
      unsubVideos();
      unsubNotices();
      unsubLive();
    };
  }, [isAuthReady, user]);

  const addVideo = async (video: Omit<Video, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'videos'), {
        ...video,
        createdAt: Date.now(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'videos', user);
    }
  };

  const deleteVideo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'videos', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `videos/${id}`, user);
    }
  };

  const addNotice = async (notice: Omit<Notice, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'notices'), {
        ...notice,
        createdAt: Date.now(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'notices', user);
    }
  };

  const deleteNotice = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notices', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `notices/${id}`, user);
    }
  };

  const updateLiveStream = async (data: Partial<LiveStream>) => {
    try {
      const liveRef = doc(db, 'settings', 'liveStream');
      await setDoc(liveRef, { ...liveStream, ...data }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'settings/liveStream', user);
    }
  };

  return (
    <DataContext.Provider value={{ videos, notices, liveStream, addVideo, deleteVideo, addNotice, deleteNotice, updateLiveStream }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
