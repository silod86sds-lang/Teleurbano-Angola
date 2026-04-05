import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Video, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

export function AdminVideos() {
  const { videos, addVideo, deleteVideo } = useData();
  const [isAdding, setIsAdding] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnailUrl: '',
    isPremium: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addVideo({ ...formData });
    setIsAdding(false);
    setFormData({ title: '', description: '', url: '', thumbnailUrl: '', isPremium: false });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Video className="w-8 h-8 text-blue-500" />
          Gerenciar Vídeos
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 tv-focusable"
        >
          <Plus className="w-4 h-4" />
          Novo Vídeo
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Título</label>
              <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">URL do Vídeo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input required type="url" placeholder="https://..." value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">URL da Thumbnail (Imagem)</label>
              <input required type="url" value={formData.thumbnailUrl} onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
            <div className="flex items-center mt-7">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" checked={formData.isPremium} onChange={e => setFormData({...formData, isPremium: e.target.checked})} className="peer sr-only tv-focusable" />
                  <div className="w-10 h-6 bg-slate-700 rounded-full peer-checked:bg-amber-500 transition-colors"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                </div>
                <span className="text-sm font-medium text-slate-300 group-hover:text-amber-400 transition-colors">Conteúdo Premium</span>
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all tv-focusable" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-5 border-t border-slate-800/50 mt-6">
            <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors tv-focusable">Cancelar</button>
            <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 tv-focusable">
              Salvar Vídeo
            </button>
          </div>
        </form>
      )}

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        <table className="min-w-full divide-y divide-slate-800/50">
          <thead className="bg-slate-800/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Vídeo</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-20 flex-shrink-0 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                      <img className="h-full w-full object-cover" src={video.thumbnailUrl} alt="" referrerPolicy="no-referrer" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-bold text-slate-100">{video.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${video.isPremium ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                    {video.isPremium ? 'Premium' : 'Gratuito'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => deleteVideo(video.id)} className="text-red-400 hover:text-red-300 ml-4 p-2 hover:bg-red-400/10 rounded-lg transition-colors tv-focusable">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
