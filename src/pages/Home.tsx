import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Play, Crown, Clock, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Home() {
  const { videos } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredVideos = useMemo(() => {
    return videos.filter(video => 
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [videos, searchQuery]);

  const featuredVideos = useMemo(() => {
    // Just taking the first 5 videos as featured for now
    return videos.slice(0, 5);
  }, [videos]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Carousel */}
      {!searchQuery && featuredVideos.length > 0 && (
        <div className="mb-12 relative group">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-400" />
            Em Destaque
          </h2>
          
          <div className="relative">
            <button 
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 tv-focusable"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 hide-scrollbar scroll-smooth"
            >
              {featuredVideos.map((video) => (
                <Link
                  key={`featured-${video.id}`}
                  to={`/video/${video.id}`}
                  className="flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] snap-center group/item relative rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(59,130,246,0.3)] tv-focusable"
                >
                  <div className="aspect-[16/9] relative bg-slate-800">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group/item-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover/item:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-300">
                      <div className="bg-blue-600/90 backdrop-blur-sm rounded-full p-5 transform scale-50 group-hover/item:scale-100 transition-transform duration-300 shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                        <Play className="w-10 h-10 text-white fill-current ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      {video.isPremium && (
                        <div className="mb-3 inline-flex bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full items-center gap-1.5 shadow-lg shadow-orange-500/30">
                          <Crown className="w-3.5 h-3.5" />
                          PREMIUM
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-white line-clamp-2 mb-2 group-hover/item:text-blue-400 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                        {video.description}
                      </p>
                      <div className="flex items-center text-xs text-slate-400 gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-blue-500" />
                        {formatDistanceToNow(video.createdAt, { addSuffix: true, locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button 
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 tv-focusable"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400">
          Conteúdos Nacionais - Angola
        </h1>
        
        <div className="relative w-full md:w-64 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar vídeos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-slate-700/50 rounded-xl leading-5 bg-slate-900/50 backdrop-blur-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-800/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all shadow-lg shadow-black/20 tv-focusable"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="group flex flex-col bg-slate-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] tv-focusable"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-800">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-blue-600/90 backdrop-blur-sm rounded-full p-4 transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
              {video.isPremium && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-orange-500/30">
                  <Crown className="w-3.5 h-3.5" />
                  PREMIUM
                </div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 group-hover:via-blue-500 to-transparent transition-colors duration-300"></div>
              <h3 className="text-lg font-bold text-slate-100 line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">
                {video.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2 mb-4 flex-1 group-hover:text-slate-300 transition-colors">
                {video.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs text-slate-500 gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-500/70" />
                  {formatDistanceToNow(video.createdAt, { addSuffix: true, locale: ptBR })}
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filteredVideos.length === 0 && (
          <div className="col-span-full text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-slate-400 text-lg">
              {searchQuery ? 'Nenhum vídeo encontrado para a sua busca.' : 'Nenhum vídeo disponível no momento.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
