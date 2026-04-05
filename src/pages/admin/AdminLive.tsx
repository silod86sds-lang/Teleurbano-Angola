import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Radio, Save } from 'lucide-react';

export function AdminLive() {
  const { liveStream, updateLiveStream } = useData();
  const [formData, setFormData] = useState(liveStream);

  useEffect(() => {
    setFormData(liveStream);
  }, [liveStream]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLiveStream(formData);
      alert('Configurações da transmissão ao vivo atualizadas!');
    } catch (error) {
      alert('Erro ao atualizar configurações.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-amber-400 flex items-center gap-3">
          <Radio className="w-8 h-8 text-red-500" />
          Gerenciar Transmissão ao Vivo
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-sm p-8 rounded-2xl border border-slate-800 space-y-6 max-w-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-amber-500"></div>
        <div className="flex items-center justify-between p-5 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-inner">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Status da Transmissão</h3>
            <p className="text-sm text-slate-400 mt-1">Ative ou desative a live para os usuários.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer tv-focusable" 
              checked={formData.isLive}
              onChange={(e) => setFormData({ ...formData, isLive: e.target.checked })}
            />
            <div className="w-14 h-7 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-red-600 shadow-inner"></div>
          </label>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Título da Live</label>
            <input 
              required 
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner tv-focusable" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">URL do Stream (MP4/HLS ou Link/Iframe)</label>
            <input 
              required 
              type="url" 
              value={formData.url} 
              onChange={e => setFormData({...formData, url: e.target.value})} 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner tv-focusable" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Descrição</label>
            <textarea 
              required 
              rows={3} 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner tv-focusable" 
            />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/50 flex justify-end">
          <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-500 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 tv-focusable">
            <Save className="w-4 h-4" />
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
