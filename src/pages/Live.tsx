import React from 'react';
import { useData } from '../context/DataContext';
import { Radio, Users } from 'lucide-react';

export function Live() {
  const { liveStream } = useData();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Radio className="w-8 h-8 text-red-500" />
          Transmissão ao Vivo
        </h1>
        {liveStream.isLive && (
          <div className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-bold tracking-wide uppercase">Ao Vivo Agora</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] aspect-video relative border border-slate-800 ring-1 ring-white/5">
            {liveStream.isLive ? (
              liveStream.url.match(/\.(mp4|m3u8|webm|ogg)$/i) ? (
                <video
                  src={liveStream.url}
                  controls
                  autoPlay
                  className="w-full h-full object-contain tv-focusable"
                  tabIndex={0}
                >
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              ) : (
                <iframe
                  src={liveStream.url}
                  className="w-full h-full border-0 tv-focusable"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  tabIndex={0}
                ></iframe>
              )
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm text-center p-6">
                <Radio className="w-16 h-16 text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Estamos Offline</h2>
                <p className="text-slate-400">
                  Nenhuma transmissão ao vivo no momento. Fique ligado para nossos próximos eventos!
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2">{liveStream.title}</h2>
            <p className="text-slate-400 leading-relaxed">{liveStream.description}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 flex flex-col h-[600px] lg:h-auto shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-800/30 rounded-t-2xl">
            <h3 className="font-semibold text-slate-100">Chat ao Vivo</h3>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded-md">
              <Users className="w-4 h-4" />
              <span>1.2k assistindo</span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {/* Mock Chat Messages */}
            <div className="text-sm"><span className="font-bold text-blue-400">João:</span> <span className="text-slate-300">Muito bom!</span></div>
            <div className="text-sm"><span className="font-bold text-green-400">Maria:</span> <span className="text-slate-300">Que qualidade de imagem!</span></div>
            <div className="text-sm"><span className="font-bold text-amber-400">Pedro:</span> <span className="text-slate-300">Salve galera ✌️</span></div>
            <div className="text-sm text-slate-500 text-center my-4 bg-slate-800/50 py-2 rounded-lg">Bem-vindo ao chat ao vivo!</div>
          </div>
          <div className="p-4 border-t border-slate-800 bg-slate-800/30 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable"
              />
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 tv-focusable">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
