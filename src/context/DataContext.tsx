import React, { createContext, useContext, useState, useEffect } from 'react';

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
  addVideo: (video: Omit<Video, 'id' | 'createdAt'>) => void;
  deleteVideo: (id: string) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'createdAt'>) => void;
  deleteNotice: (id: string) => void;
  updateLiveStream: (data: Partial<LiveStream>) => void;
}

const INITIAL_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'Notícias de Luanda: Atualizações',
    description: 'As principais notícias da capital angolana e do país.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Luanda_-_Angola_%2840656123953%29.jpg/800px-Luanda_-_Angola_%2840656123953%29.jpg', // Real image of Luanda Marginal
    isPremium: false,
    createdAt: Date.now() - 100000,
  },
  {
    id: 'v2',
    title: 'Conteúdos Exclusivos',
    description: 'Uma seleção exclusiva com os melhores hits de Kuduro de Angola.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533147670608-2a2f9775d3a4?w=800&q=80', // Dance/Music vibe
    isPremium: true,
    createdAt: Date.now() - 50000,
  },
  {
    id: 'v3',
    title: 'Documentário: As Maravilhas de Malanje',
    description: 'Explore as belezas naturais da província de Malanje, incluindo as Quedas de Kalandula.',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80', // Waterfall/Nature vibe
    isPremium: false,
    createdAt: Date.now() - 200000,
  }
];

const INITIAL_NOTICES: Notice[] = [
  {
    id: 'n1',
    title: 'Manutenção Programada',
    content: 'Teremos uma manutenção no servidor hoje às 23h. O serviço pode ficar instável por 30 minutos.',
    createdAt: Date.now() - 86400000,
    author: 'Admin',
  },
  {
    id: 'n2',
    title: 'Novo Plano Premium',
    content: 'Assine agora para ter acesso a conteúdos exclusivos e sem anúncios!',
    createdAt: Date.now() - 172800000,
    author: 'Equipe Web TV',
  }
];

const INITIAL_LIVE: LiveStream = {
  isLive: true,
  title: 'TELEURBANO ANGOLA Ao Vivo',
  description: 'Acompanhe a nossa programação ao vivo.',
  url: 'https://vdo.ninja/?view=W9kTD5t',
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('webtv_videos_v7');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('webtv_notices_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [liveStream, setLiveStream] = useState<LiveStream>(() => {
    const saved = localStorage.getItem('webtv_live_v4');
    return saved ? JSON.parse(saved) : INITIAL_LIVE;
  });

  useEffect(() => {
    localStorage.setItem('webtv_videos_v7', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('webtv_notices_v2', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('webtv_live_v4', JSON.stringify(liveStream));
  }, [liveStream]);

  const addVideo = (video: Omit<Video, 'id' | 'createdAt'>) => {
    const newVideo: Video = {
      ...video,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setVideos([newVideo, ...videos]);
  };

  const deleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'createdAt'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
    };
    setNotices([newNotice, ...notices]);
  };

  const deleteNotice = (id: string) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const updateLiveStream = (data: Partial<LiveStream>) => {
    setLiveStream({ ...liveStream, ...data });
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
