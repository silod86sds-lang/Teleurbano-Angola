import React, { createContext, useContext, useState, useEffect } from 'react';
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

// Mock initial data
const defaultVideos: Video[] = [
  {
    id: '1',
    title: 'Exemplo de Vídeo MP4',
    description: 'Um vídeo de exemplo em formato MP4.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    isPremium: false,
    createdAt: Date.now()
  }
];

const defaultLiveStream: LiveStream = {
  isLive: true,
  title: 'TELEURBANO ANGOLA Ao Vivo',
  description: 'Acompanhe a nossa programação ao vivo.',
  url: 'https://vdo.ninja/?view=W9kTD5t',
};

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [liveStream, setLiveStream] = useState<LiveStream>(defaultLiveStream);
  
  const { isAuthReady } = useAuth();

  useEffect(() => {
    if (!isAuthReady) return;

    const storedVideos = localStorage.getItem('mock_videos');
    if (storedVideos) {
      try {
        setVideos(JSON.parse(storedVideos));
      } catch (e) {
        setVideos(defaultVideos);
      }
    } else {
      setVideos(defaultVideos);
      localStorage.setItem('mock_videos', JSON.stringify(defaultVideos));
    }

    const storedNotices = localStorage.getItem('mock_notices');
    if (storedNotices) {
      try {
        setNotices(JSON.parse(storedNotices));
      } catch (e) {
        setNotices([]);
      }
    }

    const storedLiveStream = localStorage.getItem('mock_liveStream');
    if (storedLiveStream) {
      try {
        setLiveStream(JSON.parse(storedLiveStream));
      } catch (e) {
        setLiveStream(defaultLiveStream);
      }
    }
  }, [isAuthReady]);

  const addVideo = async (video: Omit<Video, 'id' | 'createdAt'>) => {
    const newVideo = { ...video, id: Date.now().toString(), createdAt: Date.now() };
    const updated = [newVideo, ...videos];
    setVideos(updated);
    localStorage.setItem('mock_videos', JSON.stringify(updated));
  };

  const deleteVideo = async (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('mock_videos', JSON.stringify(updated));
  };

  const addNotice = async (notice: Omit<Notice, 'id' | 'createdAt'>) => {
    const newNotice = { ...notice, id: Date.now().toString(), createdAt: Date.now() };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem('mock_notices', JSON.stringify(updated));
  };

  const deleteNotice = async (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem('mock_notices', JSON.stringify(updated));
  };

  const updateLiveStream = async (data: Partial<LiveStream>) => {
    const updated = { ...liveStream, ...data };
    setLiveStream(updated);
    localStorage.setItem('mock_liveStream', JSON.stringify(updated));
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

