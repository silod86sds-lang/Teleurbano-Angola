import React from 'react';
import { Tv, Info, Globe2, Film } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] ring-4 ring-white/10">
          <img src="https://i.ibb.co/4Z5Vss6p/logo2-png.jpg" alt="Logo" className="h-20 w-auto object-contain rounded-xl" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.style.display = 'block'; }} />
          <Tv className="w-12 h-12 text-blue-800 hidden" />
        </div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 mb-4">Sobre a Teleurbano Angola</h1>
        <p className="text-2xl text-red-400 font-bold tracking-tight">
          Televisão de Distribuição de Conteúdos Nacionais
        </p>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-slate-300 leading-relaxed mb-12 text-center md:text-left font-medium">
            Ela surge como uma proposta inovadora no panorama mediático, focada na valorização, produção e distribuição de conteúdos nacionais. Com uma visão moderna e urbana, a Teleurbano posiciona-se como uma plataforma dedicada a dar visibilidade à cultura, informação e entretenimento produzidos localmente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center p-8 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-blue-500/10 p-4 rounded-full mb-6 group-hover:bg-blue-500/20 transition-colors">
                <Globe2 className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl text-white font-bold mb-3">Visão Moderna</h3>
              <p className="text-slate-400 leading-relaxed">Uma abordagem urbana e atualizada para o panorama mediático angolano.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-amber-500/10 p-4 rounded-full mb-6 group-hover:bg-amber-500/20 transition-colors">
                <Film className="w-12 h-12 text-amber-400" />
              </div>
              <h3 className="text-xl text-white font-bold mb-3">Produção Local</h3>
              <p className="text-slate-400 leading-relaxed">Foco total na valorização e distribuição de conteúdos 100% nacionais.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-lg hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-green-500/10 p-4 rounded-full mb-6 group-hover:bg-green-500/20 transition-colors">
                <Info className="w-12 h-12 text-green-400" />
              </div>
              <h3 className="text-xl text-white font-bold mb-3">Cultura & Informação</h3>
              <p className="text-slate-400 leading-relaxed">Dando visibilidade ao entretenimento e à informação produzidos em Angola.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
