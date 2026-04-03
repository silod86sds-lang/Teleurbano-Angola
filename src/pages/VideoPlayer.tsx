import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Crown, Lock } from 'lucide-react';

export function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const { videos } = useData();
  const { user } = useAuth();

  const video = videos.find(v => v.id === id);

  if (!video) {
    return <Navigate to="/" />;
  }

  const canWatch = !video.isPremium || user?.isPremium || user?.role === 'admin';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] aspect-video relative border border-slate-800 ring-1 ring-white/5">
        {canWatch ? (
          <video
            src={video.url}
            controls
            autoPlay
            className="w-full h-full object-contain"
            poster={video.thumbnailUrl}
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md text-center p-6">
            <div className="bg-slate-800/50 p-5 rounded-full mb-6 shadow-[0_0_30px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
              <Lock className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 mb-3">Conteúdo Premium</h2>
            <p className="text-slate-300 max-w-md mb-8 text-lg">
              Este vídeo é exclusivo para assinantes premium. Assine agora para ter acesso ilimitado a todo o nosso catálogo.
            </p>
            {user ? (
              <Link
                to="/subscribe"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:from-amber-400 hover:to-orange-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:-translate-y-1"
              >
                <Crown className="w-6 h-6" />
                Assinar Premium
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-1"
              >
                Fazer Login
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 bg-slate-900/60 backdrop-blur-sm rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-100 mb-4 flex items-center gap-3">
              {video.title}
              {video.isPremium && (
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-orange-500/20">
                  <Crown className="w-3.5 h-3.5" />
                  PREMIUM
                </span>
              )}
            </h1>
            <p className="text-slate-400 leading-relaxed text-lg">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
